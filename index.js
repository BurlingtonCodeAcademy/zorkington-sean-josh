// Readline interface setup /////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// Setting up character, room and item classes and player object ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

let player = {
  inventory: ["A Magnifying Glass"],
  name: "",
  location: [],
  hasSpokenTo: [],
  hasMoved: [],
  examine() {},
  move() {},
  speak() {},
  take() {},
  drop() {},
  use() {},
  go() {},
  lookAround() {},
  lookCloser() {},
  solve() {},
};

let characterFactory = (name, location) => {
  return { name, location, inventoryArr };
};

let green = characterFactory("Mr. Green", "Kitchen");

let mustard = characterFactory("Colonel Mustard", "Lounge");

let scarlet = characterFactory("Miss Scarlet", "Dining Room");

let peacock = characterFactory("Mrs. Peacock", "Lounge");

let plum = characterFactory("Professor Plum", "Library");

let body = characterFactory("Mr. Body", "Kitchen");

let white = characterFactory("Mrs. White", "Study");

let cook = characterFactory("The Cook", "Kitchen");


let roomFactory = (name, ...args) => {
  inventory = [args]
  return {name, inventory}
};

let kitchen = roomFactory("The Kitchen", "Frying Pan", "Body");

let study = roomFactory("The Study", "A desk", "A couch", "A chair");

let diningRoom = roomFactory("The Dining Room", "Dining Table", "An empty chair");

let billiardRoom = roomFactory("The Billiard Room", "Billiard Table", "Billiard Balls", "Pool Cue");

let lounge = roomFactory("The Lounge", "A couch", "A chair", "Bar cart");

let conservatory = roomFactory("The Conservatory", "Orange tree", "Bamboo palm", "Spider plant");

let ballroom = roomFactory("The Ballroom", "Chandelier", "Table", "Column");

let library = roomFactory("The Library", "A bookshelf", "A fireplace", "A sofa");

let hall = roomFactory("The Hall", "A bench", "A hallway runner", "A piano" )



// Item constructor ///////////////////////////////////////////////////////////////////////////////

class Item {
  constructor(name, description, takeable, action) {
      this.name = name;
      this.desc = description;
      this.takeable = takeable;
      this.action = action;    
  }
}

// Player initial inventory ////////////////////////////////////////////////////////////////////////

let magnifyingGlass = new Item('A Magnifying Glass', 'An ordinary magnifying glass used to look closer.', true, () => {if ()})
// Kitchen inventory ///////////////////////////////////////////////////////////////////////////////

