import React, { useState } from 'react'
import axios from 'axios'
import './Chat.css' // Ensure this CSS file exists and contains your styles

function Chat() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage = async (event) => {
        event.preventDefault() // Prevents the page from refreshing on form submit
        if (!input) return

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/answer',
                { question: input },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            // The backend ensures 'response.data.answer' is a string, so we can use it directly
            const answerText = response.data.answer

            // Append the sent message and the answer to the messages array
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, isUser: true },
                { text: answerText, isUser: false },
            ])

            setInput('') // Clear the input after sending
        } catch (error) {
            // Handle any errors here, like showing an error message to the user
            console.error('There was an error sending the message:', error)
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: 'Failed to get an answer. Please try again.',
                    isUser: false,
                },
            ])
        }
    }

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.isUser ? 'user-message' : 'response-message'
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    className="message-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    )
}

export default Chat
