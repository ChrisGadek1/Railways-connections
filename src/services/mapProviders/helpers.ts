import $ from "jquery";
import MainPageMapProvider from "./mainPageMapProvider";

let currentClicked: HTMLSpanElement|undefined = undefined
let legendShowed = false

export const addFunctionsToLegend = () =>{
    $('.legend-fragment').toArray().forEach(spanElement => {
        spanElement.addEventListener("click", () => handleClickOnSpan(spanElement))
    })
}

export const makeLegendDropDown = () => {
    (document.getElementById("upper-label") as HTMLElement).addEventListener("click", handleClickOnUpperLabel);
}

const handleClickOnUpperLabel = () => {
    if(!legendShowed){
        (document.getElementById("labels-container") as HTMLDivElement).classList.add("show-legend");
        (document.getElementById("labels-container") as HTMLDivElement).classList.remove("hide-legend");
        legendShowed = true
        rotateIcon()
    }
    else{
        (document.getElementById("labels-container") as HTMLDivElement).classList.remove("show-legend");
        (document.getElementById("labels-container") as HTMLDivElement).classList.add("hide-legend");
        legendShowed = false
        rotateIcon()
    }
}

const rotateIcon = () => {
    if(legendShowed){
        $(".legend i").addClass('unrotate-icon')
        $(".legend i").removeClass('rotate-icon')
    }
    else{
        $(".legend i").removeClass('unrotate-icon')
        $(".legend i").addClass('rotate-icon')
    }

}

const handleClickOnSpan = (spanElement: HTMLSpanElement) => {
    if(currentClicked === undefined){
        clickedLine(spanElement)
    }
    else if(currentClicked !== undefined && currentClicked !== spanElement){
        unClickedLine(currentClicked);
        clickedLine(spanElement)
    }
    else if(currentClicked === spanElement){
        unClickedLine(spanElement)
    }
}

const clickedLine = (spanElement: HTMLSpanElement) => {
    spanElement.classList.remove('not-hover-line')
    spanElement.classList.add('hover-line')
    hideAllLines()
    const lineName = spanElement.children[1].innerHTML.split(':')[0]
    showLine(lineName)
    currentClicked = spanElement
}

const unClickedLine = (spanElement: HTMLSpanElement) => {
    spanElement.classList.add('not-hover-line')
    spanElement.classList.remove('hover-line')
    showAllLines()
    currentClicked = undefined
}

const hideAllLines = () => {
    MainPageMapProvider.polyLines.forEach(polyLineObj => {
        polyLineObj.polyLine.remove()
    })
}

const showAllLines = () => {
    MainPageMapProvider.polyLines.forEach(polyLineObj => {
        polyLineObj.polyLine.addTo(MainPageMapProvider.getInstance().map)
    })
}

const hideLine = (lineName: string) => {
    const polyLine = MainPageMapProvider.polyLines.find(polyLineObj => {
        return polyLineObj.lineName === lineName
    })
    if(polyLine === undefined){
        throw 'didnt found polyline for a line: '+lineName
    }
    polyLine.polyLine.remove()
}

const showLine = (lineName: string) => {
    const polyLine = MainPageMapProvider.polyLines.find(polyLineObj => {
        return polyLineObj.lineName === lineName
    })
    if(polyLine === undefined){
        throw 'didnt found polyline for a line: '+lineName
    }
    polyLine.polyLine.addTo(MainPageMapProvider.getInstance().map);
}