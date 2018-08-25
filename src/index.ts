import { sccs } from './sccs/sccsRecursive';
import { data } from './sccs/data/dataTest1';

export function start() {
  console.log(sccs(data));
}
