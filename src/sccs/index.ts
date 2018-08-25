import * as R from 'ramda';
import { GraphItem, convertToArray } from './utils';
import { backward } from './backward';
import { forward } from './forward';

export const sccs = (raw: string): string => {
  const vertices = backward(raw);
  console.log('backward output:', vertices);

  // return '';
  const sccLengths: number[] = forward(raw, vertices);
  return sccLengths.join(', ');
};