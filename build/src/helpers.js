"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
// this code is very not efficiency, only debug
// cause objToString is recursive function
// and after each call function pipe is created
// doesnt work with cyclic links aka child -> parent -> child
// export function objToString(obj: object): string {
//   return R.pipe(
//     R.toPairs,
//     R.map(
//       R.ifElse(
//         item => typeof item[1] === 'object',
//         (item: any[]) => `${item[0]}:  ${objToString(item[1])}`,
//         // (item: any[]) => `${item[0]}:  ${item[1]}`,
//         R.join(': ')
//       )
//     ),
//     R.join(', '),
//     R.concat('{ '),
//     R.partialRight(R.concat, [' }'])
//   )(obj) as any;
// }
function objToString(value) {
    if (typeof value === 'number' || typeof value === 'string' || typeof value === 'undefined') {
        return value;
    }
    if (Array.isArray(value)) {
        return R.pipe(R.map((item) => objToString(item)), R.join(', '), R.concat('['), R.partialRight(R.concat, [']']))(value);
        // return '[' + value.map(
        //   item => objToString(item)
        // ).join(', ') + ']';
    }
    return R.pipe(R.toPairs, R.map(R.ifElse(item => typeof item[1] === 'object', (item) => `${item[0]}: ${objToString(item[1])}`, R.join(': '))), R.join(', '), R.concat(Array.isArray(value) ? '[ ' : '{ '), R.partialRight(R.concat, [Array.isArray(value) ? ' ]' : ' }']))(value);
}
exports.objToString = objToString;
exports.isNotNil = R.complement(R.isNil);
