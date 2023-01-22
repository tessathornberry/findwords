import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const AppBorder = styled.div`
border: 1px solid gray;
border-radius: 10px;
padding: 1em;
`;

const App = () => {
  const [phrase, setPhrase] = useState('');
  const [word, setWord] = useState('');
  const [completeWord, setCompleteWord] = useState('true');
  const [caseSensitive, setCaseSensitive] = useState('true');

  useEffect(() => {
    CountWords();
  }, [phrase, word, completeWord, caseSensitive]);

  let updatePhrase = (e) => {
    setPhrase(e.target.value)
  };

  let updateWord = (e) => {
    setWord(e.target.value)
  };

  const wholeWord = (arrayOfIndexes) => {
    var count = 0;
    console.log('arrayOfIndexes', arrayOfIndexes);
    var open = " [{(\"\'</";
    var close = " ]})\"\'>/!?:;,.";
    var begin = false;
    var end = false;

    if (arrayOfIndexes[0] === 0) {
      begin = true;
    }
/** try to get this logic to work */
    for (var j = 0; j < phrase.length; j += 2) {
      if (open.includes(arrayOfIndexes[j]) || begin === true) {
        begin = true;
      }

      console.log('close inclides', close.includes(arrayOfIndexes[j+1]))
      if (close.includes(arrayOfIndexes[j+1]) || arrayOfIndexes[j+1] === phrase.length) {
        end = true;
        console.log('endhere', end)
      }

      console.log('begin', begin, 'end', end)
      if (begin && end) {
    console.log('count', count)

        count++;
    console.log('count', count)

        console.log(count);
      }

      begin = false;
      end = false;
    }
    // console.log('count', count)
    return count;
  }

  const CountWords = () => {
    var count = 0;
    var acceptablePunctuation = ",?!.:; "
    if (phrase.length > 0 && word.length > 0) {
      if (completeWord === 'false' && caseSensitive === 'false') {
        if (phrase.toLowerCase().includes(word.toLowerCase())) {
          var splitPhrase = phrase.toLowerCase().split(word.toLowerCase());
          count += splitPhrase.length - 1;
          return <div className="counted">{count}</div>;
        } else {
          return <div className="counted">0</div>;
        }
      } else if (completeWord === 'false' && caseSensitive === 'true') {
        if (phrase.includes(word)) {
          var splitPhrase = phrase.split(word);
          count = splitPhrase.length - 1;
          return <div className="counted">{count}</div>;
        } else {
          return <div className="counted">0</div>;
        }
      } else if (completeWord === 'true' && caseSensitive === 'true') {
        if (phrase.includes(word)) {
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
            console.log('pairIndexes',pairIndexes)
          }
            count = wholeWord(pairIndexes);
            return <div className="counted">{count}</div>;
        } else {
          return <div className="counted">0</div>;
        }
      }

    }
  }

  return (
    <AppBorder>
    <div>

      <h2>Count how many times your word appears in a phrase:</h2>
      <form>
        <textarea className="phrase" type="text" name="phrase" aria-label="phrase to search" placeholder="Put the phrase you wish to search here..." value={phrase} onChange={updatePhrase} spellCheck="false" />
      </form>
      <form>
        <textarea className="word" type="text" name="word" aria-label="word to search for" placeholder="Put the word you want counted here" value={word} onChange={updateWord} spellCheck="false" />
      </form>

    </div>
    <div className="options">
      <div className="completeWord">
        <label>This is a complete word: </label>
        <select name="isCompleteWord" id="isCompleteWord" onChange={e => setCompleteWord(e.target.value)}>
          <option value={true} >true</option>
          <option value={false} >false</option>
        </select>
      </div>

      <div className="caseSensitive">
        <label>This is case-sensitive:</label>
        <select name="isCaseSensitive" id="isCaseSensitive" onChange={e => setCaseSensitive(e.target.value)}>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
      <div>
        <h3 className="number">Times your word appears in the phrase above: </h3>
        <div className="counted">{CountWords()}</div>
      </div>
    </div>


    </AppBorder>
  )
};

export default App;
