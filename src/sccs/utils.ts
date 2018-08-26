import * as R from 'ramda';

// need hard to refactor

export class GraphItem {
  visited: boolean;
  vertex: number;
  vertices: number[]; // to vertices

  constructor(vertex: number) {
    this.vertex = vertex;
    this.vertices = [];
  }

  public push(vertice: number) {
    if (vertice === this.vertex || this.vertices.indexOf(vertice) !== -1) {
      return;
    }
    this.vertices.push(vertice);
  }
}

type GraphOrder = 'right' | 'reverse';

export const convertToArray = (data: string, order: GraphOrder = 'right') => {
  const splitted = R.pipe<string, string[], number[][]>(
    R.split('\n'),
    R.map(
      R.pipe(
        R.split(' '),
        R.map(Number),
        R.when(
          () => order !== 'right',
          R.pipe<number[], number[]>(
            R.reverse,
          )
        )
      )
    )
  )(data);

  const output = [] as GraphItem[];
  splitted.forEach((item: number[]): void => {
    const vertex = item[0];
    const toVertice = item[1];

    if (R.isNil(output[vertex])) {
      output[vertex] = new GraphItem(vertex);
    }

    output[vertex].push(toVertice);
  });

  return output;
};


export const checkConsistency = (graph: GraphItem[]) => {
  let i = 2;
  for (; i < graph.length; i++) {
    try {
      if ((graph[i].vertex - graph[i - 1].vertex) !== 1) {
        console.log('checkConsistency', i);
        break;
      }
    } catch (error) {
      console.log('checkConsistency, i', i, error);
      throw new Error(error);
    }
  }
  console.log('checkConsistency done', i);
};