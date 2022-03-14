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

        this.localButtons = {
            arrayButtons: null
        }
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
        
        //запускаем для проверки наличия данных в локальном хранилище
        this.localData();
    }

    clickButton() {
        [].forEach.call(this.buttons, (elemets) => {
            elemets.onclick = (element) => {
                const idBtn = Number(element.target.id);

                if (this.saveButtons.includes(idBtn)) {
                    return false;
                } else {

                    element.target.style.backgroundColor = "#4cd964";
                    this.saveButtons.push(idBtn);

                    this.localButtons.arrayButtons = this.saveButtons;
                    localStorage.setItem("localButtons", JSON.stringify(this.localButtons.arrayButtons));
                    
                    if (!this.move && this.timer === undefined) {
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
            console.log("поднимаюсь c "+this.saveButtons[0]+" на "+this.saveButtons[1]);
        } else {
            
            this.elevatorMove("Bottom");
            
            document.querySelectorAll(".storey__arrow")[0].style.transform = "rotate(90deg)";
            console.log("опускаюсь c "+this.saveButtons[0]+" на "+this.saveButtons[1]);
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
                        this.elevatorStop();
                    } else {
                        this.currentHeightElevator++;
                        this.elevator.style.top = "-" + this.currentHeightElevator + "px";
                    }
                }, 1);

            break;

            case "Bottom":
                
                this.animation = setInterval(()=> {
                    if (this.currentHeightElevator === this.needHeight) {
                        this.elevatorStop();
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

        this.localButtons.arrayButtons = this.saveButtons;
        localStorage.setItem("localButtons", JSON.stringify(this.localButtons.arrayButtons));

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

    localData() {
        if (localStorage.getItem("localButtons") !== null) {

            const localData = localStorage.getItem("localButtons");
            const localJSON = JSON.parse(localData);
            const top = (this.heightElevator * localJSON[0] - this.heightElevator);

            this.elevator.style.top = "-" + top  + "px";
            this.currentHeightElevator = top;
            
            this.saveButtons = [localJSON[0]];

            if (localJSON.length > 1) {
                this.saveButtons = [];
                for (let i = 0; i < localJSON.length; i++) {
                    if (i!==0) {
                        document.getElementById(localJSON[i]).style.backgroundColor = "#4cd964";
                    } 
                    this.saveButtons.push(localJSON[i]);
                }
                this.defineHeight();
            }
        } else {
            return false;
        }
        
    }
}

