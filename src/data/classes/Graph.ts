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
        for (let i = 0; i <= nodes.length; i++) {
            if (i > 0 && (i === nodes.length || (nodes[i].station.id !== nodes[i - 1].station.id))) {
                sameStationNodes.forEach((nodeFirstIter, firstIndex) => {
                    sameStationNodes.forEach((nodeSecondIter, secondIndex) => {
                        if(secondIndex > firstIndex){
                            const edge1: GraphEdge = new GraphEdge(nodeFirstIter, nodeSecondIter);
                            const edge2: GraphEdge = new GraphEdge(nodeSecondIter, nodeFirstIter);
                            nodeSecondIter.addNeighbour(edge1);
                            nodeFirstIter.addNeighbour(edge2);
                        }
                    })
                })
                sameStationNodes = []
            }
            sameStationNodes.push(nodes[i])
        }
        nodes.sort((a, b) => a.station.stationNumber(a.line) - b.station.stationNumber(b.line))
            .sort((a, b) => (a.line.name > b.line.name) ? 1: (b.line.name > a.line.name ? -1: 0))
        for(let index = 0; index < nodes.length; index+=2){
            if(index < nodes.length - 2 && nodes[index].line.name === nodes[index + 2].line.name){
                const edge2: GraphEdge = new GraphEdge(nodes[index + 2], nodes[index]);
                nodes[index].addNeighbour(edge2);
            }
        }
        for(let index = nodes.length - 1; index >= 2;index -= 2){
            if(nodes[index].line.name === nodes[index - 2].line.name){
                const edge2: GraphEdge = new GraphEdge(nodes[index - 2], nodes[index]);
                nodes[index].addNeighbour(edge2);
            }
        }
        console.log(nodes.map(node => node.station.name+" "+node.line.name+" "+node.reversed+" "+node.neighbours.map(nei => nei.destination.station.name+" "+nei.destination.line.name+" "+nei.destination.reversed)))
        this._nodes = nodes;
    }

}