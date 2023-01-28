const express = require('express');
const router = express.Router();


const searchWords = (req, res) => {
  console.log("req", req);
  return [];
  // const phrase = req.body.phrase;
  // const word = req.body.word;
  // const completeWord = req.body.completeWord; //boolean
  // const caseSensitive = req.body.caseSensitive; //boolean
  }

router.get('/wordSearch', searchWords);