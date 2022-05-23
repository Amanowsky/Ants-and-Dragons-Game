
function Test() {
    console.log("test");
}

class World {
    constructor(seed, size) {
        this.seed = seed;
        this.size = size;
        this.amountAnts = 0;
        this.amountDragons = 0;
        this.amountFood = 0;
        this.antsArray = [];
        this.dragonsArray = [];
        this.foodsArray = [];
    }
    placeAnt(positionX, positionY) {

        let id = positionX + "-" + positionY;

        for (var i = 0; i <= world.antsArray.length - 1; i++) {
            if (world.antsArray[i].name == id) {
                return 0;
            }
        }
        for (var i = 0; i <= world.dragonsArray.length - 1; i++) {
            if (world.dragonsArray[i].name == id) {
                return 0;
            }
        }
        for (var i = 0; i <= world.foodsArray.length - 1; i++) {
            if (world.foodsArray[i].name == id) {
                return 0;
            }
        }

        const newAnt = new Ant(positionX, positionY);
        newAnt.name = id;
        world.antsArray[world.antsArray.length] = newAnt;


        const table = document.getElementById(id);
        table.classList = "table_ant";
    }
    deleteAnt(positionX, positionY) {

        let id = positionX + "-" + positionY;

        for (var i = 0; i <= world.antsArray.length - 1; i++) {

            if (world.antsArray[i].name == id) {
                world.antsArray.splice(i, 1);
            }
        }

        const table = document.getElementById(id);
        table.classList = "table";
        world.amountAnts--;

    }
    placeDragon(positionX, positionY) {
        let id = positionX + "-" + positionY;

        for (var i = 0; i <= world.antsArray.length - 1; i++) {
            if (world.antsArray[i].name == id) {
                return 0;
            }
        }
        for (var i = 0; i <= world.dragonsArray.length - 1; i++) {
            if (world.dragonsArray[i].name == id) {
                return 0;
            }
        }
        for (var i = 0; i <= world.foodsArray.length - 1; i++) {
            if (world.foodsArray[i].name == id) {
                return 0;
            }
        }

        const newDragon = new Dragon(positionX, positionY);
        newDragon.name = id;
        world.dragonsArray[world.dragonsArray.length] = newDragon;

        const table = document.getElementById(id);
        table.classList = "table_dragon";
    }
    deleteDragon(positionX, positionY) {

        let id = positionX + "-" + positionY;

        for (var i = 0; i <= world.dragonsArray.length - 1; i++) {
            if (world.dragonsArray[i].name == id) {
                world.dragonsArray[i] = "";
            }
        }
        const table = document.getElementById(id);
        table.classList = "table";
        world.amountDragons--;
    }

    placeFood(positionX, positionY) {
        let id = positionX + "-" + positionY;

        for (var i = 0; i <= world.antsArray.length - 1; i++) {
            if (world.antsArray[i].name == id) {
                return 0;
            }
        }
        for (var i = 0; i <= world.dragonsArray.length - 1; i++) {
            if (world.dragonsArray[i].name == id) {
                return 0;
            }
        }
        for (var i = 0; i <= world.foodsArray.length - 1; i++) {
            if (world.foodsArray[i].name == id) {
                return 0;
            }
        }

        const newFood = new Food(positionX, positionY);
        newFood.name = id;
        world.foodsArray[world.foodsArray.length] = newFood;

        const table = document.getElementById(id);
        table.classList = "table_food";

    }
    deleteFood(positionX, positionY) {

        let id = positionX + "-" + positionY;

        for (var i = 0; i <= world.foodsArray.length - 1; i++) {
            if (world.foodsArray[i].name == id) {
                world.foodsArray.splice(i, 1);
            }
        }
        const table = document.getElementById(id);
        table.classList = "table";
        world.amountFood--;
    }
}

class InfoBar {
    static typeOfObject;
    static actObject;
    static moveButtonOn = false;
    static moveButtonAdd = false;

