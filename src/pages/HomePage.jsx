import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ===== STYLES =====
const styles = {
  container: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    background: 'linear-gradient(90deg, #ff4d4d, #f9cb28, #4CAF50, #2196F3, #9C27B0)',
    backgroundSize: '300% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'rainbow 4s linear infinite',
    marginBottom: '2rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  createButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    width: '250px'
  },
  joinContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1rem'
  },
  input: {
    padding: '1rem',
    borderRadius: '50px',
    border: '2px solid rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.8)',
    width: '100%',
    maxWidth: '300px',
    fontSize: '1rem',
    outline: 'none',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  },
  joinButton: {
    background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    width: '250px'
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 
      'radial-gradient(circle at 20% 30%, rgba(255, 100, 100, 0.1) 0%, transparent 20%),' +
      'radial-gradient(circle at 80% 70%, rgba(100, 255, 100, 0.1) 0%, transparent 20%),' +
      'radial-gradient(circle at 50% 90%, rgba(100, 100, 255, 0.1) 0%, transparent 20%)',
    zIndex: -1
  }
};

// ===== KEYFRAMES =====
const Keyframes = () => (
  <style>
    {`
      @keyframes rainbow {
        to { background-position: 300% center; }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `}
  </style>
);

export default function Home() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    const newCode = Math.random().toString(36).substring(2, 6);
    navigate(`/room/${newCode}`);
  };

  const handleJoin = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div style={styles.container}>
      <Keyframes />
      <div style={styles.particles}></div>
      
      <h1 style={styles.title}>Corporate Cringe Bingo</h1>
      
      <div style={styles.buttonGroup}>
        <button 
          style={styles.createButton}
          onClick={handleCreate}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          🎮 Create Game
        </button>
        
        <div style={styles.joinContainer}>
          <input
            style={styles.input}
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
            onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(100, 200, 255, 0.5)'}
            onBlur={e => e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'}
          />
          <button 
            style={styles.joinButton}
            onClick={handleJoin}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🚀 Join Game
          </button>
        </div>
      </div>
    </div>
  );
}