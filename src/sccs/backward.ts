import * as R from 'ramda';
import { convertToArray, GraphItem } from './utils';
import { SccType } from './types';
import { objToString } from '../utils';

const outputArray: number[] = [];

const deepFirstSearch = (graph: GraphItem[], vertexNumber: number): SccType => {
  const vertex = graph[vertexNumber];

  if (R.isNil(vertex) || vertex.visited) { return { length: 0, path: [] } }

  const results = vertex.vertices.map((item: number) => {

    vertex.visited = true;

    const result = deepFirstSearch(graph, item);
    vertex.visited = false;

    // if (!R.contains(item, outputArray)) {
    outputArray.push(item);
    // }

    if (result.path.length === 0) {
      return { length: result.length + 1, path: [vertexNumber, item] };
    }

    return { length: result.length + 1, path: [vertexNumber, ...result.path] };

  });


  return R.pipe<SccType[], SccType[], SccType>(
    R.sortWith([R.descend(R.prop('length'))]),
    R.head
  )(results);
};

export const backward = (raw: string): number[] => {
  outputArray.length = 0;
  let usedPath: number[] = [];
  const graph = convertToArray(raw, 'reverse');

  // not visited vertex number
  let vertexNumber = 0;
  while (vertexNumber < graph.length) {
    if (!R.isNil(graph[vertexNumber]) && !R.contains(vertexNumber, usedPath)) {
      const res = deepFirstSearch(graph, vertexNumber);
      // console.log('start dfs, vertexNumber', vertexNumber, ' res', res, 'outputArray', objToString(outputArray));

      usedPath = R.concat(usedPath, res.path);
      // if (!R.contains(vertexNumber, outputArray)) {
      // outputArray.push(vertexNumber);
      // }
    }

    vertexNumber++;
  }

  // console.log('outputArray', outputArray);
  return outputArray;
};
