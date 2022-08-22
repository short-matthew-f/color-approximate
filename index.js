const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

const getClosestColorHex = require('./color-utils');
app.post('/closest-color', (req, res, next) => {
  const { hexColor } = req.body;
  res.json(getClosestColorHex(hexColor))
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('up and running!')
})