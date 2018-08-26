import * as R from 'ramda';
import { convertToArray, GraphItem } from './utils';

const outputArray: number[] = [];

const deepFirstSearch = (graph: GraphItem[], vertexNumber: number): void => {
  const vertex = graph[vertexNumber];

  if (R.isNil(vertex) || vertex.visited) {
    return;
  }
  vertex.visited = true;

  vertex.vertices.forEach((item: number) => {
    if (R.isNil(graph[item]) || graph[item].visited) {
      return;
    }

    deepFirstSearch(graph, item);
    outputArray.push(item);
  });
};

export const backward = (raw: string): number[] => {
  outputArray.length = 0;
  const graph = convertToArray(raw, 'reverse');

  // not visited vertex number
  let vertexNumber = 0;
  while (vertexNumber < graph.length) {
    if (!R.isNil(graph[vertexNumber]) && !graph[vertexNumber].visited) {
      deepFirstSearch(graph, vertexNumber);
      outputArray.push(vertexNumber);
    }

    vertexNumber++;
  }

  // console.log('outputArray', outputArray);
  return outputArray;
};
