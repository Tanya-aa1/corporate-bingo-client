// // BingoBoard.jsx
// import React, { useState, useEffect } from 'react';
// import './BingoBoard.css';

// export default function BingoBoard({ initialBoard, onBingo }) {
//   const [board, setBoard] = useState(initialBoard);

//   // const handleClick = (i, j) => {
//   //   const newBoard = board.map((row, rowIndex) =>
//   //     row.map((cell, colIndex) =>
//   //       rowIndex === i && colIndex === j
//   //         ? { ...cell, marked: !cell.marked }
//   //         : cell
//   //     )
//   //   );
//   //   setBoard(newBoard);
//   // };
// const handleClick = (i, j) => {
//   const clickSound = new Audio('/sounds/click.wav');
//   clickSound.play();

//   const newBoard = board.map((row, rowIndex) =>
//     row.map((cell, colIndex) =>
//       rowIndex === i && colIndex === j
//         ? { ...cell, marked: !cell.marked }
//         : cell
//     )
//   );
//   setBoard(newBoard);
// };
// BingoBoard.jsx
import React, { useState, useEffect } from 'react';
import './BingoBoard.css'; // Make sure this import exists

export default function BingoBoard({ initialBoard, onBingo }) {
  const [board, setBoard] = useState(initialBoard);

  const handleClick = (i, j) => {
    const clickSound = new Audio('/sounds/click.wav');
    clickSound.play();

    const newBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === i && colIndex === j
          ? { ...cell, marked: !cell.marked }
          : cell
      )
    );
    setBoard(newBoard);
  };

  const checkWin = () => {
    const isMarked = (i, j) => board[i][j].marked;

    for (let i = 0; i < 5; i++) {
      if (board[i].every(cell => cell.marked)) return true;
      if (board.every(row => row[i].marked)) return true;
    }

    if ([0, 1, 2, 3, 4].every(i => isMarked(i, i))) return true;
    if ([0, 1, 2, 3, 4].every(i => isMarked(i, 4 - i))) return true;

    return false;
  };

//   useEffect(() => {
//     if (checkWin()) {
//       onBingo();
//     }
//   }, [board]);

//   return (
//     <div className="d-flex flex-column align-items-center">
//       <div className="d-grid" style={{ gridTemplateColumns: 'repeat(5, 120px)' }}>
//         {board.map((row, i) =>
//           row.map((cell, j) => (
//             <button
//               key={`${i}-${j}`}
//               className={`btn m-1 ${cell.marked ? 'btn-success' : 'btn-outline-secondary'}`}
//               onClick={() => handleClick(i, j)}
//             >
//               {cell.text}
//             </button>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
useEffect(() => {
    if (checkWin()) onBingo();
  }, [board]);

  return (
    <div className="bingo-container">
      <div className="bingo-board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`bingo-tile ${cell.marked ? 'selected' : ''}`}
              onClick={() => handleClick(i, j)}
            >
              {cell.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}