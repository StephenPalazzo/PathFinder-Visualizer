export function Dijkstra(grid, startNode, endNode) {
  if (startNode === null || endNode === null || startNode === endNode)
    return 'Failed/Null';

  const visitedNodes = [];
  startNode.distance = 0;

  const unvisitedNodes = [];
  grid.forEach((row) => {
    row.forEach((node) => {
      unvisitedNodes.push(node);
    });
  });

  let loop = true;
  while (loop) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    const closestNode = unvisitedNodes.shift();
    if (closestNode.distance === Infinity) return 'Failed/NoPath';

    closestNode.isVisited = true;
    visitedNodes.push(closestNode);

    if (closestNode === endNode) return visitedNodes;
    updateNeighborNodes(closestNode, grid);
  }
}

function updateNeighborNodes(node, grid) {
  let neighborNodes = [];
  const row = node.row;
  const column = node.column;

  if (row > 0) neighborNodes.push(grid[row - 1][column]);
  if (row < grid.length - 1) neighborNodes.push(grid[row + 1][column]);
  if (column > 0) neighborNodes.push(grid[row][column - 1]);
  if (column < grid[0].length - 1) neighborNodes.push(grid[row][column + 1]);

  neighborNodes = neighborNodes.filter(
    (nodes) => !nodes.isVisited && !nodes.isWall
  );

  for (const neighborNode of neighborNodes) {
    neighborNode.distance = node.distance + 1;
    neighborNode.previousNode = node;
  }
}

export function getShortestPath(endNode) {
  const shortestPathOfNodes = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    shortestPathOfNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return shortestPathOfNodes;
}
