const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
