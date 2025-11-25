import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const ChatBox = () => {
  const {selectedChat, theme} = useAppContext()

  const [messages, setMessages] = useState([])
  return (
    <div>ChatBox</div>
  )
}

export default ChatBox