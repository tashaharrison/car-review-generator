const express = require('express');
const path = require('path');
const askCarQuestion = require('./src/askCarQuestion');
const { getProsCons } = require('./src/prosConsGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ask', async (req, res) => {
  const { carModel, question } = req.body;
  if (!carModel || !question) {
    return res.status(400).json({ error: 'carModel and question are required.' });
  }
  try {
    const answer = await askCarQuestion(carModel, question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get answer.' });
  }
});

app.post('/api/proscons', async (req, res) => {
  const { carModel } = req.body;
  if (!carModel) {
    return res.status(400).json({ error: 'carModel is required.' });
  }
  try {
    const summary = await getProsCons(carModel);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get pros and cons.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
