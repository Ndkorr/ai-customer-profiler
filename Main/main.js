import React, { useState, useEffect } from "react";

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("Louis"); // or "Home"

  const [showCopilot, setShowCopilot] = useState(true);

  const [workItems, setWorkItems] = useState({
    my: [
      
      // Add more items as needed
      {
        id: 1,
        title: 'HelpCenterEN Prechat',
        customer: 'Louis',
        time: '9/11/2025 10:04 AM',
        status: 'Active',
        icon: '📄'
      }
    ],
    open: [
      
      // Add more items as needed
    ],
    closed: [
      {
        id: 2,
        title: 'ANZCShop ProactiveChat',
        customer: 'ANZ Chat Workstream',
        time: '9/4/2025 11:04 PM',
        status: 'Open',
        icon: '📄'
      },

      {
        id: 3,
        title: 'HelpCenterEN Prechat',
        customer: 'EN Prechat',
        time: '9/4/2025 10:22 PM',
        status: 'Open',
        icon: '📄'
      }
    ]
  });

  // Lift conversation state up
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      sender: 'Mathew',
      text: 'Thank you for contacting Trend Micro Consumer Support...',
      time: '8:38 AM',
      date: '9/5',
      delivered: true
    },
    {
      type: 'customer',
      sender: 'Customer',
      text: 'I keep getting a reminder my anti virus protection...',
      time: '8:39 AM',
      date: '9/5'
    }
  ]);
  // Lift timer state up
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Move timer logic to parent
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  


  // Add function to handle tab close
  const handleTabClose = () => {
    // Find Louis in work items and move to closed
    setWorkItems(prev => {
      const louisItem = prev.my.find(item => item.customer === 'Louis');
      if (!louisItem) return prev;

      const closedItem = {
        ...louisItem,
        status: 'Closed',
        time: new Date().toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };

      return {
        ...prev,
        my: prev.my.filter(item => item.customer !== 'Louis'),
        closed: [closedItem, ...prev.closed]
      };
    });
    setActiveTab("Home");
  };

  return (
    <div className="d365-root">
      {/* Top Bar */}
      <header className="d365-header">
        <span className="d365-app-launcher">
        {/* App launcher grid icon (simple SVG) */}
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="2" y="2" width="3" height="3" fill="#fff"/>
          <rect x="8" y="2" width="3" height="3" fill="#fff"/>
          <rect x="14" y="2" width="3" height="3" fill="#fff"/>
          <rect x="2" y="8" width="3" height="3" fill="#fff"/>
          <rect x="8" y="8" width="3" height="3" fill="#fff"/>
          <rect x="14" y="8" width="3" height="3" fill="#fff"/>
          <rect x="2" y="14" width="3" height="3" fill="#fff"/>
          <rect x="8" y="14" width="3" height="3" fill="#fff"/>
          <rect x="14" y="14" width="3" height="3" fill="#fff"/>
        </svg>
      </span>
      <span className="d365-logo">Dynamics 365</span>
      <span className="d365-divider">|</span>
      <span className="d365-title">Omnichannel for Customer Service</span>
      <span className="d365-search-wrapper">
        <input className="d365-search" placeholder="Search" />
        <span className="d365-search-icon" role="img" aria-label="search">🔍</span>
      </span>
      <div className="d365-header-icons">
        <span className="icon-bulb" title="Lightbulb">💡</span>
        <span className="icon-add" title="Add">+</span>
        <span className="icon-settings" title="Settings">⚙️</span>
        <span className="icon-help" title="Help">?</span>
        <span className="icon-notification" title="Notification">🟡</span>
      </div>
      <span className="d365-user">MA</span>
    </header>

      {/* Main Content */}
      <div className="d365-main">
        <div className="d365-tab-bar">
        <button
          className={`d365-tab${activeTab === "Home" ? " active" : ""}`}
          onClick={() => setActiveTab("Home")}
          >
            Home
          </button>
          {workItems.my.some(item => item.customer === 'Louis') && (
            <button
              className={`d365-tab${activeTab === "Louis" ? " active" : ""}`}
              onClick={() => setActiveTab("Louis")}
            >
              Louis
              <span
                className="d365-tab-close"
                title="Close"
                onClick={e => {
                  e.stopPropagation();
                  handleTabClose();
                }}
              >×</span>
            </button>
          )}
        </div>
        {activeTab === "Home" ? (
          <HomeDashboard
            workItems={workItems}
            setWorkItems={setWorkItems}
          />
        ) : (
          <div className="d365-panels">
            <CommPanel 
              messages={messages}
              setMessages={setMessages}
              minutes={minutes}
              seconds={seconds}
            />
            <div className="d365-divider-vertical" />
            <CasePanel showCopilot={showCopilot} />
            <div className="d365-divider-vertical" />
            <CopilotControl 
              showCopilot={showCopilot}
              onToggle={() => setShowCopilot(!showCopilot)}
            />
            {showCopilot && <CopilotPanel onClose={() => setShowCopilot(false)} />}
          </div>
        )}
      </div>
    </div>
  );
}


