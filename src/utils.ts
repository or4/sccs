import * as R from 'ramda';
import * as fs from 'fs';


const path = '.log';

// const logger = fs.createWriteStream('log.txt', {
//   flags: 'a' // 'a' means appending (old data will be preserved)
// });

export function resetLog() {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

export function log(...args: (string | number)[]) {
  const text = R.join(' ', args);

  fs.appendFileSync(path, text + '\n');
  //   logger.write();
  // console.log(text);
  // fs.appendFile('server.log', text);
}


export function objToString(value: any): any {
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'undefined') {
    return value;
  }
  console.log('XXX', value);

  if (Array.isArray(value)) {
    return R.pipe<any[], any[], string, string, string>(
      R.map((item) => objToString(item)) as any,
      R.join(', '),
      R.concat('['),
      R.partialRight(R.concat as any, [']'])
    )(value);
  }

  // return String(value);

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
    R.concat(Array.isArray(value) ? '[ ' : '\n{ '),
    R.partialRight(R.concat, [Array.isArray(value) ? ' \n`]' : ' }'])
  )(value) as any;
}

export const isNotNil = R.complement(R.isNil);
