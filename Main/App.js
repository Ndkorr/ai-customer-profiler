import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CustomerChat from './CustomerChat';
import MainDashboard from './main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={(credentials) => {/* handle login */}} />} />
        <Route path="/customer-chat" element={<CustomerChat />} />
        <Route path="/main" element={<MainDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;