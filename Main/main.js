import React from "react";
import "./MainDashboard.css";

export default function MainDashboard() {
  return (
    <div className="d365-root">
      {/* Top Bar */}
      <header className="d365-header">
        <span className="d365-logo">Dynamics 365</span>
        <span className="d365-title">Omnichannel for Customer Service</span>
        <div className="d365-header-actions">
          <span className="d365-user">ML</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="d365-main">
        {/* Left Panel: Communication */}
        <aside className="d365-comm-panel">
          <div className="d365-comm-header">
            <span>Email Reminder | Protection...</span>
            <button className="d365-end-btn">End</button>
          </div>
          <div className="d365-chat">
            <div className="d365-chat-msg agent">
              <b>Mark:</b> Thank you for contacting Trend Micro Consumer Support...
            </div>
            <div className="d365-chat-msg customer">
              <b>Customer:</b> I keep getting a reminder my anti virus protection...
            </div>
            {/* ...more messages */}
          </div>
          <div className="d365-chat-input">
            <input placeholder="Type your public message ..." />
            <button>Send</button>
          </div>
        </aside>

        {/* Center Panel: Case Details */}
        <main className="d365-case-panel">
          <div className="d365-case-header">
            <span>Email Reminder | Protection Expired</span>
            <span className="d365-case-status">Open</span>
            <span className="d365-case-owner">Mark Lionel Masilang</span>
          </div>
          <div className="d365-case-summary">
            <div>
              <h4>Case Details</h4>
              <div>ID: TM-4508915-Q5H6Y4</div>
              <div>Case Title: Email Reminder | Protection Expired</div>
              <div>First name: Karen</div>
              <div>Last name: Cooper</div>
            </div>
            <div>
              <h4>Case Summary Copilot</h4>
              <div>Case summary...</div>
            </div>
          </div>
        </main>

        {/* Right Panel: Copilot */}
        <aside className="d365-copilot-panel">
          <div className="d365-copilot-header">Copilot</div>
          <div className="d365-copilot-content">
            <b>What is the process to combine multiple Trend Micro subscriptions for protecting multiple devices?</b>
            <p>
              To protect multiple devices with Trend Micro, you need to purchase additional subscriptions...
            </p>
            <button>Accept insight</button>
          </div>
          <input className="d365-copilot-input" placeholder="Describe what you need" />
        </aside>
      </div>
    </div>
  );
}