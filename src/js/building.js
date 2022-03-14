export default class Building {
    constructor(element, options = {}) {
        this.element = element 

        this.settingsStorey = {
            countStorey: options.countStorey || 5 //количество этажей - по-умолчанию 5
        }

        this.elevator; 
        this.heightElevator;

        this.buttons = [];
    }

    generateHtml() {
       for (let i = this.settingsStorey.countStorey; i > 0; i--) {
           let section = document.createElement("section");
           let storey = this.element.appendChild(section);
           let html = "<div class='storey__shaft'></div>";
       
           if (i === 1) {
               html = "<div class='storey__shaft storey__first'><div class='storey__elevator'><div class='storey__arrow-block'><img class='storey__arrow' src='icon/arrow.svg' alt='arrow'><div class='storey__num'></div></div></div></div>";
           }
           storey.className = "storey";
           storey.innerHTML = 
           "<div class='container'>"+html+"<div class='storey__button' id="+i+">"+i+"</div></div>";

       }
       this.elevator = document.querySelectorAll(".storey__elevator")[0];
       this.buttons = document.querySelectorAll(".storey__button");
       this.heightElevator = this.elevator.clientHeight;
    }
}