    static objectInfo(e) {
        if (ControlBar.controlbarButtonTurn == true) return 0;
        if (InfoBar.moveButtonOn == true) return 0;

        var target = GetTarget(e);
        var id = target.getAttribute("id");
        let x = "";
        let y = "";
        var i = 0;
        for (i = 0; id[i] != "-"; i++) {
            x = x + id[i];
        }
        for (i = i + 1; i < id.length; i++) {
            y = y + id[i];
        }

        if (document.getElementById(id).className == "table") return 0;

        for (var i = 0; i < world.antsArray.length; i++) {
            if (world.antsArray[i].name == id) {
                InfoBar.actObject = world.antsArray[i];
                InfoBar.typeOfObject = "ant";
            }
        }
        for (var i = 0; i < world.dragonsArray.length; i++) {
            if (world.dragonsArray[i].name == id) {
                InfoBar.actObject = world.dragonsArray[i];
                InfoBar.typeOfObject = "dragon";
            }
        }
        for (var i = 0; i < world.foodsArray.length; i++) {
            if (world.foodsArray[i].name == id) {
                InfoBar.actObject = world.foodsArray[i];
                InfoBar.typeOfObject = "food";
            }
        }
        switch (InfoBar.typeOfObject) {
            case "ant": document.getElementById("info-img").className = "info-img-ant"; break;
            case "dragon": document.getElementById("info-img").className = "info-img-dragon"; break;
            case "food": document.getElementById("info-img").className = "info-img-food"; break;
        }
        document.getElementById("info-details-name").textContent = String(InfoBar.actObject.name);
        document.getElementById("info-details-position").textContent = String(InfoBar.actObject.positionX) + "-" + String(InfoBar.actObject.positionY);
        document.getElementById("info-details-stamina").textContent = Number(InfoBar.actObject.stamina);
        document.getElementById("info-place").className = "info-place";
        document.getElementById("info-button-remove").addEventListener("click", InfoBar.removeButton);
        if (InfoBar.moveButtonAdd == false) {
            document.getElementById("info-button-move").addEventListener("click", InfoBar.moveButton);
            InfoBar.moveButtonAdd = true;
        }
    }

    static removeButton() {
        if(InfoBar.moveButtonOn == true) return 0;
        
        document.getElementById(String(InfoBar.actObject.positionX) + "-" + String(InfoBar.actObject.positionY)).className = "table";
        switch (InfoBar.typeOfObject) {
            case "ant": world.deleteAnt(InfoBar.actObject.positionX, InfoBar.actObject.positionY); break;
            case "dragon": world.deleteDragon(InfoBar.actObject.positionX, InfoBar.actObject.positionY); break;
            case "food": world.deleteFood(InfoBar.actObject.positionX, InfoBar.actObject.positionY); break;
        }
        
        document.getElementById("info-place").className = "disabled";
    }


    static moveButton() {
        InfoBar.moveButtonOn = true;
        if (document.getElementById("info-button-move").className == "info-buttons__buttonOn") {
            document.getElementById("info-button-move").className = "info-buttons__button";
            InfoBar.moveButtonOn = false;
            for (var i = 0; i < globalVariables.playgroundTable.length; i++) {
                globalVariables.playgroundTable[i].removeEventListener("click", InfoBar.moveObject);
            }
            return 0;
        }
        document.getElementById("info-button-move").className = "info-buttons__buttonOn";
        for (var i = 0; i < globalVariables.playgroundTable.length; i++) {
            globalVariables.playgroundTable[i].addEventListener("click", InfoBar.moveObject);
        }

    }
    static moveObject(e) {
        
        var target = GetTarget(e);
        var id = target.getAttribute("id");
        let x = "";
        let y = "";
        var i = 0;
        for (i = 0; id[i] != "-"; i++) {
            x = x + id[i];
        }
        for (i = i + 1; i < id.length; i++) {
            y = y + id[i];
        }
        if (document.getElementById(id).className == "table_ant") return 0;
        if (document.getElementById(id).className == "table_dragon") return 0;
        if (document.getElementById(id).className == "table_food") return 0;
        document.getElementById(InfoBar.actObject.name).className = "table";

        switch (InfoBar.typeOfObject) {
            case "ant":
                {
                    
                    document.getElementById(id).className = "table_ant";
                    for(var i=0;i<world.antsArray.length;i++)
                    {
                        if(world.antsArray[i].name == InfoBar.actObject.name)
                        {
                            
                            world.antsArray[i].name = id;
                            world.antsArray[i].positionX = Number(x);
                            world.antsArray[i].positionY = Number(y);
                        }
                        
                    }
                    break;
                }
            case "dragon":
                {
                    document.getElementById(id).className = "table_dragon";
                    for(var i=0;i<world.dragonsArray.length;i++)
                    {
                        if(world.dragonsArray[i].name == InfoBar.actObject.name)
                        { 
                            world.dragonsArray[i].name = id;
                            world.dragonsArray[i].positionX = Number(x);
                            world.dragonsArray[i].positionY = Number(y);
                        }
                    }
                    break;
                }
            case "food":
                {
                    document.getElementById(id).className = "table_food";
                    for(var i=0;i<world.foodsArray.length;i++)
                    {
                        if(world.foodsArray[i].name == InfoBar.actObject.name)
                        {
                            
                            world.foodsArray[i].name = id;
                            world.foodsArray[i].positionX = Number(x);
                            world.foodsArray[i].positionY = Number(y);
                        }
                        
                    }
                    break;
                }
        }
        
        InfoBar.objectInfoRefresh();


    }

