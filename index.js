const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const router = require('./router');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} => ${req.method} ${req.originalUrl}`);
    next();
});

app.use(router);

app.listen(port, host, () => {
    console.log(`Server is running on port: http://${host}:${port}`);
});
