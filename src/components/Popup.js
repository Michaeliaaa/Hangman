import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;
  
  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'How lucky! You survived! 😈';
    playable = false;
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMessage = 'You died. 🪦';
    finalMessageRevealWord = `The answer is: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    finalMessage !== '' && finalMessageRevealWord === '' && (
      <div className="popup-container-success" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
      </div>
    ) || (
      finalMessageRevealWord !== '' && (
      <div className="popup-container-failure" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
      </div>
    )
  ))
}

export default Popup
