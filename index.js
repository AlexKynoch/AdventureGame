window.onload = function () {
    // document.getElementById("textarea").style.display = "none";
    document.getElementById("itemArea").style.display = "none";
    // document.getElementById("startArea").style.display = "block";
    // document.getElementById("startArea").innerHTML = "Type start to play.";
}

class Room {
    constructor(name, description, item) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
        this.item = item
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
        if (this.name !== "Office") {
            document.getElementById("itemArea").style.display = "block";
        }
        if (this.item) {
            document.getElementById("itemArea").innerHTML = "You see a " + this.item._description
        }
        else {
            document.getElementById("itemArea").style.display = "none"

        }

        return "Your are in the " + this.name + " you can see " + this._description;
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    linkItem(item) {
        this.item = item
    }
    removeItem() {
        this.item = null
    }

    move(direction) {
        if (direction in this._linkedRooms) {
            document.getElementById("warningArea").style.display = "none";
            return this._linkedRooms[direction];

        } else {
            alert("You cant go that way");
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

    get conversation() {
        return this._conversation;
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

    set conversation(value) {
        this._conversation = value;
    }

    describe() {
        return "you see " + this.name + " the " + this._description;
    }

    talk() {
        return this.name + " Says " + this.conversation + ".";
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

    // remove(item) {

    //     // document.getElementById("itemArea").style.display = "none";

    // }

    get(item) {
        // console.log(this.name)
        if (this.name == "Safe") {
            document.getElementById("warningArea").innerHTML = "you cant get the safe it is too heavy";
            document.getElementById("warningArea").style.display = "block";

        } else {
            document.getElementById("itemArea").style.display = "none;"

            let back = this.name; //"Note"
            backPack.map((item) => back = item._name + ", " + back)

            // this line picks it up
            backPack.push(this);
            console.log(this.name)
            console.log(backPack);

            let x = false
            backPack.map((item) => {
                if (JSON.stringify(backPack).includes(item.name)) {
                    x = true
                }

            })
            if (x) {
                console.log("passed")
                document.getElementById("itemArea").style.display = "none";
            } else {
                document.getElementById("warningArea").style.display = "none";
            }

            document.getElementById("backPackPrint").innerHTML = "Your backpack has: " + back;



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
//item objects
const Money = new Item("Note", " a £20 note.");
const FloorPlan = new Item("Floor Plan", "framed on the wall");
const Flyer = new Item("Flyer", " A5 size and something is writen on it");
const Spider = new Item("Spider", "its a fluffy tarantula");
const CandleStick = new Item("Candlestick", "It looks heavy");
const Key = new Item("Key", "It is big and silver colored - and looks like it might open a safe.");
const GrassHopper = new Item("Grass Hopper", "looks like its sunbathing on a rock.");
const Net = new Item("Net", "The net has a fine mesh for catching fish.");
const Safe = new Item("Safe", "The safe is locked.");
// console.log(Spider.describe())


//room objects

const Entrance = new Room("Entrance", "Steps lead up to an old wooden paneled door", Money);
const Hall = new Room("Hall", "a reception desk.", FloorPlan);
const Kitchen = new Room("Kitchen", "a sink", Key);
const Garden = new Room("Garden", "Some dead plants", GrassHopper)
const Ballroom = new Room("Ballroom", "a huge dance floor", Net)
const Office = new Room("Office", "a desk and some chairs", Safe);
const Library = new Room("Library", "Some dusty books", Flyer);
const DiningRoom = new Room("Dining Room", "a Table", CandleStick);
const Bathroom = new Room("Bathroom", "a bath", Spider);


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
const Guard = new Character("Gary", "Security Guard")
// console.log(Guard.describe());
const Receptionist = new Character("Bob", "Receptionist is typeing")
Office.Character = Guard;
Hall.Character = Receptionist;
Guard.conversation = "Ooh no you cant come in here";
//Enemy objects
// console.log(Guard.conversation);
const Dagger = new Enemy("Dagger", "its shiny", "throw")
// console.log(Dagger.describe())
// console.log(Dagger.fight("stab"));
// console.log(Dagger.fight("throw"));




// document.getElementById("textarea").innerHTML = Kitchen.describe();

// function startArea() {
//     document.getElementById("startArea").style.display = "none";
// }


function startPage() {
    document.getElementById("startarea").innerHTML = "Type start to play."

    document.getElementById("textarea").style.display = "none";

}

function setUpPage() {
    document.getElementById("textarea").style.display = "block";
    document.getElementById("image").style.display = "none";
    document.getElementById("startarea").style.display = "none";
    document.getElementById("itemArea").style.display = "block";
    document.getElementById("ui").value = '';
}

function talk() {

    // if (this.command == "talk" && this.currentRoom == "Office") {
    if (currentRoom.name == "Office") {
        switch (command) {
            case ("talk"):
                document.getElementById("talkArea").style.display = "block";
                document.getElementById("talkArea").innerHTML = Guard.conversation;
                break;
            // case ("get"):
            //     document.getElementById("talkArea").style.display = "none";

            //     // console.log(currentRoom)
            //     currentRoom.item.get();
            //     currentRoom.removeItem()
            //     document.getElementById("ui").value = "";
            //     break;
            default:
                console.log("oops not sure what happened there");
        }
    }




}

function displayCharacterInfo() {

    // console.log(Guard.describe());
    document.getElementById("characterArea").style.display = "block";
    document.getElementById("characterArea").innerHTML = Guard.describe();
}


function displayRoomInfo(room) {
    console.log(room)
    content = room.describe();

    // console.log(room.name)
    if (room.name == "Office") {
        displayCharacterInfo();

    } else if (room.name == "Hall") {
        document.getElementById("characterArea").style.display = "block";
        document.getElementById("characterArea").innerHTML = Receptionist.describe();
    } else {
        document.getElementById("characterArea").style.display = "none";
    }





    document.getElementById("textarea").innerHTML = content;
    if (room.Item) {
        itemContent = room.Item.describe();
        document.getElementById("itemArea").innerHTML = itemContent;

        document.getElementById("ui").focus();
    }
}

function removeItem() {
    switch (backPack.includes('')) {
        case ("Note"):
            document.getElementById("itemArea").style.display = "none";
            break;
        case ("Net"):
            document.getElementById("itemArea").style.display = "none";
            break;
        default:
            console.log("oops not sure what happened there");
    }
}



function startGame() {   //start in the Entrance

    startPage();
    currentRoom = Entrance;
    backPack = [];
    displayRoomInfo(currentRoom);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("ui").value;

            const directions = ["north", "south", "east", "west"]
            const commands = ["get", "use", "look", "talk", "start"]

            // console.log(command)
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command);
                document.getElementById("talkArea").style.display = "none";
                displayRoomInfo(currentRoom);
                document.getElementById("ui").value = "";

            } else if (command == "get") {
                currentRoom.item.get();
                currentRoom.removeItem()
                document.getElementById("ui").value = "";

            } else if (command == "talk") {
                talk();


            } else if (command == "start") {
                setUpPage();

            } else {

                document.getElementById("ui").value = "";
                alert("thats is not a valid command please try again")
            }
        }
    });
}

startGame();
