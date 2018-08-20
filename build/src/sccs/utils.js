"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
class GraphItem {
    constructor(currentVertice) {
        this.currentVertice = currentVertice;
        this.vertices = [];
    }
    push(vertice) {
        if (vertice === this.currentVertice || this.vertices.indexOf(vertice) !== -1) {
            return;
        }
        this.vertices.push(vertice);
    }
}
exports.GraphItem = GraphItem;
exports.convertToArray = (data, order = 'right') => {
    const splitted = R.pipe(R.split('\n'), R.map(R.pipe(R.split(' '), R.map(Number), R.when(() => order !== 'right', R.pipe(
    // R.tap(console.log),
    R.reverse)))))(data);
    const output = [];
    splitted.forEach((item) => {
        const currentVertice = item[0];
        const toVertice = item[1];
        if (R.isNil(output[currentVertice])) {
            output[currentVertice] = new GraphItem(currentVertice);
        }
        output[currentVertice].push(toVertice);
    });
    return output;
};
exports.checkConsistency = (graph) => {
    let i = 2;
    for (; i < graph.length; i++) {
        try {
            if ((graph[i].currentVertice - graph[i - 1].currentVertice) !== 1) {
                console.log('checkConsistency', i);
                break;
            }
        }
        catch (error) {
            console.log('checkConsistency, i', i, error);
            throw new Error(error);
        }
    }
    console.log('checkConsistency done', i);
};
