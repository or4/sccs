import * as R from 'ramda';
import { SccType } from './types';
import { GraphItem, convertToArray } from './utils';

const deepFirstSearch = (graph: GraphItem[], vertexNumber: number): SccType => {
  const vertex = graph[vertexNumber];

  if (R.isNil(vertex) || vertex.visited) {
    return { length: 0, path: [] };
  }
  vertex.visited = true;

  const results = vertex.vertices.map((vertexNumber: number) => {
    const scc = deepFirstSearch(graph, vertexNumber);
    return { length: scc.length + 1, path: [vertexNumber, ...scc.path] };
  });

  return R.reduce((acc: SccType, current: SccType) => {
    if (R.isNil(current) || acc.length >= current.length) {
      return acc;
    }
    return current;
  }, { length: 0, path: [] }
  )(results);
};



export const forward = (raw: string, backwardVertices: number[]): number[] => {
  const graph = convertToArray(raw);
  const output = [] as SccType[];

  let backwardVerticesIndex = backwardVertices.length - 1;
  while (backwardVerticesIndex >= 0) {
    const vertexNumber = backwardVertices[backwardVerticesIndex];

    if (!R.isNil(graph[vertexNumber]) && !graph[vertexNumber].visited) {
      const graphItem = graph[vertexNumber];
      const resultDfs = deepFirstSearch(graph, graphItem.currentVertice);
      output.push(resultDfs);
    }
    if (R.isNil(graph[vertexNumber])) {
      output.push({ length: 1, path: [vertexNumber] });
    }
    backwardVerticesIndex--;
  }

  return R.pipe<SccType[], number[], number[]>(
    R.map(item => item.length),
    R.sort((a, b) => b - a)
  )(output);
};