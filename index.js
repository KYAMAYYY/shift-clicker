const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const items = [
  { name: '★ Нож', rarity: 'legendary' },
  { name: 'AK-47 | Красная линия', rarity: 'epic' },
  { name: 'AWP | Азимов', rarity: 'rare' },
  { name: 'P250 | Песчаная буря', rarity: 'common' },
  { name: 'MAC-10 | Серебро', rarity: 'common' }
];

app.post('/open-case', (req, res) => {
  const roll = Math.random();
  let result;

  if (roll < 0.01) result = items[0];
  else if (roll < 0.05) result = items[1];
  else if (roll < 0.20) result = items[2];
  else if (roll < 0.60) result = items[3];
  else result = items[4];

  res.json({ item: result });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});