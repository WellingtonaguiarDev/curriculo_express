const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pessoasRoutes = require('./routes/pessoaRoutes');

app.get('/', (req, res) => {
  res.send('API Currículo funcionando! 🚀');
});

app.use('/pessoas', pessoasRoutes);

module.exports = app;