function HomeDashboard({ workItems, setWorkItems }) {
  

  return (
    <div className="d365-dashboard">
      <header className="d365-dashboard-header">
        <div className="d365-dashboard-title">
          <span>Omnichannel Representative Dashboard</span>
          <button className="d365-dashboard-button">▼</button>
        </div>
        <div className="d365-dashboard-actions">
          <button className="d365-dashboard-button">
            <span>Save As</span>
          </button>
          <button className="d365-dashboard-button">
            <span>+ New</span>
          </button>
          <button className="d365-dashboard-button">
            <span>✓ Set As Default</span>
          </button>
          <button className="d365-dashboard-button">
            <span>↻ Refresh All</span>
          </button>
          <button className="d365-dashboard-button">
            <span>Share</span>
          </button>
        </div>
      </header>

      <div className="d365-dashboard-content">
        <section className="d365-work-items">
          <div className="d365-work-header">
            <h3 className="d365-work-title">
              My work items
            </h3>
            <span className="d365-work-count">{workItems.my.length}</span>
          </div>
          <div className="d365-work-list">
            {workItems.my.map(item => (
              <div key={item.id} className="d365-work-item">
                <span className="d365-work-icon">{item.icon}</span>
                <div className="d365-work-details">
                  <div className="d365-work-name">{item.title}</div>
                  <div className="d365-work-meta">
                    {item.customer} • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="d365-work-items">
          <div className="d365-work-header">
            <h3 className="d365-work-title">
              Open work items
            </h3>
            <span className="d365-work-count">0</span>
          </div>
          <div className="d365-work-list">
            {workItems.open.map(item => (
              <div key={item.id} className="d365-work-item">
                <span className="d365-work-icon">{item.icon}</span>
                <div className="d365-work-details">
                  <div className="d365-work-name">{item.title}</div>
                  <div className="d365-work-meta">
                    {item.customer} • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="d365-work-items">
          <div className="d365-work-header">
            <h3 className="d365-work-title">
              Closed work items
            </h3>
            <span className="d365-work-count">{workItems.closed.length}</span>
          </div>
          <div className="d365-work-list">
            {workItems.closed.map(item => (
              <div key={item.id} className="d365-work-item">
                <span className="d365-work-icon">{item.icon}</span>
                <div className="d365-work-details">
                  <div className="d365-work-name">{item.title}</div>
                  <div className="d365-work-meta">
                    {item.customer} • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


export function CommPanel({messages, setMessages, minutes, seconds }) {
  // Chat Logic with time and date
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    const date = now.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric'
    });

    setMessages([...messages, {
      type: 'agent',
      sender: 'Mathew',
      text: newMessage,
      time,
      date,
      delivered: true
    }]);
    setNewMessage('');
  };


  return (
    <aside className="d365-comm-panel">
      <div className="d365-comm-header">
        <div className="d365-visitor-info">
          <div className="d365-visitor-timer">
            <span className="visitor-icon">👤</span>
            <span className="visitor-name">Visitor 2</span>
          </div>
          <div className="d365-visitor-status">
            <span className="visitor-time">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
            <span className="status-divider">|</span>
            <span className="visitor-status">Neutral</span>
          </div>
        </div>
        <button className="d365-end-btn">End</button>
      </div>
      <div className="d365-chat">
        {messages.map((msg, index) => (
          <div key={index} className={`d365-chat-msg ${msg.type}`}>
            <div className="chat-msg-header">
              {msg.type === 'customer' ? (
                <span className="chat-avatar">CU</span>
              ) : (
                <span className="chat-agent">MA</span>
              )}
              <span className="chat-sender">{msg.sender}</span>
              <span className="chat-time">{msg.date} {msg.time}</span>
              {msg.delivered && msg.type === 'agent' && (
                <span className="chat-delivered">✓</span>
              )}
            </div>
            <div className="chat-msg-content">{msg.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="d365-chat-input">
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your public message ..." 
        />
        <button type="submit">Send</button>
      </form>
    </aside>
  );
}

export function CasePanel({ showCopilot }) {
  return (
    <main className={`d365-case-panel ${!showCopilot ? 'expanded' : ''}`}>
      <div className="d365-case-nav">
        <div className="nav-item active">
          <span className="nav-icon">📄</span>
          Customer Summary
        </div>
        <div className="nav-item">
          <span className="nav-icon">➕</span>
          New Case
          <span className="nav-close">×</span>
        </div>
      </div>

      <div className="d365-case-actions">
        <div className="action-group">
          <button className="action-btn">
            <span className="action-icon">💾</span>
            Save
          </button>
          <button className="action-btn">
            <span className="action-icon">📁</span>
            Save & Close
          </button>
          <button className="action-btn">
            <span className="action-icon">🔄</span>
            Save & Route
          </button>
        </div>
        <div className="action-group">
          <button className="action-btn">
            <span className="action-icon">➕</span>
            New
          </button>
          <button className="action-btn">
            <span className="action-icon">📋</span>
            Case to KB
          </button>
          <button className="action-btn">
            <span className="action-icon">⋮</span>
          </button>
        </div>
      </div>

      <div className="d365-case-header">
        <div className="case-title">New Case - Unsaved</div>
        <div className="case-meta">
          <div className="meta-item">
            <label>Case</label>
            <span>Global case creation</span>
          </div>
          <div className="meta-item">
            <label>Status</label>
            <span className="status-badge">Open</span>
          </div>
          <div className="meta-item">
            <label>Owner</label>
            <div className="owner-info">
              <span className="owner-avatar">MA</span>
              <span>Mathew Astorga</span>
            </div>
          </div>
          <div className="meta-item">
            <label>Created On</label>
            <span>...</span>
          </div>
          <div className="meta-item">
            <label>Priority</label>
            <span>...</span>
          </div>
        </div>
      </div>

      {/* Rest of the case content */}
      <div className="d365-case-content">
        {/* ...existing case content... */}
      </div>
    </main>
  );
}

export function CopilotPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('suggestions');

  return (
    <aside className="d365-copilot-panel">
      <div className="d365-copilot-header">
        <span>Copilot</span>
        <button className="copilot-close" onClick={onClose}>×</button>
      </div>
      <div className="d365-copilot-tabs">
        <button 
          className={`copilot-tab ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Suggested responses
        </button>
        <button 
          className={`copilot-tab ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Case summary
        </button>
      </div>
      <div className="d365-copilot-content">
        {activeTab === 'suggestions' && (
          <div className="copilot-message">
            <div className="message-header">
              <span className="copilot-icon">🤖</span>
              <span>Hi Mathew,</span>
            </div>
            <p>What can I help you with today?</p>
          </div>
        )}
      </div>
      <div className="d365-copilot-input-wrapper">
        <input 
          className="d365-copilot-input" 
          placeholder="Describe what you need or select a suggestion to get started" 
        />
        <button className="copilot-send">➤</button>
      </div>
    </aside>
  );
}

export function CopilotControl({ showCopilot, onToggle }) {
  return (
    <aside className="d365-copilot-control">
      <button 
        className={`copilot-toggle ${showCopilot ? 'active' : ''}`}
        onClick={onToggle}
      >
        <span className="copilot-icon">🤖</span>
      </button>
    </aside>
  );
}