/**
 * Some ramda helpers, usually for debub
 */

import * as R from 'ramda';

export function objToString(value: any): any {
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'undefined') {
    return value;
  }

  if (Array.isArray(value)) {
    return R.pipe<any[], any[], string, string, string>(
      R.map((item) => objToString(item)) as any,
      R.join(', '),
      R.concat('['),
      R.partialRight(R.concat as any, [']'])
    )(value);
  }

  return R.pipe(
    R.toPairs,
    R.map(
      R.ifElse(
        item => typeof item[1] === 'object',
        (item: any[]) => `${item[0]}: ${objToString(item[1])}`,
        R.join(': ')
      )
    ),
    R.join(', '),
    R.concat(Array.isArray(value) ? '[ ' : '{ '),
    R.partialRight(R.concat, [Array.isArray(value) ? ' ]' : ' }'])
  )(value) as any;
}

export const isNotNil = R.complement(R.isNil);
