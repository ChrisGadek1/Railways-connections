import Line from "./Line";
import WeekDate from "./WeekDate";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import Station from "./Station";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import TrainTimeComputer from "../../services/trainTimeComputer/TrainTimeComputer";
import {PriorityQueue} from "./PriorityQueue";

export default class Graph{
    private readonly _lines: Line[];
    private readonly _time: WeekDate;
    private beginStation: Station|undefined = undefined;
    private destinationStation: Station|undefined = undefined;
    private _nodes: GraphNode[] = [];
    private speed: number;

    get lines(): Line[] {
        return this._lines;
    }

    get time(): WeekDate {
        return this._time;
    }

    get nodes(): GraphNode[] {
        return this._nodes;
    }

    constructor(lines: Line[], time: WeekDate, speed: number) {
        this._lines = lines;
        this._time = time;
        this.speed = speed;
        this.createNodes()
    }

    private createNodes() {
        const nodes: GraphNode[] = this.lines.map(line => {
            return line.stations.map(station => {
                return [new GraphNode(station, line, false, false), new GraphNode(station, line, false, true)];
            }).flat(1)
        }).flat(1).sort((a, b) => a.station.id - b.station.id)
        //add connection between same stations, but different direction/line
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
        //add connections between stations on the same line
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
        this._nodes = nodes;
    }

    setDestinationAndBeginning(begin: Station, end: Station){
        this.beginStation = begin;
        this.destinationStation = end;
    }

    private loadBeginNeighbours(graphNode: GraphNode){
        const filteredNodes = this._nodes.filter(node => node.station.name === graphNode.station.name);
        graphNode.neighbours = filteredNodes.map(node => new GraphEdge(node, graphNode));
    }

    computeBestTime(){
        if(this.destinationStation !== undefined && this.beginStation !== undefined) {
            const weekDateConverter = new WeekDateConverter();
            this._nodes.forEach(node => {
                node.previous_node = undefined;
                node.weekDate = undefined;
                node.visited = false;
            })
            const firstNode = new GraphNode(this.beginStation, undefined,false, false);
            firstNode.weekDate = this._time
            this.loadBeginNeighbours(firstNode);
            const queue = new PriorityQueue<GraphNode>((a,b)=>a.getTime() < b.getTime())
            queue.push(firstNode);
            this._nodes.forEach(node => {
                queue.push(node);
            })
            while (queue.size() > 0){
                const node = queue.pop();
                node.neighbours.forEach(neighbour => {
                    const {destination} = neighbour
                    if(!destination.visited){
                        const currentCost = destination.getTime();
                        const predictedCost = TrainTimeComputer.getTimeOfTheNextTrain(weekDateConverter.convert(node.getTime()), destination.station,destination.line,destination.reversed,this.speed);
                        if(currentCost > predictedCost){
                            destination.weekDate = weekDateConverter.convert(predictedCost);
                            destination.previous_node = node;
                            queue.repairHeap(queue.indexOf(destination));
                        }
                    }
                })
                node.visited = true
            }
        }
    }

    getFastestPath(): GraphNode[]{
        const dest = this._nodes.filter(node => node.station.name === this.destinationStation?.name && node.weekDate !== undefined)
        dest.sort((a,b) => a.getTime() - b.getTime())
        let currentStation = dest[0];
        const result: GraphNode[] = []
        result.push(currentStation)
        while(currentStation.station !== this.beginStation){
            if(currentStation.previous_node !== undefined){
                currentStation = currentStation.previous_node
            }
            result.push(currentStation)
        }
        return result;
    }
}