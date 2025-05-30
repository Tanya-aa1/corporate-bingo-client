import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import BingoBoard from '../components/BingoBoard';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3001');

// ===== INLINE STYLES =====
const styles = {
  gameRoom: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  roomHeader: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(5px)',
    borderRadius: '20px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  roomCode: {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(90deg, #ff4d4d, #f9cb28, #ff4d4d)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'shine 3s linear infinite',
    marginBottom: '0.5rem'
  },
  usernameDisplay: {
    fontSize: '1.3rem',
    color: '#4a5568',
    fontWeight: '600'
  },
  winnerModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    zIndex: '1000',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
    border: '2px solid gold',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
    animation: 'modalEntry 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
  },
  winnerText: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    background: 'linear-gradient(90deg, #ff4d4d, #f9cb28, #4CAF50, #2196F3, #9C27B0)',
    backgroundSize: '300% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'rainbow 4s linear infinite'
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  actionBtn: {
    border: 'none',
    borderRadius: '50px',
    padding: '0.8rem',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  homeBtn: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  playAgainBtn: {
    background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
    color: 'white'
  },
  loadingText: {
    fontSize: '1.5rem',
    color: '#4a5568',
    fontWeight: '600',
    animation: 'pulse 1.5s infinite'
  }
};

// ===== KEYFRAMES =====
const Keyframes = () => (
  <style>
    {`
      @keyframes shine {
        to { background-position: 200% center; }
      }
      @keyframes rainbow {
        to { background-position: 300% center; }
      }
      @keyframes modalEntry {
        from { 
          opacity: 0;
          transform: translate(-50%, -60%) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
    `}
  </style>
);

export default function GameRoom() {
  const { roomCode } = useParams();
  const [won, setWon] = useState(false);
  const [boardData, setBoardData] = useState(null);
  const [username, setUsername] = useState(() => `Player-${Math.floor(Math.random() * 1000)}`);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const enterSound = new Audio('/sounds/enter.wav');
    enterSound.play();
    socket.emit('join_room', { room: roomCode, username });

    socket.on('board_data', (board) => {
      setBoardData(board);
    });

    socket.on('bingo_winner', (winnerName) => {
      setWinner(winnerName);
      setWon(true);
    });

    return () => {
      socket.off('bingo_winner');
      socket.off('board_data');
    };
  }, [roomCode]);

  if (!boardData) return <div style={styles.loadingText}>Loading board...</div>;

  return (
    <div style={styles.gameRoom}>
      <Keyframes />
      {won && <Confetti width={width} height={height} numberOfPieces={500} />}
      
      <div style={styles.roomHeader}>
        <h1 style={styles.roomCode}>Room: {roomCode}</h1>
        <p style={styles.usernameDisplay}>Welcome, {username}</p>
      </div>

      {won && winner && (
        <div style={styles.winnerModal}>
          <h2 style={styles.winnerText}>
            🎉 {winner === username ? 'You have won!' : `${winner} has won!`}
          </h2>
          <div style={styles.actionButtons}>
            <button
              style={{ ...styles.actionBtn, ...styles.homeBtn }}
              onClick={() => navigate('/')}
            >
              🔙 Back to Home
            </button>
            <button
              style={{ ...styles.actionBtn, ...styles.playAgainBtn }}
              onClick={() => window.location.reload()}
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      )}

      <BingoBoard
        initialBoard={boardData}
        onBingo={() => {
          if (!won) {
            const winSound = new Audio('/sounds/win.wav');
            winSound.play();
            socket.emit('bingo_win', { room: roomCode, username });
            setWinner(username);
            setWon(true);
          }
        }}
      />
    </div>
  );
}