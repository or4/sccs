import * as R from 'ramda';
import { GraphItem, convertToArray } from './utils';

const backVerticesArray: number[] = [];

const deepFirstSearch = (graph: (GraphItem)[], start: number): void => {
  const graphItem = graph[start];
  if (R.isNil(graphItem) || graphItem.visited) {
    return;
  }
  graphItem.visited = true;

  graphItem.vertices.map((item: number) => {
    if (!R.isNil(graph[item]) && !graph[item].visited) {
      deepFirstSearch(graph, item);
      backVerticesArray.push(item);
    }
    if (R.isNil(graph[item])) {
      if (graph[item] !== null) {
        backVerticesArray.push(item);
      } else {
        graph[item] = null as any;
      }
    }
    return 0;
  });
};

export const backward = (raw: string): number[] => {
  const graph = convertToArray(raw, 'reverse');

  let index = 0;
  while (graph[index] || index < graph.length) {
    if (!R.isNil(graph[index]) && !graph[index].visited) {
      deepFirstSearch(graph, index);
      backVerticesArray.push(index);
    }
    index++;
  }

  return backVerticesArray;
};
