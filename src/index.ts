import { sccs } from './sccs';
import { data } from './sccs/data/dataTest1';
import { resetLog, log } from './utils';

export function start() {
  try {
    resetLog();
    log('result', sccs(data));
  } catch (error) {
    // console.log('error', error);
  }
}
