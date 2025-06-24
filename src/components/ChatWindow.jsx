import React, { useState, useEffect, useRef } from 'react';
import { queryMemory } from '../api';

export function ChatWindow({ memoryName }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Resetta la chat quando cambia la memoria selezionata
        setMessages([
            { sender: 'ai', text: `Ciao! Sono pronto a rispondere a domande sulla memoria "${memoryName}".` }
        ]);
    }, [memoryName]);
    
    useEffect(() => {
        // Scrolla fino all'ultimo messaggio
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await queryMemory(memoryName, input);
            const aiMessage = { sender: 'ai', text: res.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { sender: 'ai', text: 'Spiacente, si è verificato un errore.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="chat-window">
            <header className="chat-header">
                <h3>Memoria Attiva: {memoryName}</h3>
            </header>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                {isLoading && <div className="message ai typing-indicator"><span></span><span></span><span></span></div>}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Fai una domanda..."
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading}>Invia</button>
            </div>
        </main>
    );
}