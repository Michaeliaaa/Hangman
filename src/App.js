import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';

import './App.css';
import Game, { GameResponse, GameStatus } from './helpers/Game';

function App() {
  const [showNotification, setShowNotification] = useState(false);

  const game = useMemo(() => new Game(9), [])
  const [gameState, setGameState] = useState(game);
  const updateGameState = useCallback(() => {
    setGameState({
      chances: game.chances,
      answer: game.answer,
      answerCharacters: game.answerCharacters,
      wrongLetters: game.wrongLetters,
      correctLetters: game.correctLetters,
      status: game.status,
      winCount: game.winCount,
      loseCount: game.loseCount,
      userResponse: game.userResponse,
      playable: game.playable()
    })
  }, [game])
  const resetGame = useCallback(async () => {
    await game.resetGame();
    updateGameState();
  }, [game, updateGameState]);

  useEffect(
    () => { resetGame() },
    [resetGame]
  )
  useEffect(() => {
    const handleKeydown = event => {
      const { key } = event;
      if (!game.playable() && key === "Enter") {
        resetGame();
        return
      } else if (key.length !== 1) {
        return;
      }
      const response = game.handleKeydown(key);
      updateGameState();
      switch (response) {
        case GameResponse.INVALID_CHARACTER:
          setShowNotification(true)
          break;
        case GameResponse.WIN:
          break;
        case GameResponse.GAME_OVER:
          break;
        case GameResponse.INVALID:
        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [game, updateGameState, resetGame, setShowNotification, showNotification])

  const DelayPopup = () => {
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setShow(true)
      }, 300)
      return () => clearTimeout(timeout)
    }, [show])

    return <Popup gameState={gameState} playAgain={async () => {
      resetGame();
    }} />
  }
  return (
    <>
      <Header winCount={gameState.winCount} loseCount={gameState.loseCount} />
      <div className="game-container">
        <div id="display">
          <Figure wrongAttempts={gameState.wrongLetters.length} />
          <WrongLetters wrongLetters={gameState.wrongLetters} />
        </div>
        <Word selectedWord={gameState.answer} correctLetters={gameState.correctLetters} />
      </div>
      {showNotification && (<Notification hide={() => setShowNotification(false)} />)}
      {(gameState.status !== GameStatus.LOADED) && (<DelayPopup />)}
    </>
  );
}

export default App;
