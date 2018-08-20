"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const utils_1 = require("./utils");
const dfsReverse = (graph, start) => {
    // console.log('graph', objToString(graph));
    const backVerticesArray = [];
    const stack = [{ vertice: start, len: graph[start] && graph[start].vertices.length || 0, index: 0 }];
    let stackItem = stack[0];
    let item = start;
    while (true) {
        const graphItem = graph[item];
        // console.log('graphItem', objToString(graphItem));
        if (R.isNil(graphItem) || !(stackItem && graphItem.currentVertice === stackItem.vertice) && graphItem.visited) {
            while (true) {
                stackItem = stack.pop();
                if (R.isNil(stackItem)) {
                    return backVerticesArray;
                }
                backVerticesArray.push(stackItem.vertice);
                if (stackItem.index < stackItem.len - 1) {
                    stackItem.index++;
                    item = stackItem.vertice;
                    break;
                }
            }
            continue;
        }
        graphItem.visited = true;
        const nextVertice = graphItem.vertices[stackItem.index];
        stack.push({ vertice: nextVertice, len: graph[nextVertice] && graph[nextVertice].vertices.length || 0, index: 0 });
        item = nextVertice;
    }
};
const sccsBackward = (raw) => {
    console.log('sccsBackward start');
    const graph = utils_1.convertToArray(raw, 'reverse');
    console.log('sccsBackward converted');
    let vertices = [];
    // console.log('sccsBackward, graph', objToString(graph));
    let index = 0;
    while (graph[index] || index < graph.length) {
        if (!R.isNil(graph[index]) && !graph[index].visited) {
            // console.log('!!! index', index, 'visited', graph[index].visited);
            let backVerticesArray = dfsReverse(graph, index);
            // console.log('backVerticesArray', backVerticesArray);
            // backVerticesArray = R.drop(Math.floor(backVerticesArray.length / 2), backVerticesArray);
            // console.log('backVerticesArray', backVerticesArray);
            vertices = R.concat(vertices, backVerticesArray);
        }
        else if (R.isNil(graph[index])) {
            // vertices = R.append(index, vertices);
        }
        index++;
    }
    // console.log('vertices', vertices);
    return vertices;
};
const dfsRight = (graph, start) => {
    // console.log('start', start);
    const stack = [{ vertice: start, len: graph[start] && graph[start].vertices.length || 0, index: 0 }];
    let stackItem = stack[0];
    let item = start;
    const verticesAll = [];
    while (true) {
        const graphItem = graph[item];
        // console.log('verticesAll.push', item);
        if (!R.isNil(graphItem) && !graphItem.visited) {
            verticesAll.push(item);
        }
        // console.log('graphItem', objToString(graphItem));
        if (R.isNil(graphItem) || !(stackItem && graphItem.currentVertice === stackItem.vertice) && graphItem.visited) {
            while (true) {
                stackItem = stack.pop();
                if (R.isNil(stackItem)) {
                    // console.log('verticesAll', verticesAll);
                    return verticesAll.length;
                }
                if (stackItem.index < stackItem.len - 1) {
                    stackItem.index++;
                    item = stackItem.vertice;
                    break;
                }
            }
            continue;
        }
        graphItem.visited = true;
        const nextVertice = graphItem.vertices[stackItem.index];
        stack.push({ vertice: nextVertice, len: graph[nextVertice] && graph[nextVertice].vertices.length || 0, index: 0 });
        item = nextVertice;
    }
};
const sccsToward = (raw, vertices) => {
    const output = [];
    const graph = utils_1.convertToArray(raw);
    // console.log('sccsToward, graph', objToString(graph));
    let index = vertices.length - 1;
    while (index >= 0) {
        const graphIndex = vertices[index];
        // console.log('graphIndex', graphIndex);
        // console.log('graph[graphIndex]', graph[graphIndex]);
        if (!R.isNil(graph[graphIndex]) && !graph[graphIndex].visited) {
            const cycleLength = dfsRight(graph, graphIndex);
            // console.log('output push cycleLength', cycleLength);
            output.push(cycleLength);
        }
        else if (R.isNil(graph[graphIndex])) {
            // console.log('output push 1');
            output.push(1);
        }
        index--;
    }
    // return R.pipe(R.take(5), R.join(', '))(output);
    return R.pipe(R.sort((a, b) => b - a), R.take(5), R.join(', '))(output);
};
exports.sccs = (raw) => {
    const vertices = sccsBackward(raw);
    console.log(vertices);
    // const output = sccsToward(raw, vertices);
    // console.log('sccs, output', output);
    // return output;
    return vertices.join(', ');
};
