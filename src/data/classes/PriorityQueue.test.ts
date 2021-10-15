import '@testing-library/react'
import {PriorityQueue} from "./PriorityQueue";
import WeekDate from "./WeekDate";

it("creates valid heap for numbers", async() => {
    const queue = new PriorityQueue<number>(function (a,b) {return a > b});
    const testData = [5,2,7,5,9,2,3,5,1,4,2,10,3,8,4,6]
    testData.forEach(n => {
        queue.push(n)
    })

    const expectedData = [10,9,8,7,6,5,5,5,4,4,3,3,2,2,2,1]
    const popData = []
    expect(queue.isHeap(0)).toEqual(true)

    while(queue.size() > 0){
        expect(queue.isHeap(0)).toEqual(true)
        const value = queue.pop()
        popData.push(value)
    }
    expect(popData).toEqual(expectedData)
})

it("creates valid heap for weekData objects", async () => {
    const queue = new PriorityQueue<WeekDate>(function (a,b) {return a.convertToSeconds() > b.convertToSeconds()});

    const testData = [
        new WeekDate(5,12,43,50),
        new WeekDate(3,1,6,2),
        new WeekDate(4,12,11,50),
        new WeekDate(4,1,11,50)
    ]

    testData.forEach(weekDate => {
        queue.push(weekDate)
    })
    const expectedData = [477830, 389510,564334, 349910,263162]
    const popData = []
    let flag = false
    while(queue.size() > 0){
        popData.push(queue.pop().convertToSeconds())
        if(queue.size() === 2 && !flag){
            queue.push(new WeekDate(6,12,45,34))
            flag = true
        }
    }
    expect(popData).toEqual(expectedData)
})