export function Dijkstra(grid, startNode, endNode) {
  if (startNode === null || endNode === null || startNode === endNode)
    return 'Failed';

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
    unvisitedNodes.sort((nodeA, (nodeB) => nodeA.distance - nodeB.distance));

    const closestNode = unvisitedNodes.shift();

    if (closestNode.distance === Infinity) return 'Failed';

    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    // Need to still update surrounding unvisited nodes
  }
}
