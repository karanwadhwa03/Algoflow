export function DijkstraWD(grid, startNode, finishNode) {
  const visitedOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  let N = unvisitedNodes.length;
  while (N--) {
    const closestNode = getClosestNeighbour(unvisitedNodes);
    if (closestNode === null) {
      return [visitedOrder, calculatePath(finishNode)];
    }

    if (closestNode.distance === Infinity) {
      return [visitedOrder, calculatePath(finishNode)];
    }
    closestNode.isVisited = true;
    visitedOrder.push(closestNode);

    if (closestNode === finishNode) {
      return [visitedOrder, calculatePath(finishNode)];
    }
    const x = [-1, -1, -1, 0, 0, 1, 1, 1];
    const y = [-1, 0, 1, -1, 1, 1, 0, -1];

    for (let i = 0; i < 8; i++) {
      const { row, col } = closestNode;
      const nRow = row + x[i];
      const nCol = col + y[i];
      if (
        !(nRow >= 0 && nCol >= 0 && nRow < grid.length && nCol < grid[0].length)
      ) {
        continue;
      }
      const neighbour = grid[nRow][nCol];
      if (neighbour.isVisited === true) {
        continue;
      } else {
        if (closestNode.distance + 1 < neighbour.distance) {
          let edge_wt = 1;
          if (neighbour.isWeight) {
            edge_wt += 1;
          }
          neighbour.distance = closestNode.distance + edge_wt;
          neighbour.previousNode = closestNode;
        }
      }
    }
  }
}

function getAllNodes(grid = []) {
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}

function getClosestNeighbour(grid) {
  let minDistance = Infinity;
  let closest = null;
  for (const node of grid) {
    if (node.isVisited) {
      continue;
    }
    if (node.distance < minDistance) {
      closest = node;
      minDistance = node.distance;
    } else {
      continue;
    }
  }
  return closest;
}

function calculatePath(finishNode) {
  const shortestPathNodes = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    shortestPathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodes;
}