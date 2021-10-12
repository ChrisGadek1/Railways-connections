import Line from "./Line";
import WeekDate from "./WeekDate";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";

export default class Graph{
    private readonly _lines: Line[];
    private readonly _time: WeekDate;
    private _nodes: GraphNode[] = [];


    get lines(): Line[] {
        return this._lines;
    }

    get time(): WeekDate {
        return this._time;
    }

    get nodes(): GraphNode[] {
        return this._nodes;
    }

    constructor(lines: Line[], time: WeekDate) {
        this._lines = lines;
        this._time = time;
        this.createNodes()
    }

    private createNodes() {
        const nodes: GraphNode[] = this.lines.map(line => {
            return line.stations.map(station => {
                return [new GraphNode(station, line, false, false), new GraphNode(station, line, false, true)];
            }).flat(1)
        }).flat(1).sort((a, b) => a.station.id - b.station.id)
        let sameStationNodes: GraphNode[] = []
        for (let i = 0; i < nodes.length; i++) {
            if (i > 0 && nodes[i].station.id !== nodes[i - 1].station.id) {
                sameStationNodes.forEach(nodeFirstIter => {
                    sameStationNodes.forEach(nodeSecondIter => {
                        const edge1: GraphEdge = new GraphEdge(nodeFirstIter, nodeSecondIter);
                        const edge2: GraphEdge = new GraphEdge(nodeSecondIter, nodeFirstIter);
                        nodeSecondIter.addNeighbour(edge1);
                        nodeFirstIter.addNeighbour(edge2);
                    })
                })
                sameStationNodes = []
            } else {
                sameStationNodes.push(nodes[i])
            }
        }
        nodes.sort((a, b) => a.station.stationNumber(a.line) - b.station.stationNumber(b.line))
            .sort((a, b) => (a.line.name > b.line.name) ? 1: (b.line.name > a.line.name ? -1: 0))
        for(let index = 0; index < nodes.length; index++){
            if(index < nodes.length - 1 && nodes[index].line.name === nodes[index + 1].line.name){
                const edge1: GraphEdge = new GraphEdge(nodes[index], nodes[index + 1]);
                const edge2: GraphEdge = new GraphEdge(nodes[index + 1], nodes[index]);
                nodes[index + 1].addNeighbour(edge1);
                nodes[index].addNeighbour(edge2);
            }
        }
        this._nodes = nodes;
    }

}