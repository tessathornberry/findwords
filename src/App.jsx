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
    console.log(completeWord, caseSensitive)
    console.log(typeof completeWord, typeof caseSensitive)

    CountWords();
  }, [phrase, word, completeWord, caseSensitive]);

  let updatePhrase = (e) => {
    setPhrase(e.target.value)
  };

  let updateWord = (e) => {
    setWord(e.target.value)
  };

  const CountWords = () => {
    var count = 0;
    var acceptablePunctuation = ",?!.:; "
    if (phrase.length > 0 && word.length > 0) {
      if (completeWord === 'false' && caseSensitive === 'false') {
        if (phrase.toLowerCase().includes(word.toLowerCase())) {
          var splitPhrase = phrase.toLowerCase().split(word.toLowerCase());
          count = splitPhrase.length - 1;
          console.log(count)
          return <div className="counted">{count}</div>;
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
