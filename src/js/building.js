export default class Building {
    constructor(element, options = {}) {
        this.element = element 

        this.settingsStorey = {
            countStorey: options.countStorey || 5 //количество этажей - по-умолчанию 5
        }

        this.elevator; 
        this.heightElevator;

        this.buttons = [];

        this.timer;
        this.move = false; //отслеживаем, находится ли в движении лифт
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

    clickButton() {
        [].forEach.call(this.buttons, (elements) => {
            elements.onclick = (element) => {
                const idBtn = Number(element.target.id);
                if (this.saveButtons.includes()) {
                    return false;
                } else {
                    element.target.style.backgroundColor = "#4cd964";
                    this.saveButtons.push(idBtn);

                    if (!this.move) {
                        this.defineHeight();
                    }
                }
            }
        });
    }

    defineHeight() {
        this.timer = undefined;
        this.move = true;

        this.needHeight = (this.heightElevator * this.saveButtons[1] - this.heightElevator);
        if (this.saveButtons[0] < this.saveButtons[1]) {
            //elevatorMove("Up");
            document.querySelectorAll(".storey__arrow")[0].style.transform = "rotate(270deg)";
        } else {
            //elevatorMove("Bottom");
            document.querySelectorAll(".storey__arrow")[0].style.transform = "rotate(90deg)";
        }

        document.querySelectorAll(".storey__num")[0].innerText = this.saveButtons[1];
        
        const index = this.saveButtons.indexOf(this.saveButtons[0]);
        if (index !== -1) {
            this.saveButtons.splice(index, 1);
        }
        console.log("необходимая высота  -", this.needHeight, "px");
        console.log("Осталось посетить: " + this.saveButtons);
        console.log("----------------");
    }


}

