export function DFS(grid = [], startNode, finishNode) {
  const visitedInOrder = [];
  visitedInOrder.push(startNode);

  let flag = 0;
  dfsRecursion(grid, startNode, finishNode, visitedInOrder, flag);
  return [visitedInOrder, calculatePath(finishNode)];
}

function dfsRecursion(grid = [], node, finishNode, visitedInOrder, flag) {
  node.isVisited = true;
  //visitedInOrder.push(node);
  if (node === finishNode) {
    flag = 1;
    return [visitedInOrder, calculatePath(finishNode)];
  }
  const x = [0, 0, 1, -1];
  const y = [1, -1, 0, 0];
  for (let i = 0; i < 4; i++) {
    const { row, col } = node;
    const newRow = row + x[i];
    const newCol = col + y[i];
    if (
      !(
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < grid.length &&
        newCol < grid[0].length
      )
    ) {
      continue;
    }
    const neighbour = grid[newRow][newCol];

    if (neighbour.isWall === true || neighbour.isVisited === true) {
      continue;
    }
    neighbour.previousNode = node;
    visitedInOrder.push(neighbour);
    if (neighbour === finishNode) {
      flag = 1;
      return [visitedInOrder, calculatePath(finishNode)];
    }
    if (flag === 1) {
      return dfsRecursion(grid, neighbour, finishNode, visitedInOrder);
    }
    dfsRecursion(grid, neighbour, finishNode, visitedInOrder);
  }
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
