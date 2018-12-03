import * as R from 'ramda';
import { SccType } from './types';
import { GraphItem, convertToArray } from './utils';
import { objToString, log } from '../utils';

export const deepFirstSearch = (graph: GraphItem[], vertex: GraphItem, vertexNumber: number): SccType => {
  if (R.isNil(vertex) || vertex.visited) {
    log('exit because vertex is visited or is nil', objToString(vertex));
    return { length: 0, path: [] };
  }

  log('process vertex', objToString(vertex));
  const locVertexNumber = vertexNumber;

  vertex.visited = true;
  log('vertex', vertexNumber, 'visited=true');


  const results = vertex.vertices.map((vertexNumber: number) => {
    const result = deepFirstSearch(graph, graph[vertexNumber], vertexNumber);
    return { length: result.length + 1, path: [locVertexNumber, ...result.path] };
  });

  vertex.visited = false;
  log('vertex', vertexNumber, 'visited=false');

  return R.pipe<SccType[], SccType[], SccType>(
    R.sortWith([R.descend(R.prop('length'))]),
    R.head
  )(results);
};


export const testDfs = (raw: string): number[] => {

  const graph = convertToArray(raw);
  log(objToString(graph));
  const output: SccType[] = [];
  let usedPath: number[] = [];
  let vertexNumber = 1;

  // console.log('graph', objToString(graph));

  // if (true) { return [1, 2, 3] }

  // while (vertexNumber < graph.length) {
  log('vertexNumber', vertexNumber);

  // if (R.isNil(graph[vertexNumber])) { output.push({ length: 1, path: [vertexNumber] }) }
  // if (R.isNil(graph[vertexNumber]) || R.contains(vertexNumber, usedPath)) {
  //   // log('continue by visited, vertexNumber', vertexNumber);
  //   // continue;
  // }


  log('deepFirstSearch by vertex', vertexNumber);
  const results = deepFirstSearch(graph, graph[vertexNumber], vertexNumber);

  usedPath = R.concat(usedPath, results.path);
  log('deepFirstSearch results', objToString(results));
  output.push(results);
  log('deepFirstSearch done by vertex', vertexNumber, 'output', objToString(results));

  vertexNumber++;

  log('.');
  log('.');
  log('.');
  log('.');
  // }

  return R.pipe<SccType[], number[], number[]>(
    R.map(item => item.length),
    R.sort((a, b) => b - a),
    // R.uniq
  )(output);
};