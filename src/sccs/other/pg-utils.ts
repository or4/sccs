import * as R from 'ramda';
const pg = require('pg');

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'edu',
  password: '1',
  port: 5432,
});
client.connect();


const query = async (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      client.query(text, (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
      });
    } catch (err) {
      // reject(err);
    }
  });
};



export type Tables = 'stack';

export const clearTable = async (table: Tables) => {
  return query(`delete from sccs.${table} where 1=1`);
};
export const addRow = async (table: Tables, values: object) => {
  const preparedKeys = R.pipe(R.keys, R.join(','))(values);
  const preparedValues = R.pipe(R.values, R.join(','))(values);
  const sql = `insert into sccs.${table} (${preparedKeys}) values (${preparedValues})`;
  return query(sql);
};
export const select = async (table: Tables) => {
  const sql = `select * from sccs.${table}`;
  const rows = await query(sql);
  return rows && (rows as any).rows || [];
};


// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
// const connectionString = `Provider=PostgreSQL OLE DB Provider;Data Source=postgres://localhost:5432;location=edu;User ID=postgres;password=1;timeout=1000;`


// const f = async () => {
//   const res = await select('stack')
//   // console.log('res', res);
// }

// f();

