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
const pg_utils_1 = require("./sccs/pg-utils");
// import { data } from './sccs/data/dataTest9';
// import { data } from './sccs/data/data';
console.log('testTTT');
function info() {
    return `Hello`;
}
exports.info = info;
// sccs(data);
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
// const connectionString = `Provider=PostgreSQL OLE DB Provider;Data Source=postgres://localhost:5432;location=edu;User ID=postgres;password=1;timeout=1000;`
const f = () => __awaiter(this, void 0, void 0, function* () {
    const res = yield pg_utils_1.select('stack');
    console.log('res', res);
});
f();
