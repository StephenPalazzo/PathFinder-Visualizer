import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { Dijkstra, getShortestPath } from '../../Algorithms/Dijkstra';
import './Grid.css';

export default function Grid() {
  const [startNodeCords, setStartNodeCords] = useState({ row: 10, col: 15 });
  const [endNodeCords, setEndNodeCords] = useState({ row: 10, col: 45 });
  const [grid, setGrid] = useState(createGrid());
  const [interactionType, setInteractionType] = useState({
    wallNode: false,
    startNode: false,
    endNode: false,
  });

  return (
    <>
      <div className="grid-controls">
        <button
          onClick={() =>
            visualizeDijkstra(
              grid,
              grid[startNodeCords.row][startNodeCords.col],
              grid[endNodeCords.row][endNodeCords.col]
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
                const {
                  row,
                  column,
                  isEnd,
                  isStart,
                  isWall,
                  isVisited,
                  draggable,
                } = node;
                return (
                  <Node
                    key={columnIdx}
                    row={row}
                    column={column}
                    isEnd={isEnd}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={(row, col) => handleMouseUp(row, col)}
                    draggable={draggable}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );

  function updateGridWithWallNode(row, column) {
    const node = grid[row][column];

    const updateNode = {
      ...node,
      isWall: !node.isWall,
    };
    grid[row][column] = updateNode;
    return grid;
  }

  function updateGridWithStartNode(row, col) {
    const oldStartNode = grid[startNodeCords.row][startNodeCords.col];
    const updateOldStartNode = {
      ...oldStartNode,
      isStart: false,
    };

    grid[oldStartNode.row][oldStartNode.column] = updateOldStartNode;

    const newStartNode = grid[row][col];

    const updateNewStartNode = {
      ...newStartNode,
      isStart: true,
    };

    grid[row][col] = updateNewStartNode;

    setStartNodeCords({
      row: row,
      col: col,
    });
    return grid;
  }

  function updateGridWithEndNode(row, col) {
    const oldEndNode = grid[endNodeCords.row][endNodeCords.col];
    const updateOldEndNode = {
      ...oldEndNode,
      isEnd: false,
    };

    grid[oldEndNode.row][oldEndNode.column] = updateOldEndNode;

    const newEndNode = grid[row][col];

    const updateNewEndNode = {
      ...newEndNode,
      isEnd: true,
    };

    grid[row][col] = updateNewEndNode;

    setEndNodeCords({
      row: row,
      col: col,
    });
    return grid;
  }

  function handleMouseDown(row, col) {
    if (grid[row][col].isStart) {
      setInteractionType({ ...interactionType, startNode: true });
    } else if (grid[row][col].isEnd) {
      setInteractionType({ ...interactionType, endNode: true });
    } else {
      setGrid(updateGridWithWallNode(row, col));
      setInteractionType({ ...interactionType, wallNode: true });
    }
  }

  function handleMouseEnter(row, col) {
    if (!interactionType.wallNode) return;
    setGrid(updateGridWithWallNode(row, col));
  }

  function handleMouseUp(row, col) {
    if (interactionType.startNode) {
      setGrid(updateGridWithStartNode(row, col));
      setInteractionType({ ...interactionType, startNode: false });
    } else if (interactionType.endNode) {
      setGrid(updateGridWithEndNode(row, col));
      setInteractionType({ ...interactionType, endNode: false });
    } else {
      setInteractionType({ ...interactionType, wallNode: false });
    }
  }

  function createNode(row, column) {
    return {
      row,
      column,
      distance: Infinity,
      isStart: row === startNodeCords.row && column === startNodeCords.col,
      isEnd: row === endNodeCords.row && column === endNodeCords.col,
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
