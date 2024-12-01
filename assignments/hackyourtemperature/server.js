import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const { cityName } = req.body;
  
  if (!cityName) {
    return res.status(400).json({ error: 'There is no city'});
  }
   res.status(200).json({ message: 'received City', cityName });
})

app.listen(3000);
