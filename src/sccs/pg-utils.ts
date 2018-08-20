import * as R from 'ramda';
const pg = require('pg');

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'edu',
  password: '1',
  port: 5432,
})
client.connect()


const query = async (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      client.query(text, (err, res) => {
        if (err) { reject(err); }
        else { resolve(res); }
      })
    } catch (err) {
      // reject(err);
    }
  })
}



export type Tables = 'stack';

export const clearTable = async (table: Tables) => {
  return await query(`delete from sccs.${table} where 1=1`);
}
export const addRow = async (table: Tables, values: object) => {
  const preparedKeys = R.pipe(R.keys, R.join(','))(values);
  const preparedValues = R.pipe(R.values, R.join(','))(values);
  const sql = `insert into sccs.${table} (${preparedKeys}) values (${preparedValues})`;
  return await query(sql);
}
export const select = async (table: Tables) => {
  const sql = `select * from sccs.${table}`;
  const rows = await query(sql);
  return rows && (rows as any).rows || [];
}

