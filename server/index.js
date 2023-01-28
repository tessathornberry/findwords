require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');
const controllers = require('./controllers.js');
const app = express();

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "../build")));


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/wordSearch', (req, res) => {
  // console.log('req.query', req.query);
  controllers.searchWords(req.query, (err, results) => {
    if (err) {
      res.status(404).send(err)
    } else {
      console.log('results', results)
      res.json(results.toString())
    }
  })
})

const port = process.env.PORT || 3000;

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);