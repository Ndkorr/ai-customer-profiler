import React, { useState, useRef, useEffect } from 'react';
import './CustomerChat.css';
import bg from './assets/CustomerBg.png';
import Loading from './assets/Loading';

export default function CustomerChat() {
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, from: 'customer', text: 'Hi, I need help with my product.', time: '9:05 AM' },
    { id: 2, from: 'agent', text: "Hello! I'm here to help. What's happening?", time: '9:06 AM' }
  ]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, minimized, open]);

  const send = (e) => {
    e && e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    setMessages(prev => [...prev, { id: Date.now(), from: 'customer', text: trimmed, time }]);
    setInput('');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="cc-chat-background"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`cc-chat-widget ${open ? 'open' : 'closed'} ${minimized ? 'min' : ''}`} role="dialog" aria-label="Customer chat">
        <div className="cc-header">
          <div className="cc-title">
            <span className="cc-avatar">CU</span>
            <div>
              <div className="cc-name">Customer Support</div>
              <div className="cc-status">Online</div>
            </div>
          </div>
          <div className="cc-controls">
            <button onClick={() => setMinimized(!minimized)} title="Minimize">{minimized ? '▣' : '—'}</button>
            <button onClick={() => setOpen(false)} title="Close">×</button>
          </div>
        </div>

        {!minimized && open && (
          <>
            <div className="cc-messages" ref={listRef}>
              {messages.map(m => (
                <div key={m.id} className={`cc-msg ${m.from}`}>
                  <div className="cc-bubble">{m.text}</div>
                  <div className="cc-time">{m.time}</div>
                </div>
              ))}
            </div>

            <form className="cc-input-area" onSubmit={send}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message"
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}

        {!open && (
          <div className="cc-minimized-bar" onClick={() => { setOpen(true); setMinimized(false); }}>
            <span>Chat</span>
          </div>
        )}
      </div>
    </div>
  );
}