    static objectInfoRefresh() {

        let nextStage = false;
        if (world.amountAnts != 0) {
            for (var i = 0; i < world.antsArray.length; i++) {
                if (world.antsArray[i].name == InfoBar.actObject.name) {
                    nextStage = true;
                }
            }
        }
        if (world.amountDragons != 0) {
            for (var i = 0; i < world.dragonsArray.length; i++) {
                if (world.dragonsArray[i].name == InfoBar.actObject.name) {
                    nextStage = true;
                }
            }
        }
        if (world.amountFood != 0) {
            for (var i = 0; i < world.foodsArray.length; i++) {
                if (world.foodsArray[i].name == InfoBar.actObject.name) {
                    nextStage = true;
                }
            }
        }
        if (nextStage == false) {
            document.getElementById("info-place").className = "disabled";
        }

        document.getElementById("info-details-name").textContent = String(InfoBar.actObject.name);
        document.getElementById("info-details-position").textContent = String(InfoBar.actObject.positionX) + "-" + String(InfoBar.actObject.positionY);
        document.getElementById("info-details-stamina").textContent = Number(InfoBar.actObject.stamina);
    }
}

class Options {



    static startParametersMenu() {
        if (globalVariables.gameIsOpen == true) {
            return 0;
        }
        var parametersDiv = document.getElementById("parameters");
        parametersDiv.style = "display:flex";
        globalVariables.gameIsOpen = true;
        startGameButton.addEventListener("click", Options.downloadStartParameters);
    }
    static downloadStartParameters() {
        //Download game's parameters 
        if(Verify()==false) return 0;
        var parametersDiv = document.getElementById("parameters");
        let size;
        var resolutionRadio = document.getElementsByName("resolution");
        let seed = document.getElementById("seedinput").value;

        for (var i = 0; i < 3; i++) {
            if (resolutionRadio[i].checked) {
                size = resolutionRadio[i].value;
            }
        }
        parametersDiv.style = "display:none";
        Options.startGame(size, seed);
    }


    static addPlayground(x, y) {
        //Add divs on playground
        var divtable = document.createElement('div');
        document.getElementById("playground").appendChild(divtable);
        divtable.id = x + `-` + y;
        divtable.className = "table";
        divtable.setAttribute("name", "table");
    }


    static startGame(size, seed) {
        let x = 1;
        let y = 1;
        var xy = Number(size) * Number(size);
        //Create playground
        var div = document.createElement('div');
        document.getElementById("maingame-content").appendChild(div);
        div.id = "playground";
        div.className = "size_" + size + `x` + size;

        for (var i = 0; i < xy; i++) {
            Options.addPlayground(x, y)
            x++;
            if (x >= Number(size) + 1) {
                y++;
                x = 1;
            }
        }
        //Create world
        world = new World(seed, size);
        globalVariables.playgroundTable = document.getElementsByName("table");
        Options.createObjects(size, seed)
    }

