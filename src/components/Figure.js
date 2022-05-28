import React from 'react'

const Figure = ({ wrongAttempts }) => {
  const nineBodyParts = [
    <circle key="head" cx="140" cy="70" r="20" />, // head
    <g key="rightEye"><line x1="130" y1="65" x2="135" y2="70" /><line x1="130" y1="70" x2="135" y2="65" /></g>, // right eye
    <g key="leftEye"><line x1="145" y1="65" x2="150" y2="70" /><line x1="145" y1="70" x2="150" y2="65" /></g>, // left eye
    <line key="mouth" x1="135" y1="80" x2="145" y2="80" />, // mouth
    <line key="body" x1="140" y1="90" x2="140" y2="150" />, // body
    <line key="rightArm" x1="140" y1="120" x2="120" y2="100" />, // right arm
    <line key="leftArm" x1="140" y1="120" x2="160" y2="100" />, // left arm
    <line key="rightLeg" x1="140" y1="150" x2="120" y2="180" />, // right leg
    <line key="leftLeg" x1="140" y1="150" x2="160" y2="180" />, // left leg
  ]
  return (
    <svg height="250" width="200" className="figure-container">
      {/* <!-- Rod --> */}
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />
      {nineBodyParts.slice(0, wrongAttempts)}
    </svg>
  )
}

export default Figure
