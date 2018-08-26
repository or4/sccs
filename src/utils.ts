import * as R from 'ramda';
const fs = require('fs');



// const logger = fs.createWriteStream('log.txt', {
//   flags: 'a' // 'a' means appending (old data will be preserved)
// });


export function log(...args: (string | number)[]) {
  const text = R.join(' ', args);
  //   logger.write();
  console.log(text);
  // fs.appendFile('server.log', text);
}