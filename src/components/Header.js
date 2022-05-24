import React from 'react'

// rafce
const Header = ({ winCount, loseCount }) => {
  return (
    <>
      <h1>THE HANGMAN GAME</h1>
      <h3>Guess the correct word or you will <u>DIE</u> 💀💀💀</h3>
      <p>🏆: {winCount} 💀: {loseCount}</p>
    </>
  )
}

export default Header