    static createObjects(size, seed) {
        //Amount of Ants
        world.amountAnts = Number(seed[0]) + Number(seed[1]) + Number(size);
        //Amount of Dragons
        world.amountDragons = (Number(seed[3]) + Number(seed[4]) + Number(size)) / 6;
        if (!Number.isInteger(world.amountDragons)) {
            world.amountDragons = world.amountDragons + Number(.5);
        }
        //Amount of Foods
        switch (size) {
            case '8': world.amountFood = (Number(seed[6]) + Number(seed[7]) + Number(size)) / 3;
                if (!Number.isInteger(!world.amountFood)) {
                    world.amountFood = String(world.amountFood)[0];
                }
                break;
            case '14': world.amountFood = ((Number(seed[6]) + Number(seed[7]) + Number(size)) / 1.5)
                if (!Number.isInteger(!world.amountFood)) {
                    world.amountFood = String(world.amountFood)[0] + String(world.amountFood)[1];
                }
                break;
        }
        let x = 1;
        let y = 1;
        let difrensePositionAnts = Number(seed[2]);
        let difrensePositionDragons = Number(seed[5]);
        let difrensePositionFoods = Number(seed[8]);
        for (var i = 0; i < world.amountAnts; i++) {
            x = x + difrensePositionAnts;
            difrensePositionAnts++;
            while (x > size) {
                y++
                x = x - size;
            }
            if (y > size) {
                y = y - size;
            }

            world.placeAnt(x, y);

        }

        for (var i = 0; i < world.amountDragons; i++) {

            x = x + difrensePositionDragons;
            difrensePositionDragons++;
            while (x > size) {
                y++
                x = x - size;
            }
            if (y > size) {
                y = y - size;
            }

            world.placeDragon(x, y)
        }
        for (var i = 0; i < world.amountFood; i++) {
            
            x = x + difrensePositionFoods;
            
            difrensePositionFoods++;
            
            while (x > size) {
                y++
                
                x = x - size;
                
            }
            if (y > size) {
                y = y - size;
            }
            
            world.placeFood(x, y)
        }

        addObjectButtons[0].addEventListener("click", ControlBar.controlbarPlaceAnt)

        addObjectButtons[1].addEventListener("click", ControlBar.controlbarPlaceDragon)

        addObjectButtons[2].addEventListener("click", ControlBar.controlbarPlaceFood)

        for (var i = 0; i < globalVariables.playgroundTable.length; i++) {
            globalVariables.playgroundTable[i].addEventListener("click", InfoBar.objectInfo);
        }


    }
}


class ControlBar {
    static controlbarButtonTurn = false;
    static controlbarButtonType = "";

    static controlbarPlace(e) {
        if (ControlBar.controlbarButtonTurn == false) return 0;
        var target = GetTarget(e);
        var id = target.getAttribute("id");
        let x = "";
        let y = "";
        var i = 0;
        for (i = 0; id[i] != "-"; i++) {
            x = x + id[i];
        }
        for (i = i + 1; i < id.length; i++) {
            y = y + id[i];
        }
        if (document.getElementById(id).className == "table_ant") return 0;
        if (document.getElementById(id).className == "table_dragon") return 0;
        if (document.getElementById(id).className == "table_food") return 0;
        switch (ControlBar.controlbarButtonType) {
            case "ant":
                world.placeAnt(Number(x), Number(y));
                world.amountAnts++
                console.log("AntPlaced");
                break;

            case "dragon":
                world.placeDragon(Number(x), Number(y));
                world.amountDragons++
                console.log("DragonPlaced");
                break;

            case "food":
                world.placeFood(Number(x), Number(y));
                world.amountFood++
                console.log("FoodPlaced");
                break;
        }
    }

    static controlbarPlaceAnt() {

        if (ControlBar.controlbarButtonTurn == true) {
            document.getElementsByClassName("item-push")[0].className = "item-nopush";
            ControlBar.controlbarButtonTurn = false;
            return 0;
        }


        ControlBar.controlbarButtonType = "ant";
        ControlBar.controlbarButtonTurn = true;
        document.getElementById("item-1").className = "item-push";
        for (var i = 0; i < globalVariables.playgroundTable.length; i++) {
            globalVariables.playgroundTable[i].addEventListener("click", ControlBar.controlbarPlace);
        }
        return 0;
    }

    static controlbarPlaceDragon() {


        if (ControlBar.controlbarButtonTurn == true) {
            document.getElementsByClassName("item-push")[0].className = "item-nopush";
            ControlBar.controlbarButtonTurn = false;
            return 0;
        }


        ControlBar.controlbarButtonType = "dragon";
        ControlBar.controlbarButtonTurn = true;
        document.getElementById("item-2").className = "item-push";
        for (var i = 0; i < globalVariables.playgroundTable.length; i++) {
            globalVariables.playgroundTable[i].addEventListener("click", ControlBar.controlbarPlace);
        }
    }
    static controlbarPlaceFood() {
        {


            if (ControlBar.controlbarButtonTurn == true) {
                document.getElementsByClassName("item-push")[0].className = "item-nopush";
                ControlBar.controlbarButtonTurn = false;
                return 0;
            }


            ControlBar.controlbarButtonType = "food";
            ControlBar.controlbarButtonTurn = true;
            document.getElementById("item-4").className = "item-push";
            for (var i = 0; i < globalVariables.playgroundTable.length; i++) {
                globalVariables.playgroundTable[i].addEventListener("click", ControlBar.controlbarPlace)
            }
        }
    }

}





