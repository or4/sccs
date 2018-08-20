
import { sccs } from './sccs/sccsIterative';
import { select } from './sccs/pg-utils'
// import { data } from './sccs/data/dataTest9';
// import { data } from './sccs/data/data';

console.log('testTTT');
export function info() {
  return `Hello`
}

// sccs(data);


// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
// const connectionString = `Provider=PostgreSQL OLE DB Provider;Data Source=postgres://localhost:5432;location=edu;User ID=postgres;password=1;timeout=1000;`




const f = async () => {
  const res = await select('stack')
  console.log('res', res);
}

f();

