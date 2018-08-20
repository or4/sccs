"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sccsIterative_1 = require("./sccs/sccsIterative");
// import { data } from './sccs/data/dataTest40';
const data_1 = require("./sccs/data/data");
console.log('testTTT');
function info() {
    return `Hello`;
}
exports.info = info;
sccsIterative_1.sccs(data_1.data);
