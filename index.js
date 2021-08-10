class Room {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
    }
    get name() {
        return this._name;  // returns kitchen you can see a sink
    }

    get description() {
        return this.description;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    describe() {
        return "Your are in the " + this.name + " you can see " + this._description;
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You cant go taht way");
            return this;
        }

    }
}
class Character {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._conversation = {};
    }
    get name() {
        return this._name
    }

    get description() {
        return this.description;
    }


    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    describe() {
        return "you see " + this.name + " a " + this._description;
    }
}


class Enemy extends Character {
    constructor(name, description, weakness) {
        super(name, description)
        this._weakness = weakness;
    }
    fight(item) {
        if (item === this._weakness) {
            return true;
        } else {
            return false
        }
    }
}



class Item {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
        this._linkedItems = {};
    }
    get name() {
        return this._name;
    }

    get description() {
        return this.description;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        this._description = value;
    }

    describe() {
        return "you find a  " + this.name + " it is " + this._description;
    }



    get(item) {
        console.log(this.name)
        if (this.name == "Safe") {
            document.getElementById("warningArea").innerHTML = "you cant get the safe it is too heavy";
            document.getElementById("warningArea").style.display = "none";
        } else {
            document.getElementById("itemArea").style.display = "none;"

            backPack.push(this);
            for (let i = 0; i < backPack.length; i++) {
                const names = backPack.map(item => {
                    document.getElementById("backPackPrint").innerHTML = "Your back pack contains: " + JSON.stringify(backPack[i].name);
                    return backPack.name;
                })


            }
        }
    }
    use(item) {
        alert("im use function");
    }
    look(item) {
        alert("im look function")
    }
    talk(item) {
        alert("im talk function")
    }


}



class Jewelry extends Item {
    constructor(name, description, bodyPart) {
        super(name, description)
        this._bodyPart = bodyPart;
    }
    wear(item) {
        if (item = this._bodyPart) {
            return true;
        } else {
            return false;
        }
    }

}

//room objects
const Entrance = new Room("Entrance", "Steps lead up to an old wooden paneled door");
const Hall = new Room("Hall", "a reception desk.");
const Kitchen = new Room("Kitchen", "a sink");
const Garden = new Room("Garden", "Some dead plants")
const Ballroom = new Room("Ballroom", "a huge dancefloor")
const Office = new Room("Office", "a desk and some chairs");
const Library = new Room("Library", "Some dusty books");
const DiningRoom = new Room("Dining Room", "a Table");
const Bathroom = new Room("Bathroom", "a bath");



//link rooms
Entrance.linkRoom("north", Hall);

Hall.linkRoom("north", Kitchen);
Hall.linkRoom("east", Library);
Hall.linkRoom("south", Entrance);
Hall.linkRoom("west", Ballroom);

Kitchen.linkRoom("east", DiningRoom);
Kitchen.linkRoom("south", Hall);
Kitchen.linkRoom("west", Garden);

Garden.linkRoom("east", Kitchen);
Garden.linkRoom("south", Ballroom);

Ballroom.linkRoom("north", Garden);
Ballroom.linkRoom("east", Hall);
Ballroom.linkRoom("south", Office);

Office.linkRoom("north", Ballroom);

Library.linkRoom("north", DiningRoom);
Library.linkRoom("south", Bathroom);
Library.linkRoom("west", Hall);

DiningRoom.linkRoom("south", Library);
DiningRoom.linkRoom("west", Kitchen);

Bathroom.linkRoom("north", Library);


//item objects
const Money = new Item("Note", " a £20 note.");
const FloorPlan = new Item("Floor Plan", "framed on the wall");
const Flyer = new Item("Flyer", " A5 size and something is writen on it");
const Spider = new Item("Spider", "its a fluffy tarantula");
const CandleStick = new Item("Candlestick", "It looks heavy");
const Key = new Item("Key", "It is big and silver colored - and looks like it might open a safe.")
const GrassHopper = new Item("Grass Hopper", "looks like its sunbathing on a rock.")
const Net = new Item("Net", "The net has a fine mesh for catching fish.")
const Safe = new Item("Safe", "The safe is locked.")
// console.log(Spider.describe())


//link items to rooms

Entrance.Item = Money;
Hall.Item = FloorPlan;
Library.Item = Flyer;
Bathroom.Item = Spider;
DiningRoom.Item = CandleStick;
Kitchen.Item = Key;
Garden.Item = GrassHopper;
Ballroom.Item = Net;
Office.Item = Safe;




//Jewelry objects
const Necklace = new Jewelry("Tiara", "its really shiny", "neck")
// console.log(Necklace.describe())

// console.log(Necklace.wear("neck"))

//Character objects
const Guard = new Enemy("Gary", "Security Guard")
// console.log(Guard.describe());
Office.Enemy = Guard;
//Enemy objects
const Dagger = new Enemy("Dagger", "its shiny", "throw")
// console.log(Dagger.describe())
// console.log(Dagger.fight("stab"));
// console.log(Dagger.fight("throw"));




// document.getElementById("textarea").innerHTML = Kitchen.describe();

function displayRoomInfo(room) {
    content = room.describe();
    document.getElementById("textarea").innerHTML = content;
    if (room.Item) {
        itemContent = room.Item.describe();
        document.getElementById("itemArea").innerHTML = itemContent;
    }
    document.getElementById("ui").focus();
}



function startGame() {   //start in the Entrance
    currentRoom = Entrance;
    backPack = [];
    displayRoomInfo(currentRoom);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("ui").value;
            const directions = ["north", "south", "east", "west"]
            const commands = ["get", "use", "look", "talk"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command);
                // console.log(currentRoom);
                displayRoomInfo(currentRoom);
            } else if (commands.includes(command)) {
                currentRoom.Item.get();
                console.log(backPack);
            } else {
                document.getElementById("ui").value = "";
                alert("thats is not a valid command please try again")
            }
        }
    });
}

startGame();
