import React, {useState} from 'react';
import styled from 'styled-components';

const AppBorder = styled.div`
border: 1px solid gray;
border-radius: 10px;
padding: 1em;
`;

const App = () => {
  const [phrase, setPhrase] = useState('');

  let updatePhrase = (e) => {
    setPhrase(e.target.value)
  };

  return (
    <AppBorder>
    <div>

      <h2>Count how many times your word appears in a phrase:</h2>
      <form>
        <textarea className="phrase" type="text" name="phrase" aria-label="phrase to search" placeholder="Put the phrase you wish to search here" value={phrase} onChange={updatePhrase} spellCheck="false" />
      </form>

    </div>
    <div>options

    </div>


    </AppBorder>
  )
};

export default App;
