import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
app.use(express.json());

const KEY = process.env.API_KEY;
const PORT = 1000;

app.get("/country/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/country?name=${name}`,
      {
        headers: { "X-Api-Key": KEY },
      }
    );

    if (response.data.length === 0) {
      throw new Error("Страна не найдена");
    }

    const countryData = response.data[0];

    res.json({
      name: countryData.name,
      capital: countryData.capital || "Нет данных",
      population: countryData.population,
      region: countryData.region,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