let fryingPan = new Item('Frying Pan', 'An ordinary frying pan. Maybe you could cook up some eggs with it.', true, () => {if (player.location === "The Kitchen") {console.log('You fry up some delicious eggs. Now back to the matter at hand!')}};

let body = new Item('The Body', "The body of Mr. Body lies on his back, lifeless on the kitchen floor. A pool of blood surrounds his head.", false, ());


// Study inventory /////////////////////////////////////////////////////////////////////////////////

let studyDesk = new Item('A Desk', false, true, "Just an ordinary desk");

let studyCouch = new Item('A couch', false, true, "A nice Victorian-style couch upon which Mr. Green and Mrs. White currently sit.");

let studyChair = new Item('A chair', false, true, "A cushy Victorian-style chair. Perhaps you could have a sit.");

// Dining Room inventory ///////////////////////////////////////////////////////////////////////////

let diningTable = new Item('Dining Table', false, true, "A beautiful banquet dining table that seats 14.");

let diningChair = new Item('Dining chair', false, true, "An empty dining chair next to Miss Scarlet and the cook. Perhaps you could have a sit.");


const diningMessage =
  "You enter the dining room to find Miss Scarlet sobbing and the cook with his arm around her trying to console her.";

green.dialogOne =
  "\nWe were all enjoying some good after dinner conversation when the power in the house went out and then the lights came back on we heard a scream from the kitchen. When we all rushed in we discovered Mr. Body dead on the floor. Miss Scarlet was the first one to discover the body. She's pretty broken up about it. My cook is currently in the dining room with her consoling her. Maybe you should go speak to her.\n";

cook.dialogOne = "\nHello inspector. What a horrible thing that has happened.";

// Beginning of function declarations ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

async function start() {
  const welcomeMessage = `Welcome to our Murder Mystery! You are an inspector tasked with solving a murder that occured at a dinner party. You the actions you may need to take are: (examine), (move), (speak), (take), (drop), (use), (go), (look around), (look closer) and (solve).\n`;

  console.log(kitchen);
  console.log(welcomeMessage);
  let getName = await ask(`What is your name, Inspector? >_`);
  player.name = getName;
  let initialize = await ask(`\nIt is a dreary Friday evening in November. You're catching up on some paperwork when the phone rings...

  "Good evening Inspector ${player.name}, My name is Mr. Green and I'm afraid I am in need of your services. I've been hosting a dinner party tonight and one of my guests has been murdered. All of the guests are still here and we've vowed that nobody leaves until we find the killer. \n
  Can you help us?" (y/n) >_`);
  if (initialize === "n") {
    process.exit();
  } else if (initialize === "y") {
    player.location = "Kitchen";

    const arrivalMessage = `\nYou arrive in the kitchen of Mr. Green's mansion to find the body of Mr. Body.`;

    console.log(arrivalMessage);
    playKitchen();
  }
}

async function playKitchen() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("examine") && inputArr.includes("body")) {
    console.log(body.desc);
    playKitchen();
  } 
  else if (inputArr.includes("move") && inputArr.includes("body")) {
    console.log(body.extraDesc);
    playKitchen();
  } 
  else if (inputArr.includes("speak") && inputArr.includes("green")) {
    console.log(green.dialogOne);

    if (!player.hasSpokenTo.includes("green")) {
      player.hasSpokenTo.push("green");
      console.log(player.hasSpokenTo);
    }
    playKitchen();
  } 
  else if (inputArr.includes("go") && inputArr.includes("dining")) {
    player.location = "The Dining Room";
    console.log(diningMessage);
    playDining();
  } 
  else if (inputArr.includes("go") && inputArr.includes("conservatory")) {
    player.location = "The Conservatory";
    console.log(conservatoryMessage);
    playConservatory();
  } 
  else if (inputArr.includes("go") && inputArr.includes("library")) {
    player.location = "The Library";
    console.log(libraryMessage);
    playLibrary();
  } 
  else if (inputArr.includes("go") && inputArr.includes("Study")) {
    player.location = "The Study";
    console.log(studyMessage);
    playStudy();
  } 
  else if (
    inputArr.includes("take") &&
    (inputArr.includes("notepad") || inputArr.includes("note pad"))
  ) {
    player.inventory.push("Mr. Body's note pad");
    playKitchen();
  } 
  else if (inputArr.includes("drop")) {

  } 
  else if (inputArr.includes("use")) {

  } 
  else if (inputArr.includes("look around")) {
    console.log(kitchen.desc);
    playKitchen();
  } 
  else if (inputArr.includes("look closer")) {

  } 
  else if (inputArr.includes("solve")) {

  } 
  else {
    console.log(
      `I don't understand what you want and/or you can't do that in this room...`
    );
    playKitchen();
  }
}

async function playDining() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("cook")) {
    player.hasSpokenTo.push("cook");
    console.log(player.hasSpokenTo);
    console.log(cook.dialogOne);
    playDining();
  }
}

async function playLounge() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playConservatory() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playBallroom() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playLibrary() {
  let input = await ask(">_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playHall() {
  let input = await ask(">_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playBallroom() {
  let input = await ask(">_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playStudy() {
  let input = await ask(">_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

async function playBilliardRoom() {
  let input = await ask(">_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

// Launching game ////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

start();
