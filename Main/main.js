import React, { useState, useEffect } from "react";
import './main.css';
import Login from './Login';
import './Login.css';
import Loading from './assets/Loading';


export default function MainDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("Home");

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


  useEffect(() => {
    // Check if user was previously authenticated (e.g. from localStorage)
    const checkAuth = async () => {
      try {
        // Simulate checking authentication
        const wasAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (wasAuthenticated) {
          setIsAuthenticated(true);
        }
      } finally {
        // Set loading to false after auth check completes
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
      }
    };

    checkAuth();
  }, []);

  //Handle login
  const handleLogin = (credentials) => {
    setIsLoading(true); // Show loading during login
    
    // Simulate login API call
    setTimeout(() => {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return <Loading />;
  }


  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

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
            showCopilot={showCopilot}
            setShowCopilot={setShowCopilot}
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


function HomeDashboard({ workItems, setWorkItems, showCopilot, setShowCopilot }) {

  
  return (
    <div className="d365-dashboard">
      <div className="d365-panels">
        <div className="d365-dashboard-content">
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

        <div className="d365-dashboard-copilot-divider"></div>
        <div className="d365-copilot-container">
          <CopilotControl 
            showCopilot={showCopilot}
            onToggle={() => setShowCopilot(!showCopilot)}
          />
          {showCopilot && <CopilotPanel onClose={() => setShowCopilot(false)} />}
        </div>
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
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedView, setSelectedView] = useState('summary');

  const handleCreateCase = () => {
    setActiveTab('new');
  };
  

  const renderNewCaseContent = () => (
    <div className="summary-container">
      {/* Left Column */}
      <div className="summary-column">
        <div className="summary-section">
          <h2 className="summary-section-title">Case Information</h2>
          <div className="summary-section-content">
            <div className="summary-field">
              <label>Case Number</label>
              <input type="text" className="d365-input" value="CAS-2025-001" readOnly />
            </div>
            <div className="summary-field">
              <label>Case Title</label>
              <input type="text" className="d365-input" />
            </div>
            <div className="summary-field">
              <label>Description</label>
              <textarea className="d365-input" rows="4"></textarea>
            </div>
            <div className="summary-field">
              <label>Priority</label>
              <select className="d365-input">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <h2 className="summary-section-title">Case Information</h2>
          <div className="summary-section-content">
            <div className="summary-field">
              <label>Case Origin</label>
              <select className="d365-input">
                <option>Chat</option>
                <option>Email</option>
                <option>Phone</option>
                <option>Web</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Sub Status</label>
              <select className="d365-input">
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Sub Status</label>
              <select className="d365-input">
                <option>Open</option>
                <option>In Progress</option>
                <option>Pending</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="summary-column">
        <div className="summary-section">
          <h2 className="summary-section-title">Customer Details</h2>
          <div className="summary-section-content">
            <div className="summary-field">
              <label>First Name</label>
              <input type="text" className="d365-input" placeholder="Enter first name" />
            </div>
            <div className="summary-field">
              <label>Last Name</label>
              <input type="text" className="d365-input" placeholder="Enter last name" />
            </div>
            <div className="summary-field">
              <label>Phone Number</label>
              <input type="tel" className="d365-input" placeholder="Enter phone number" />
            </div>
            <div className="summary-field">
              <label>Email Address</label>
              <input type="email" className="d365-input" placeholder="Enter email address" />
            </div>
            <div className="summary-field">
              <label>Country</label>
              <select className="d365-input">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Product SN</label>
              <input type="text" className="d365-input" placeholder="Enter serial number" />
            </div>
            <div className="summary-field">
              <label>License Type</label>
              <select className="d365-input">
                <option>Premium</option>
                <option>Standard</option>
                <option>Basic</option>
                <option>Trial</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Customer Type</label>
              <select className="d365-input">
                <option>Existing</option>
                <option>New</option>
                <option>Potential</option>
              </select>
            </div>
          </div>
        </div>

        <div className="summary-section">
          <h2 className="summary-section-title">Additional Information</h2>
          <div className="summary-section-content">
            <div className="summary-field">
              <label>Product Information</label>
              <select className="d365-input">
                <option>MAXIMUM SECURITY</option>
                <option>ANTIVIRUS+</option>
                <option>INTERNET SECURITY</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Product Version</label>
              <select className="d365-input">
                <option>17.9</option>
                <option>17.8</option>
                <option>17.7</option>
                <option>17.6</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Problem Category</label>
              <select className="d365-input">
                <option>Installation</option>
                <option>Activation</option>
                <option>Performance</option>
                <option>Updates</option>
              </select>
            </div>
            <div className="summary-field">
              <label>Subcategory</label>
              <select className="d365-input">
                <option>Error Message</option>
                <option>System Crash</option>
                <option>Feature Not Working</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderSummaryContent = () => (
    <div className="d365-case-content">
      <div className="summary-layout">
        <div className="details-section">
          <h2 className="details-title">Conversation Details</h2>
          <div className="summary-details">
            <div className="meta-item">
              <label>First Name</label>
              <label className="d365-input"> Louis </label>
            </div>
            <div className="meta-item">
              <label>Last Name</label>
              <label className="d365-input"> Smith </label>
            </div>
            <div className="meta-item">
              <label>Email Address</label>
              <label className="d365-input"> example@example.com </label>
            </div>
            <div className="meta-item">
              <label>Country</label>
              <label className="d365-input"> USA </label>
            </div>
            <div className="meta-item">
              <label>Concern</label>
              <label className="d365-input"> Can't Open Antivirus </label>
            </div>
          </div>
        </div>
        
        <div className="action-section">
          <h2 className="action-title">Case Details</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search issue..." 
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="create-case-wrapper">
            <span className="source-record-status">Source record not selected</span>
            <span className="wrench-icon">🔧</span>
            <button 
              className="create-case-btn"
              onClick={handleCreateCase}
            >
              + Create new case
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className={`d365-case-panel ${!showCopilot ? 'expanded' : ''}`}>
      <div className="d365-case-nav">
        <div
            className={`nav-item${activeTab === 'summary' ? ' active' : ''}`}
            onClick={() => setActiveTab('summary')}
        >
          <span className="nav-icon">📄</span>
          Customer Summary
        </div>
        <div
          className={`nav-item${activeTab === 'new' ? ' active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          <span className="nav-icon">➕</span>
          New Case
          <span className="nav-close">×</span>
        </div>
      </div>

      {activeTab === 'summary' ? (
        renderSummaryContent()
      ) : (
        <>
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
            <div className="d365-case-subnav">
              <div
                className={`nav-item${selectedView === 'summary' ? ' active' : ''}`}
                
              >
                Summary
              </div>
              <div
                className={`nav-item${selectedView === 'additional' ? ' active' : ''}`}
                onClick={() => setActiveTab('additional')}
              >
                Additional Information
              </div>
              <div
                className={`nav-item${selectedView === 'entitlement' ? ' active' : ''}`}
                onClick={() => setActiveTab('entitlement')}
              >
                Entitlement
              </div>
            </div>
          </div>  
        </>
      )}

      {/* Rest of the case content */}
      <div className="d365-case-content">
        {selectedView === 'summary' && renderNewCaseContent()}
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