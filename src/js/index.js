import Building from "./building.js";

let building = new Building(document.getElementById("body"), {
    countStorey: 5,
}); 
building.generateHtml();