class Ant {
    constructor(positionX, positionY) {
        this.name = "";
        this.positionX = positionX;
        this.positionY = positionY;
        this.stamina = 100;
        this.positionOfDragon = [];
        this.positionOfFood = [];
        this.positionOfAnt = [];
    }

    static globalPositionOfDragon = [];
    static globalPositionOfAnt = [];
    static globalPositionOfFood = [];


    checkDiv(x, y) {

        var id = String(x) + "-" + String(y);
        const div = document.getElementById(id);
        if (div.className == "table_dragon") {
            this.positionOfDragon[this.positionOfDragon.length] = id;

        }
        else if (div.className == "table_food") {
            this.positionOfFood[this.positionOfFood.length] = id;

        }
        else if (div.className == "table_ant") {
            this.positionOfAnt[this.positionOfAnt.length] = id;

        }
    }

    analizeDangerOfMove() {
        for (var i = 0; i < this.positionOfDragon.length; i++) {

        }
    }
    analizeBenefitOfMove() {
        return Number(0);
    }

    moveChangePosition(x, y) {
        document.getElementById(String(this.positionX) + "-" + String(this.positionY)).classList = "table";
        this.positionY = this.positionY + y;
        this.positionX = this.positionX + x;
        this.name = String(this.positionX) + "-" + String(this.positionY);
        document.getElementById(String(this.positionX) + "-" + String(this.positionY)).classList = "table_ant";
        this.stamina = Number(this.stamina) - Number(10);
        return true;
    }

    move() {
        this.analize();
        if (this.positionOfDragon.length == 1000) { //test
            var index = this.analizeDangerOfMove();
            var x = "";
            var y = "";
            var id = this.positionOfDragon[index];
            var j = 0;
            for (j = 0; id[j] != "-"; j++) {
                x = x + id[j];
            }
            for (j = j + 1; j < id.length; j++) {
                y = y + id[j];
            }
            for (var i = 0; i < world.foodsArray.length; i++) {
                if (world.foodsArray[i].name == id) {
                    this.stamina = Number(this.stamina) + Number(50);
                }
            }

        }
        else if (this.positionOfFood.length > 0) {
            var index = this.analizeBenefitOfMove();
            var x = "";
            var y = "";
            var id = this.positionOfFood[index];
            var j = 0;
            for (j = 0; id[j] != "-"; j++) {
                x = x + id[j];
            }
            for (j = j + 1; j < id.length; j++) {
                y = y + id[j];
            }
            for (var i = 0; i < world.foodsArray.length; i++) {
                if (world.foodsArray[i].name == id) {
                    this.stamina = Number(this.stamina) + Number(50);
                }
            }
            world.deleteFood(x, y)
            document.getElementById(String(this.positionX) + "-" + String(this.positionY)).classList = "table";
            this.positionX = Number(x);
            this.positionY = Number(y);
            this.name = String(this.positionX) + "-" + String(this.positionY);
            document.getElementById(id).className = "table_ant"
        }
        else {
            if (this.stamina == Number(10)) {
                document.getElementById(String(this.positionX) + "-" + String(this.positionY)).className = "table";
                world.deleteAnt(this.positionX, this.positionY);
            }
            else {
                let end = false;
                let counter = 0;
                while (end == false) {
                    counter++;
                    if (counter == 20) return;
                    var random = Math.floor(Math.random() * 7) + 1;
                    switch (random) {
                        case 1:
                            {
                                if (this.positionY == 1) break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY - 1)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY - 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(0, -1);
                                break;
                            }
                        case 2:
                            {
                                if (this.positionY == 1 || this.positionX == world.size) break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY - 1)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY - 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(1, -1)
                                break;
                            }
                        case 3:
                            {
                                if (this.positionX == world.size) break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY)).classList == "table_dragon") break;
                                end = this.moveChangePosition(1, 0)
                                break;
                            }

