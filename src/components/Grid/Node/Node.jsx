import React from 'react';
import './Node.css';

export default function Node({ row, column, isStart, isEnd }) {
  const nodeType = isStart ? 'node-start' : isEnd ? 'node-end' : '';

  return <div id={`${row}-${column}`} className={`node ${nodeType}`}></div>;
}
