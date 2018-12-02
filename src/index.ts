import { sccs } from './sccs';
import { data } from './sccs/data/dataTest1';
import * as fs from 'fs';
import { resetLog, log } from './utils';

export function start() {
  try {
    resetLog();
    const result = sccs(data);
    console.log('result', result);
    log(result);
    log(12112);

  } catch (error) {
    // console.log('error', error);
  }
}
