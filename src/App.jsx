import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';


const AppBorder = styled.div`
background-color: white;
border: 1px solid gray;
border-radius: 10px;
padding: 1em;
cursor: default;
`;

const App = () => {
  const [phrase, setPhrase] = useState('');
  const [word, setWord] = useState('');
  const [completeWord, setCompleteWord] = useState('true');
  const [caseSensitive, setCaseSensitive] = useState('true');
  const [returnedCount, setReturnedCount] = useState(null);

  let updatePhrase = (e) => {
    setPhrase(e.target.value)
  };

  let updateWord = (e) => {
    setWord(e.target.value)
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    let inputObject = {};
    inputObject.phrase = phrase;
    inputObject.word = word;
    inputObject.completeWord = completeWord;
    inputObject.caseSensitive = caseSensitive;
    //can add quantifying requirements here by using conditionals and setReturnedCount() or in server/controllers.js
    axios.get("http://localhost:2999/wordSearch", {params: inputObject}) //replace "localhost" with deployed public IP in deployment
      .then(result => {
        setReturnedCount(result.data);
        return <div className="counted">{result.data}</div>;
      })
      .catch(err => console.log('error in App.jsx get', err));
  };

  let handleFormReset = (e) => {
    setPhrase('');
    setWord('');
    setCompleteWord('true');
    setCaseSensitive('true');
    setReturnedCount(null);
  };

  return (
    <AppBorder>
      <h2>Count how many times your word appears in a phrase:</h2>
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <textarea className="phrase" type="text" name="phrase" aria-label="phrase to search" placeholder="Put the phrase you wish to search here..." value={phrase} onChange={updatePhrase} spellCheck="false" />
        <textarea className="word" type="text" name="word" aria-label="word to search for" placeholder="Put the word you want counted here..." value={word} onChange={updateWord} spellCheck="false" />
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
          <div className="search">
            <button type="submit"  value="Submit" aria-label="search button">Search</button>
            <button className="reset"type="reset"  value="Reset" aria-label="reset button">Start Over</button>
          </div>
          <div className="countResult">
            <h3 className="number">Times your word appears in the phrase above: </h3>
            <div className="counted">{returnedCount}</div>
          </div>
        </div>
      </form>
    </AppBorder>
  )
};

export default App;
