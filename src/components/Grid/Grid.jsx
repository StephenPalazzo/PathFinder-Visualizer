import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Dijkstra, getShortestPath } from '../../Algorithms/Dijkstra';
import './Grid.css';

const START_NODE_ROW = 10;
const START_NODE_COLUMN = 15;
const END_NODE_ROW = 10;
const END_NODE_COLUMN = 35;

export default function Grid() {
  const [grid, setGrid] = useState(createGrid);

  return (
    <>
      <button
        onClick={() =>
          visualizeDijkstra(
            grid,
            grid[START_NODE_ROW][START_NODE_COLUMN],
            grid[END_NODE_ROW][END_NODE_COLUMN]
          )
        }
      >
        RUN
      </button>
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
    </>
  );
}

const createNode = (row, column) => {
  return {
    row,
    column,
    distance: Infinity,
    isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
    isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
    isVisited: false,
    previousNode: null,
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

function visualizeDijkstra(grid, startNode, endNode) {
  console.log(Dijkstra(grid, startNode, endNode));
  console.log(getShortestPath(endNode));
}
