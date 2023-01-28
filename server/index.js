require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');
// const router = require('./routes.js');
const app = express();

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "../build")));


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// app.use('/', router);
app.get('/wordSearch', (req, res) => {
  console.log('req.query', req.query);
  res.json('a ok')
})

const port = process.env.PORT || 3000;

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);