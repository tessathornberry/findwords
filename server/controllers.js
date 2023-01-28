const express = require('express');

let phrase = '';
let word = '';
let completeWord = ''; //boolean
let caseSensitive = ''; //boolean

module.exports = {
  searchWords: (queryData, callback) => {
    // console.log("queryData", queryData);
    phrase = queryData.phrase;
    word = queryData.word;
    completeWord = queryData.completeWord; //boolean
    caseSensitive = queryData.caseSensitive; //boolean

    var results = countWords(phrase, word, completeWord, caseSensitive);
    console.log(results);
    return callback(null, results);
  }
};

  const createBeginAndEndIndexes = (phrase, word) => {
    var index = 0;
    var pairIndexes = [];
    while (index !== -1) {
      index = phrase.indexOf(word, index);
      if (index !== -1) {
        if (index === 0) {
          pairIndexes.push(0);
        } else {
          pairIndexes.push(index - 1);
        }
        pairIndexes.push(index + word.length);
        index++;
      }
    }
    return pairIndexes;
  };

  const wholeWord = (arrayOfIndexes) => {
    var count = 0;
    // console.log('arrayOfIndexes', arrayOfIndexes);
    var open = " [{(\"\'</";
    var close = " ]})\"\'>/!?:;,.";
    var begin = false;
    var end = false;

    if (arrayOfIndexes[0] === 0) {
      begin = true;
    }
    for (var j = 0; j < phrase.length; j += 2) {
      if (open.includes(phrase[arrayOfIndexes[j]]) || begin === true) {
        begin = true;
      }
      if (close.includes(phrase[arrayOfIndexes[j+1]]) || arrayOfIndexes[j+1] === phrase.length) {
        end = true;
      }
      if (begin && end) {
        count++;
      }
      begin = false;
      end = false;
    }
    return count;
  };

  const countWords = (phrase, word, completeWord, caseSensitive) => {
    var count = 0;
    var acceptablePunctuation = ",?!.:; "
    if (phrase.length > 0 && word.length > 0) {
      if (completeWord === 'false' && caseSensitive === 'false') {
        if (phrase.toLowerCase().includes(word.toLowerCase())) {
          var splitPhrase = phrase.toLowerCase().split(word.toLowerCase());
          count += splitPhrase.length - 1;
          return count;
        } else {
          return 0;
        }
      } else if (completeWord === 'false' && caseSensitive === 'true') {
        if (phrase.includes(word)) {
          var splitPhrase = phrase.split(word);
          count = splitPhrase.length - 1;
          return count;
        } else {
          return 0;
        }
      } else if (completeWord === 'true' && caseSensitive === 'true') {
        if (phrase.includes(word)) {
          count = wholeWord(createBeginAndEndIndexes(phrase, word));
          return count;
        } else {
          return 0;
        }
      } else if (completeWord === 'true' && caseSensitive === 'false') {
        if (phrase.toLowerCase().includes(word.toLowerCase())) {
          count = wholeWord(createBeginAndEndIndexes(phrase.toLowerCase(), word.toLowerCase()));
          return count;
        } else {
          return 0;
        }
      }
    }
  };


