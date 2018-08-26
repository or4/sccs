import * as R from 'ramda';
import { GraphItem, convertToArray } from './utils';
import { backward } from './backward';
import { forward } from './forward';
import { testDfs } from './dfs';

export const sccs = (raw: string): string => {
  return testDfs(raw).join(', ');
  // const vertices = backward(raw);
  // console.log('backward output:', vertices);

  // const sccLengths: number[] = forward(raw, vertices);
  // console.log('sccLengths:', sccLengths);
  // return sccLengths.join(', ');
};