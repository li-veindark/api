const express = require('express');
const cors = require('cors');

const app = express();


const index = require('./routes/index');
const QuotesRoute = require('./routes/quotes.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', QuotesRoute);

module.exports = app;