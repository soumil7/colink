import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message when component mounts
  useEffect(() => {
    setMessages([
      { 
        text: "Hello! I'm your educational assistant. I'm here to help you learn and understand concepts across various subjects. What would you like to learn about today?", 
        sender: 'bot' 
      }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      
      // Add bot response
      setMessages(prevMessages => [
        ...prevMessages, 
        { text: data.response, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Sorry, there was an error processing your request. Please try again later.', sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">
          <h1>NovaLearn AI</h1>
          <p>Your personal educational assistant</p>
        </div>
        
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-content loading">
                <div className="dot-typing"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="subject-pills">
          <button onClick={() => setInput("Explain photosynthesis")}>Science</button>
          <button onClick={() => setInput("Help me understand linear equations")}>Math</button>
          <button onClick={() => setInput("Who was Marie Curie?")}>History</button>
          <button onClick={() => setInput("What are literary devices?")}>Literature</button>
          <button onClick={() => setInput("How does a computer process information?")}>Technology</button>
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to learn today?"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;