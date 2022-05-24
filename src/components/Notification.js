import React from 'react'

const Notification = ({ hide }) => {

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      hide()
    }, 500)
    return () => clearTimeout(timeout)
  }, [hide])
  return (
    <div className={`notification-container`}>
      <p>Try again using another letter...</p>
    </div>
  )
}

export default Notification
