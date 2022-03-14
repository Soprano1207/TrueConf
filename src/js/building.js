export default class Building {
    constructor(element, options = {}) {
        this.element = element 

        this.settingsStorey = {
            countStorey: options.countStorey || 5 //количество этажей - по-умолчанию 5
        }

        this.elevator; 
        this.heightElevator;

        this.currentHeightElevator = 0,
        this.needHeight = 0;

        this.buttons = [];
        this.saveButtons = [1];

        this.animation; 
        this.timer; //(для очистки таймера)
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
            this.elevatorMove("Up");
            document.querySelectorAll(".storey__arrow")[0].style.transform = "rotate(270deg)";
        } else {
            this.elevatorMove("Bottom");
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

    elevatorMove(direction) {
        switch (direction) {
            case "Up":

                this.animation = setInterval(()=> {
                    if (this.currentHeightElevator === this.needHeight) {
                        //elevatorStop();
                    } else {
                        this.currentHeightElevator++;
                        this.elevator.style.top = "-" + this.currentHeightElevator + "px";
                    }
                }, 1);

            break;

            case "Bottom":
                this.animation = setInterval(()=> {

                    if (this.currentHeightElevator === this.needHeight) {
                        //elevatorStop();
                    } else {
                        this.currentHeightElevator--;
                        this.elevator.style.top = "-" + this.currentHeightElevator + "px";
                    }
                }, 1);

            break;

            default:
                break;
        }
    }

    elevatorStop() {
        document.getElementById(String(this.saveButtons[0])).style.backgroundColor = "orange";
        clearInterval(this.animation);

        this.elevator.classList.add("storey__elevator_active");
        
        this.timer = setTimeout(() => {
            this.move = false;
            this.timer = undefined;
            this.elevator.classList.remove("storey__elevator_active");

            if (this.saveButtons.length > 1) {
                this.defineHeight();
            }
        }, 3000);
    }




}

