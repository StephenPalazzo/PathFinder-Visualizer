import React, { useState, useEffect } from 'react';
import './Grid.css';
import Node from './Node/Node';

const START_NODE_ROW = 10;
const START_NODE_COLUMN = 15;
const END_NODE_ROW = 10;
const END_NODE_COLUMN = 35;

export default function Grid() {
  const [grid, setGrid] = useState(createGrid);

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div className="gridColumn" key={rowIdx}>
            {row.map((node, columnIdx) => {
              const { row, column, isEnd, isStart } = node;
              return (
                <Node
                  key={columnIdx}
                  row={row}
                  column={column}
                  isEnd={isEnd}
                  isStart={isStart}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const createNode = (row, column) => {
  return {
    row,
    column,
    isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
    isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
  };
};

const createGrid = () => {
  const grid = [];

  for (let row = 0; row < 25; row++) {
    const newRow = [];
    for (let column = 0; column < 50; column++) {
      newRow.push(createNode(row, column));
    }
    grid.push(newRow);
  }

  return grid;
};
