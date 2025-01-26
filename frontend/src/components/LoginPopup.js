import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../styles/Button'



function LoginPopup({ onClose, onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('authToken', data.access)
        onSuccess()
      } else {
        setError(data.detail || 'Invalid credentials')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <PopupWrapper>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup">
        <h2>Login</h2>
        <input
          style={{ textTransform: 'none' }}  
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ textTransform: 'none' }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="popup-actions">
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={onClose} className="cancel">
            Cancel
          </Button>
        </div>
      </div>
    </PopupWrapper>
  )
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .popup {
    position: relative;
    z-index: 2;
    background: #fff;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;

    h2 {
      margin-bottom: 1.5rem;
      color: ${({ theme }) => theme.colors.heading || '#333'};
    }

    input {
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .popup-actions {
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      .cancel {
        background-color: #e74c3c;
        color: #fff;
      }
    }
  }
`

export default LoginPopup
