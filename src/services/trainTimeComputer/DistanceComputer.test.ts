import '@testing-library/react'
import {DistanceComputer} from "./DistanceComputer";

const testData = {
    locations:[
        {
            lat1: 53.425,
            lon1: 14.555,
            lat2: 51.406,
            lon2: 19.693
        },
        {
            lat1: 51.431,
            lon1: 15.231,
            lat2: 52.341,
            lon2: 17.431
        },
        {
            lat1: 55.125,
            lon1: 13.231,
            lat2: 49.331,
            lon2: 18.421
        }
    ],
    distances: [
        414, 182, 734
    ]
}

it("computes correct distance between points", async () => {
    for(let i = 0; i < testData.locations.length; i++){
        const computedDistance = Math.round(DistanceComputer.computeDistance({
            lat: testData.locations[i].lat1,
            lon: testData.locations[i].lon1
        },
        {
            lat: testData.locations[i].lat2,
            lon: testData.locations[i].lon2
        })/1000)
        expect(computedDistance).toEqual(testData.distances[i])
    }
})