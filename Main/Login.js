import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Loading from './assets/Loading';

function Login({ onLogin }) {
  const navigate = useNavigate();      
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailStep, setIsEmailStep] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailStep) {
      setIsEmailStep(false);
      return;
    }
    if (email && password) {
      // Check if the email contains 'support' or 'chat' to redirect to CustomerChat
      if (email.toLowerCase().includes('support') || email.toLowerCase().includes('chat')) {
        navigate('/customer-chat');
      } else {
        navigate('/main');  // Default navigation to main
      }
      onLogin({ email, password });
    }
  };

  const handleBack = () => {
    setIsEmailStep(true);
    setPassword('');
  };

  useEffect(() => {
    if (isEmailStep) {
      setIsButtonActive(email.trim().length > 0);
    } else {
      setIsButtonActive(password.trim().length > 0);
    }
  }, [email, password, isEmailStep]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>SIGN IN TO YOUR</h1>
        <h2>Trend Micro Account</h2>
        
        <form onSubmit={handleSubmit}>
          {isEmailStep ? (
            <div className="input-group">
              <label>Email address or mobile phone number (numbers only)</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div className="email-display">
                <span>{email}</span>
                <button type="button" onClick={handleBack} className="back-button">
                  Change
                </button>
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}
          
          <button 
            type="submit" 
            className={`login-button ${isButtonActive ? 'active' : ''}`}
            disabled={!isButtonActive}
          >
            {isEmailStep ? 'Next' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;