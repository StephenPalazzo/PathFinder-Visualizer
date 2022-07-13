import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Dijkstra, getShortestPath } from '../../Algorithms/Dijkstra';
import './Grid.css';

let START_NODE_ROW = 10;
let START_NODE_COLUMN = 15;
let END_NODE_ROW = 10;
let END_NODE_COLUMN = 45;

export default function Grid() {
  //const [startNode, setStartNode] = useState([10, 15]);
  //const [endNode, setEndNode] = useState([10, 45]);
  const [grid, setGrid] = useState(createGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  return (
    <>
      <div className="grid-controls">
        <button
          onClick={() =>
            visualizeDijkstra(
              grid,
              grid[START_NODE_ROW][START_NODE_COLUMN],
              grid[END_NODE_ROW][END_NODE_COLUMN]
            )
          }
        >
          SEARCH
        </button>
        <button onClick={() => window.location.reload(false)}>CLEAR</button>
      </div>
      <div className="grid-layout">
        {grid.map((row, rowIdx) => {
          return (
            <div className="gridColumn" key={rowIdx}>
              {row.map((node, columnIdx) => {
                const { row, column, isEnd, isStart, isWall, isVisited } = node;
                return (
                  <Node
                    key={columnIdx}
                    row={row}
                    column={column}
                    isEnd={isEnd}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );

  function updateGridWithWall(row, column) {
    const node = grid[row][column];

    const updateNode = {
      ...node,
      isWall: !node.isWall,
    };
    grid[row][column] = updateNode;
    return grid;
  }

  function handleMouseDown(row, col) {
    setGrid(updateGridWithWall(row, col));
    setMouseIsPressed(true);
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    setGrid(updateGridWithWall(row, col));
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }
}

function createNode(row, column) {
  return {
    row,
    column,
    distance: Infinity,
    isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
    isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
    isWall: false,
    isVisited: false,
    previousNode: null,
  };
}

function createGrid() {
  const grid = [];

  for (let row = 0; row < 25; row++) {
    const newRow = [];
    for (let column = 0; column < 60; column++) {
      newRow.push(createNode(row, column));
    }
    grid.push(newRow);
  }

  return grid;
}

function updateStartNode(grid, row, column) {
  const startNode = grid[row][column];

  const updateStartNode = {
    ...startNode,
  };
  grid[row][column] = updateStartNode;
  return grid;
}

function visualizeDijkstra(grid, startNode, endNode) {
  const visitedNodes = Dijkstra(grid, startNode, endNode);
  const shortestPathOfNodes = getShortestPath(endNode);
  animatingDijkstra(visitedNodes, shortestPathOfNodes);
}

function animatingDijkstra(visitedNodes, shortestPathOfNodes) {
  for (let i = 0; i < visitedNodes.length; i++) {
    const node = visitedNodes[i];
    if (node.isStart || node.isEnd) continue;
    setTimeout(() => {
      document.getElementById(`${node.row}-${node.column}`).className =
        'node node-visited';
      if (i === visitedNodes.length - 2) {
        animatingPath(shortestPathOfNodes);
      }
    }, 5 * i);
  }
}

function animatingPath(shortestPathOfNodes) {
  for (let i = 0; i < shortestPathOfNodes.length; i++) {
    const node = shortestPathOfNodes[i];
    if (node.isStart || node.isEnd) continue;
    setTimeout(() => {
      document.getElementById(`${node.row}-${node.column}`).className =
        'node node-path';
    }, 100 * i);
  }
}
