import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

interface Message {
  body: string;
  user: string;
}

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const topics = ["Investing Basics", "Stock Market Basics", "Risk Management", "Financial Planning", "Retirement Savings"];

    async function sendMessage(userMessage: string, predefined: boolean = false) {
        if (userMessage !== "" || predefined) {
            setMessages([...messages, {body: userMessage, user: 'User'}]);
        }
        const response = await axios.post('/api/chat', {message: userMessage});
        const botMessage = response.data.replace(/\n/g, "<br/>");
        setMessages(oldMessages => [...oldMessages, {body: botMessage, user: 'Finley'}]);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        sendMessage(input);
        setInput("");
    }

    return (
        <div className="chat-container">
            <div className="topic-container"> 
                {topics.map((topic, index) =>
                    <button key={index} onClick={() => sendMessage(`I want to learn about ${topic}`, true)}>
                        {topic}
                    </button>
                )}
            </div>
            <div className="chat-box">
                {messages.map((message, index) =>
                    <div key={index} className={`message ${message.user.toLowerCase()}`}>
                        <b>{message.user}: </b> <span dangerouslySetInnerHTML={{__html: message.body}} />
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="input-area">
                <input 
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="input-field"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    )
}

export default Chat;
