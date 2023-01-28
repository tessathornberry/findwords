import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';


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

  // // useEffect(() => {
  // //   // CountWords();
  // // }, [phrase, word, completeWord, caseSensitive]);

  let updatePhrase = (e) => {
    setPhrase(e.target.value)
  };

  let updateWord = (e) => {
    setWord(e.target.value)
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(phrase, word, completeWord, caseSensitive);
    let inputObject = {};
    inputObject.phrase = phrase;
    inputObject.word = word;
    inputObject.completeWord = completeWord;
    inputObject.caseSensitive = caseSensitive;

    axios.get("http://localhost:3000/wordSearch", {params: inputObject})
      .then(result => console.log(result.data))
      .catch(err => console.log('error in App.jsx get', err));

      // return <div className="counted">{count}</div>;
      //   } else {
      //     return <div className="counted">0</div>;
  }

  return (
    <AppBorder>
      <h2>Count how many times your word appears in a phrase:</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea className="phrase" type="text" name="phrase" aria-label="phrase to search" placeholder="Put the phrase you wish to search here..." value={phrase} onChange={updatePhrase} spellCheck="false" />
        <textarea className="word" type="text" name="word" aria-label="word to search for" placeholder="Put the word you want counted here" value={word} onChange={updateWord} spellCheck="false" />
        <div className="options">
          <div className="completeWord">
            <label>This is a complete word: </label>
            <select name="isCompleteWord" id="isCompleteWord" defaultValue={true}  onChange={e => setCompleteWord(e.target.value)}>
              <option value={true} >true</option>
              <option value={false} >false</option>
            </select>
        </div>
        <div className="caseSensitive">
          <label>This is case-sensitive:</label>
          <select name="isCaseSensitive" id="isCaseSensitive" defaultValue={true} onChange={e => setCaseSensitive(e.target.value)}>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
        </div>
        <div className="search"><button type="submit"  value="Submit" aria-label="search button">Search</button></div>
      <div className="countResult">
        <h3 className="number">Times your word appears in the phrase above: </h3>
        {/* <div className="counted">{CountWords()}</div> */}
        <div className="counted">counted</div>
      </div>
      </div>
      </form>
    </AppBorder>
  )
};

export default App;
