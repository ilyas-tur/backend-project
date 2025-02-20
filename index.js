import express from "express";
import axios from "axios";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/laptops", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://dummyjson.com/products/category/laptops"
    );
    res.render("laptops", { laptops: data.products });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/laptops/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);

    if (data.category !== "laptops") {
      return res.status(404).render("error", { message: "Ноутбук не найден" });
    }

    res.render("laptop", { laptop: data });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
