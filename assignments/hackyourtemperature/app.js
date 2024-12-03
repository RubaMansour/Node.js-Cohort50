import fetch from 'node-fetch';
import keys from './sources/keys.js';
import express from "express";
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/', async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(404).json({ weatherText: 'City is not found!' });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === '404') {
      return res.status(404).json({ weatherText: 'City is not found!' });
    }

    res.status(200).json({
      weatherText: `The temperature in ${data.name} is ${data.main.temp}°C.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

export default app;