                        case 4:
                            {
                                if (this.positionY == world.size || this.positionX == world.size) break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY + 1)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY + 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(1, 1)
                                break;
                            }
                        case 5:
                            {
                                if (this.positionY == world.size) break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY + 1)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY + 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(0, 1)
                                break;
                            }

                        case 6:
                            {
                                if (this.positionY == world.size || this.positionX == 1) break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY + 1)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY + 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-1, 1)
                                break;
                            }
                        case 7:
                            {
                                if (this.positionX == 1) break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-1, 0)
                                break;
                            }

                        case 8:
                            {
                                if (this.positionY == 1 || this.positionX == 1) break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY - 1)).classList == "table_ant") break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY - 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-1, -1)
                                break;
                            }
                    }

                }
            }
        }
    }



    analize() {
        this.positionOfDragon = [];
        this.positionOfFood = [];
        this.positionOfAnt = [];
        for (var i = 1; i <= 8; i++) {
            switch (i) {
                case 1:
                    {
                        if (this.positionY == 1) break;
                        var x = this.positionX;
                        var y = this.positionY - 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 2:
                    {
                        if (this.positionY == 1 || this.positionX == world.size) break;
                        var x = this.positionX + 1;
                        var y = this.positionY - 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 3:
                    {
                        if (this.positionX == world.size) break;
                        var x = this.positionX + 1;
                        var y = this.positionY;
                        this.checkDiv(x, y);
                        break;
                    }
                case 4:
                    {
                        if (this.positionY == world.size || this.positionX == world.size) break;
                        var x = this.positionX + 1;
                        var y = this.positionY + 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 5:
                    {
                        if (this.positionY == world.size) break;
                        var x = this.positionX;
                        var y = this.positionY + 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 6:
                    {
                        if (this.positionY == world.size || this.positionX == 1) break;
                        var x = this.positionX - 1;
                        var y = this.positionY + 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 7:
                    {
                        if (this.positionX == 1) break;
                        var x = this.positionX - 1;
                        var y = this.positionY;
                        this.checkDiv(x, y);
                        break;
                    }
                case 8:
                    {
                        if (this.positionY == 1 || this.positionX == 1) break;
                        var x = this.positionX - 1;
                        var y = this.positionY - 1;
                        this.checkDiv(x, y);
                        break;
                    }
            }
        }

    }



}
class Dragon {
    constructor(positionX, positionY) {
        this.name = "";
        this.positionX = positionX;
        this.positionY = positionY;
        this.stamina = Number(100);
        this.positionOfDragon = [];
        this.positionOfFood = [];
        this.positionOfAnt = [];
    }
    static globalPositionOfDragon = [];
    static globalPositionOfAnt = [];


    checkDiv(x, y) {
        var id = String(x) + "-" + String(y);
        const div = document.getElementById(id);
        if (div.className == "table_dragon") {
            this.positionOfDragon[this.positionOfDragon.length] = id;

        }
        else if (div.className == "table_food") {
            this.positionOfFood[this.positionOfFood.length] = id;

        }
        else if (div.className == "table_ant") {
            this.positionOfAnt[this.positionOfAnt.length] = id;

        }
    }

    calculateRoad() {
        var resultOfCalculateArray = [];
        var index = 0;
        for (var i = 0; i < this.positionOfAnt.length; i++) {
            var result;
            var x = "";
            var y = "";
            var id = this.positionOfAnt[i];
            var j = 0;
            for (j = 0; id[j] != "-"; j++) {
                x = x + id[j];
            }
            for (j = j + 1; j < id.length; j++) {
                y = y + id[j];
            }
            result = Math.sqrt(Math.pow(x - this.positionX, 2) + Math.pow(y - this.positionY, 2));
            resultOfCalculateArray.push(result);
        }
        for (var i = 1; i < resultOfCalculateArray.length; i++) {
            if (resultOfCalculateArray[i] < resultOfCalculateArray[index]) index = i;
        }
        return index;

    }



    moveChangePosition(x, y) {
        document.getElementById(String(this.positionX) + "-" + String(this.positionY)).classList = "table";
        this.positionY = this.positionY + y;
        this.positionX = this.positionX + x;
        this.name = String(this.positionX) + "-" + String(this.positionY);
        document.getElementById(String(this.positionX) + "-" + String(this.positionY)).classList = "table_dragon";
        this.stamina = Number(this.stamina) - Number(10);
        return true;
    }

    move() {
        this.analize();
        if (this.positionOfAnt.length > 0) {
            var index = this.calculateRoad();
            var x = "";
            var y = "";
            var id = this.positionOfAnt[index];
            var j = 0;
            for (j = 0; id[j] != "-"; j++) {
                x = x + id[j];
            }
            for (j = j + 1; j < id.length; j++) {
                y = y + id[j];
            }
            for (var i = 0; i < world.antsArray.length; i++) {
                if (world.antsArray[i].name == id) {
                    this.stamina = Number(this.stamina) + Number(world.antsArray[i].stamina);
                }
            }
            world.deleteAnt(x, y)
            document.getElementById(String(this.positionX) + "-" + String(this.positionY)).classList = "table";
            this.positionX = Number(x);
            this.positionY = Number(y);
            this.name = String(this.positionX) + "-" + String(this.positionY);
            document.getElementById(id).className = "table_dragon"
        }
        else {
            if (this.stamina == Number(10)) {
                document.getElementById(String(this.positionX) + "-" + String(this.positionY)).className = "table";
                world.deleteDragon(this.positionX, this.positionY);
            }
            else {
                let end = false;
                let counter = 0;
                while (end == false) {
                    counter++;
                    if (counter == 20) return;
                    var random = Math.floor(Math.random() * 12) + 1;
                    switch (random) {
                        case 1:
                            {
                                if (this.positionY == 1) break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY - 1)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY - 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(0, -1);
                                break;
                            }
                        case 2:
                            {
                                if (this.positionY == 1 || this.positionY == 2) break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY - 2)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY - 2)).classList == "table_dragon") break;
                                end = this.moveChangePosition(0, -2);
                                break;
                            }
                        case 3:
                            {
                                if (this.positionY == 1 || this.positionX == world.size) break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY - 1)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY - 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(1, -1)
                                break;
                            }
                        case 4:
                            {
                                if (this.positionX == world.size) break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY)).classList == "table_dragon") break;
                                end = this.moveChangePosition(1, 0)
                                break;
                            }
                        case 5:
                            {
                                if (this.positionX == world.size || this.positionX == world.size - 1) break;
                                if (document.getElementById(String(this.positionX + 2) + "-" + String(this.positionY)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX + 2) + "-" + String(this.positionY)).classList == "table_dragon") break;
                                end = this.moveChangePosition(2, 0)
                                break;
                            }
                        case 6:
                            {
                                if (this.positionY == world.size || this.positionX == world.size) break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY + 1)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX + 1) + "-" + String(this.positionY + 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(1, 1)
                                break;
                            }
                        case 7:
                            {
                                if (this.positionY == world.size) break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY + 1)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY + 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(0, 1)
                                break;
                            }
                        case 8:
                            {
                                if (this.positionY == world.size || this.positionY == world.size - 1) break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY + 2)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX) + "-" + String(this.positionY + 2)).classList == "table_dragon") break;
                                end = this.moveChangePosition(0, 2)
                                break;
                            }
                        case 9:
                            {
                                if (this.positionY == world.size || this.positionX == 1) break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY + 1)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY + 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-1, 1)
                                break;
                            }
                        case 10:
                            {
                                if (this.positionX == 1) break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-1, 0)
                                break;
                            }
                        case 11:
                            {
                                if (this.positionX == 1 || this.positionX == 2) break;
                                if (document.getElementById(String(this.positionX - 2) + "-" + String(this.positionY)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX - 2) + "-" + String(this.positionY)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-2, 0)
                                break;
                            }
                        case 12:
                            {
                                if (this.positionY == 1 || this.positionX == 1) break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY - 1)).classList == "table_food") break;
                                if (document.getElementById(String(this.positionX - 1) + "-" + String(this.positionY - 1)).classList == "table_dragon") break;
                                end = this.moveChangePosition(-1, -1)
                                break;
                            }
                    }
                }
            }
        }
    }




    analize() {
        this.positionOfDragon = [];
        this.positionOfFood = [];
        this.positionOfAnt = [];
        for (var i = 1; i <= 12; i++) {
            switch (i) {
                case 1:
                    {
                        if (this.positionY == 1) break;
                        var x = this.positionX;
                        var y = this.positionY - 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 2:
                    {
                        if (this.positionY == 1 || this.positionY == 2) break;
                        var x = this.positionX;
                        var y = this.positionY - 2;
                        this.checkDiv(x, y);
                        break;
                    }
                case 3:
                    {
                        if (this.positionY == 1 || this.positionX == world.size) break;
                        var x = this.positionX + 1;
                        var y = this.positionY - 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 4:
                    {
                        if (this.positionX == world.size) break;
                        var x = this.positionX + 1;
                        var y = this.positionY;
                        this.checkDiv(x, y);
                        break;
                    }
                case 5:
                    {
                        if (this.positionX == world.size || this.positionX == world.size - 1) break;
                        var x = this.positionX + 2;
                        var y = this.positionY;
                        this.checkDiv(x, y);
                        break;
                    }
                case 6:
                    {
                        if (this.positionY == world.size || this.positionX == world.size) break;
                        var x = this.positionX + 1;
                        var y = this.positionY + 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 7:
                    {
                        if (this.positionY == world.size) break;
                        var x = this.positionX;
                        var y = this.positionY + 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 8:
                    {
                        if (this.positionY == world.size || this.positionY == world.size - 1) break;
                        var x = this.positionX;
                        var y = this.positionY + 2;
                        this.checkDiv(x, y);
                        break;
                    }
                case 9:
                    {
                        if (this.positionY == world.size || this.positionX == 1) break;
                        var x = this.positionX - 1;
                        var y = this.positionY + 1;
                        this.checkDiv(x, y);
                        break;
                    }
                case 10:
                    {
                        if (this.positionX == 1) break;
                        var x = this.positionX - 1;
                        var y = this.positionY;
                        this.checkDiv(x, y);
                        break;
                    }
                case 11:
                    {
                        if (this.positionX == 1 || this.positionX == 2) break;
                        var x = this.positionX - 2;
                        var y = this.positionY;
                        this.checkDiv(x, y);
                        break;
                    }
                case 12:
                    {
                        if (this.positionY == 1 || this.positionX == 1) break;
                        var x = this.positionX - 1;
                        var y = this.positionY - 1;
                        this.checkDiv(x, y);
                        break;
                    }
            }
        }

    }




}



class Food {
    constructor(positionX, positionY) {
        this.name = "";
        this.positionX = positionX;
        this.positionY = positionY;
    }
}





const newGameButton = document.getElementById("newGame-button");
const startGameButton = document.getElementById("start-game-button");
const testButton = document.getElementById("testbutton");
const addObjectButtons = document.getElementsByName("ObjectButton")
const nextMove = document.getElementById("item-0");

let world;
let globalVariables = {
    gameIsOpen: false,
    playgroundTable: []
};





function GetTarget(e) {
    return e.target
}
function Verify() {
    if(document.getElementById("seedinput").value.length<9)
    {
        alert("min.9 numbers");
        return false;
    } 
    return true;
}








newGameButton.addEventListener("click", Options.startParametersMenu);

document.getElementById("img-1").addEventListener("mouseenter", function () {
    document.getElementById("controls-bar__content").textContent = "Tworzy obiekt mrówka, pole widzenia 8, ruch 1 pole, stamina 100";
})
document.getElementById("img-1").addEventListener("mouseout", function () {
    document.getElementById("controls-bar__content").textContent = "";
})
document.getElementById("img-2").addEventListener("mouseenter", function () {
    document.getElementById("controls-bar__content").textContent = "Tworzy obiekt smok, pole widzenia 12, ruch 1-2 pola, stamina 100";
})
document.getElementById("img-2").addEventListener("mouseout", function () {
    document.getElementById("controls-bar__content").textContent = "";
})
document.getElementById("img-3").addEventListener("mouseenter", function () {
    document.getElementById("controls-bar__content").textContent = "Tworzy obiekt jedzenie, nie rusza się, dodaje 50 staminy";
})
document.getElementById("img-3").addEventListener("mouseout", function () {
    document.getElementById("controls-bar__content").textContent = "";
})


nextMove.addEventListener("click", function () {

    for (var i = 0; i < world.antsArray.length; i++) {
        if (world.antsArray[i] == "") {
            world.antsArray.splice(i, 1);
            i = 0;
        }
    }
    if (world.antsArray[0] == "") world.antsArray = [];
    for (var i = 0; i < world.antsArray.length; i++) {
        world.antsArray[i].move()
    }
    for (var i = 0; i < world.antsArray.length; i++) {
        if (world.antsArray[i] == "") {
            world.antsArray.splice(i, 1);
            i = 0;
        }
    }
    if (world.antsArray[0] == "") world.antsArray = [];
    

    for (var i = 0; i < world.dragonsArray.length; i++) {
        if (world.dragonsArray[i] == "") {

            world.dragonsArray.splice(i, 1);
            i = 0;
        }
    }

    if (world.dragonsArray[0] == "") world.dragonsArray = [];

    for (var i = 0; i < world.dragonsArray.length; i++) {
        world.dragonsArray[i].move();

    }
    for (var i = 0; i < world.dragonsArray.length; i++) {
        if (world.dragonsArray[i] == "") {

            world.dragonsArray.splice(i, 1);
            i = 0;
        }
    }

    if (world.dragonsArray[0] == "") world.dragonsArray = [];
    
    

    if (document.getElementById("info-place").className != "disabled") {
        InfoBar.objectInfoRefresh();
    }


})











