import React from 'react';
import { GameStatus } from '../helpers/Game';

const Popup = ({ gameState, playAgain }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';

  if (gameState.status === GameStatus.WIN) {
    finalMessage = 'How lucky! You survived! 😈';
  } else if (gameState.status === GameStatus.GAME_OVER) {
    finalMessage = 'You died. 🪦';
    finalMessageRevealWord = `The answer is: ${gameState.answer}`;
  }

  return (
    (finalMessage !== '' && finalMessageRevealWord === '' && (
      <div className="popup-container-success" style={finalMessage !== '' ? { display: 'flex' } : {}}>
        <div className="popup">
          <h2>{finalMessage}</h2>
          <h3>{finalMessageRevealWord}</h3>
          <button onClick={playAgain}>Play Again</button>
        </div>
      </div>
    )) || (
      finalMessageRevealWord !== '' && (
        <div className="popup-container-failure" style={finalMessage !== '' ? { display: 'flex' } : {}}>
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
