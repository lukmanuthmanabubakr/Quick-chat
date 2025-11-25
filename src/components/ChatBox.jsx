import React from 'react'
import { useAppContext } from '../context/AppContext'

const ChatBox = () => {
  const {selectedChat, theme} = useAppContext
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox