import React from 'react';
import './Node.css';

export default function Node({
  row,
  column,
  isStart,
  isEnd,
  isWall,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const nodeType = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : isVisited
    ? 'node-visited'
    : '';

  return (
    <div
      id={`${row}-${column}`}
      className={`node ${nodeType}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      onMouseUp={() => onMouseUp(row, column)}
    ></div>
  );
}
