

import React, { useState } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const xStyle = {
  //'display' : 'flex',
};


const oStyle = {
  //'display' : 'flex',
};

function Square({
  idx,
  updateSquares,
  clsName
}) {
  const handleClick = () => updateSquares(idx);

  return (
    <div
      className={clsName}
      style={squareStyle}>
      onClick={() => console.log("Scooby-Doo!")}
    </div>
  );
}

function Board() {
const [squares, setSquares] = useState(Array(9).fill(""));
const [turn, setTurn] = useState("x");
const [winner, setWinner] = useState(null);

const checkEndTheGame = () => {
  for (let square of squares) {
    if (!square) return false;
  }
  return true;
}

const checkWinner = () => {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of combos) {
    const [a, b, c] = combo;
    if (squares[a] && 
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

const updateSquares = idx => {
console.log("clicked", idx)
  if (squares[idx] || winner) {
    return;
  }

  const s = squares;
  s[idx] = turn;
  setSquares(s);
  setTurn(turn === "x" ? "o" : "x");
  const W = checkWinner();

  if (W) {
    setWinner(W);
  } else if (checkEndTheGame()) {
    setWinner("x | o");
  }
}

const resetGame = () => {
  console.log("reset called!!!")
  setSquares(Array(9).fill(""));
  setTurn("x");
  setWinner(null);
};


  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{currentPlayer}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>None</span></div>
      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {Array.from("012").map(idx => (
            <Square
              key={idx}
              idx={idx}
              updateSquares={updateSquares}
              clsName={squares[idx] === "x" ? xStyle : oStyle}
            />
          ))}
        </div>
        <div className="board-row" style={rowStyle}>
          {Array.from("345").map(idx => (
            <Square
              key={idx}
              idx={idx}
              updateSquares={updateSquares}
              clsName={squares[idx] === "x" ? xStyle : oStyle}
            />
          ))}
        </div>
        <div className="board-row" style={rowStyle}>
          {Array.from("678").map(idx => (
            <Square
              key={idx}
              idx={idx}
              updateSquares={updateSquares}
              clsName={squares[idx] === "x" ? xStyle : oStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

        /**<div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>*/

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);
