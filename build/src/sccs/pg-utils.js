"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const pg = require('pg');
const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'edu',
    password: '1',
    port: 5432,
});
client.connect();
const query = (text) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            client.query(text, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
        catch (err) {
            // reject(err);
        }
    });
});
exports.clearTable = (table) => __awaiter(this, void 0, void 0, function* () {
    return yield query(`delete from sccs.${table} where 1=1`);
});
exports.addRow = (table, values) => __awaiter(this, void 0, void 0, function* () {
    const preparedKeys = R.pipe(R.keys, R.join(','))(values);
    const preparedValues = R.pipe(R.values, R.join(','))(values);
    const sql = `insert into sccs.${table} (${preparedKeys}) values (${preparedValues})`;
    return yield query(sql);
});
exports.select = (table) => __awaiter(this, void 0, void 0, function* () {
    const sql = `select * from sccs.${table}`;
    const rows = yield query(sql);
    return rows && rows.rows || [];
});
