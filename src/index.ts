import { sccs } from './sccs';
import { data } from './sccs/data/dataTest25';

export function start() {
  try {
    console.log(sccs(data));
  } catch (error) {
    console.log('error', error);
  }
}
