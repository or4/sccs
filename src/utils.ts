import * as R from 'ramda';
const fs = require('fs');


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