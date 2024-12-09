const express = require('express');
const allRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', allRoutes);

app.listen(port);
module.exports = app;
