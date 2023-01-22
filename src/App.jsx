import React, {useState} from 'react';
import styled from 'styled-components';

const AppBorder = styled.div`
border: 1px solid gray;
border-radius: 10px;
padding: 1em;
`;

const App = () => {
  const [phrase, setPhrase] = useState('');
  const [word, setWord] = useState('');


  let updatePhrase = (e) => {
    setPhrase(e.target.value)
  };

  let updateWord = (e) => {
    setWord(e.target.value)
  };

  return (
    <AppBorder>
    <div>

      <h2>Count how many times your word appears in a phrase:</h2>
      <form>
        <textarea className="phrase" type="text" name="phrase" aria-label="phrase to search" placeholder="Put the phrase you wish to search here..." value={phrase} onChange={updatePhrase} spellCheck="false" />
      </form>
      <form>
        <textarea className="word" type="text" name="word" aria-label="word to search for" placeholder="Put the word you want counted here" value={phrase} onChange={updateWord} spellCheck="false" />
      </form>

    </div>
    <div className="options">
    <div className="completeWord">
      <label>This is a complete word: </label>
      <select name="isCompleteWord" id="isCompleteWord">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      </div>

      <div className="caseSensitive">
      <label>This is case-sensitive: </label>
      <select name="isCaseSensitive" id="isCaseSensitive">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      </div>
    </div>


    </AppBorder>
  )
};

export default App;
