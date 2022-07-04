import React from 'react';
import './Node.css';

export default function Node() {
  const row = this.props;
  const column = this.props;
  const isStart = this.props;
  const isEnd = this.props;
  const nodeType = isStart ? 'start-node' : isEnd ? 'end-node' : 'regular-node';

  return (
    <div id={`${row}-${column}`} className={`${nodeType}`}>
      Node
    </div>
  );
}
