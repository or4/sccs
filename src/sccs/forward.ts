import * as R from 'ramda';
import { SccType } from './types';
import { GraphItem, convertToArray } from './utils';
import { objToString } from '../utils';

const deepFirstSearch = (graph: GraphItem[], vertex: GraphItem, vertexNumber: number): SccType => {
  // console.log('start vertex', objToString(vertex));

  if (R.isNil(vertex) || vertex.visited) { return { length: 0, path: [] } }

  // vertex.visited = true;
  // console.log('process vertex', objToString(vertex));

  const results = vertex.vertices.map((vertexNumber: number) => {
    vertex.visited = true;
    const result = deepFirstSearch(graph, graph[vertexNumber], vertexNumber);
    vertex.visited = false;
    return { length: result.length + 1, path: [vertexNumber, ...result.path] };
  });

  return R.pipe<SccType[], SccType[], SccType>(
    R.sortWith([R.descend(R.prop('length'))]),
    R.head
  )(results);
};

const reset = (graph: any) => {
  for (let i = 0; i < graph.length; i++) {
    if (!graph[i]) { continue }
    graph[i].visited = false;
  }
};

export const forward = (raw: string, backwardVertices: number[]): number[] => {
  // console.log('backwardVertices', objToString(backwardVertices));

  const graph = convertToArray(raw);
  const output: SccType[] = [];
  let usedPath: number[] = [];

  let backwardVerticesIndex = backwardVertices.length - 1;
  while (backwardVerticesIndex >= 0) {
    const vertexNumber = backwardVertices[backwardVerticesIndex--];
    // reset(graph);
    // console.log('vertexNumber', vertexNumber);

    // if (R.isNil(graph[vertexNumber])) { output.push({ length: 1, path: [vertexNumber] }) }
    if (R.isNil(graph[vertexNumber]) || R.contains(vertexNumber, usedPath)) {
      // console.log('continue by visited, vertexNumber', vertexNumber);
      continue;
    }
    // console.log('.');
    // console.log('.');


    // console.log('dfs by', vertexNumber);
    const res = deepFirstSearch(graph, graph[vertexNumber], vertexNumber);
    usedPath = R.concat(usedPath, res.path);
    // console.log('dfs res', objToString(res));
    output.push(res);
  // console.log('dfs done by', vertexNumber, 'output', objToString(res));
  }

  return R.pipe<SccType[], number[], number[]>(
    R.map(item => item.length),
    R.sort((a, b) => b - a),
    // R.uniq
  )(output);
};