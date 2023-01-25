require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// app.use()

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../public")));

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/wordSearch', (req, res) => {
console.log(req.body);

// const phrase = req.body.phrase;
// const word = req.body.word;
// const completeWord = req.body.completeWord; //boolean
// const caseSensitive = req.body.caseSensitive; //boolean





})

const port = process.env.PORT || 3000;

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);