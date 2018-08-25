import * as R from 'ramda';
import { SccType } from './types';
import { GraphItem, convertToArray } from './utils';

const deepFirstSearch = (graph: (GraphItem)[], start: number): SccType => {
  const graphItem = graph[start];
  if (R.isNil(graphItem) || graphItem.visited) {
    return { length: 0, path: [] };
  }

  graphItem.visited = true;

  const results = graphItem.vertices.map((item: number) => {
    const resDfs = deepFirstSearch(graph, item);
    return { length: resDfs.length + 1, path: [item, ...resDfs.path] };
  });

  return R.reduce((acc: SccType, current: SccType) => {
    if (R.isNil(current) || acc.length >= current.length) {
      return acc;
    }
    return current;
  }, { length: 0, path: [] }
  )(results);
};



export const forward = (raw: string, vertices: number[]): number[] => {
  const graph = convertToArray(raw);
  const backVerticesSorted = vertices;
  const output = [] as SccType[];

  let index = backVerticesSorted.length - 1;
  while (index >= 0) {
    const graphIndex = backVerticesSorted[index];

    if (!R.isNil(graph[graphIndex]) && !graph[graphIndex].visited) {
      const graphItem = graph[graphIndex];
      const resultDfs = deepFirstSearch(graph, graphItem.currentVertice);
      output.push(resultDfs);
    }
    if (R.isNil(graph[graphIndex])) {
      output.push({ length: 1, path: [graphIndex] });
    }
    index--;
  }

  return R.pipe<SccType[], number[], number[]>(
    R.map(item => item.length),
    R.sort((a, b) => b - a)
  )(output);
};