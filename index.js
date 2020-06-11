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
  inventory: ["magnifying glass"],
  name: "",
  location: [],
  hasSpokenTo: [],
  examine() {},
  move() {},
  speak() {},
  take() {},
  drop() {},
  use() {},
  go() {},
  lookAround() {},
  lookCloser() {},
  solve() {}
};

let characterFactory = (name, location, inventory) => {
  inventoryArr = [inventory];
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

const diningMessage = 'You enter the dining room to find Miss Scarlet sobbing and the cook with his arm around her trying to console her.'

green.dialogOne =
  "\nWe were all enjoying some good after dinner conversation when the power in the house went out and then the lights came back on we heard a scream from the kitchen. When we all rushed in we discovered Mr. Body dead on the floor. Miss Scarlet was the first one to discover the body. She's pretty broken up about it. My cook is currently in the dining room with her consoling her. Maybe you should go speak to her.\n";

cook.dialogOne = "\nHello inspector. What a horrible thing that has happened.";


// Beginning of function declarations ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

async function start() {
  const welcomeMessage = `Welcome to our Murder Mystery! You are an inspector tasked with solving a murder that occured at a dinner party. You the actions you may need to take are: (examine), (move), (speak), (take), (drop), (use), (go), (look around), (look closer) and (solve).\n`;

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
    playMain();
  }
}


async function playMain() {
 
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("examine") && (inputArr.includes("body"))) {
    console.log(body.desc)
    playMain();
  }
  else if (inputArr.includes("move") && inputArr.includes("body")) {
    console.log(body.extraDesc);
    playMain();
  }
  else if (inputArr.includes("speak") && inputArr.includes("green")) {
    console.log(green.dialogOne);

    if (!player.hasSpokenTo.includes("green")) {
      player.hasSpokenTo.push("green");
      console.log(player.hasSpokenTo);
    }
    playMain();
  }
  else if (inputArr.includes("go") && inputArr.includes("dining")) {
    console.log(diningMessage)
    playDining();
  } 

  else if (inputArr.includes("take")) {
    
  }

  else if (inputArr.includes("drop")) {

  }

  else if (inputArr.includes("use")) {

  }

  else if (inputArr.includes("look around")) {
    
  }

  else if (inputArr.includes("look closer")) {
    
  }

  else if (inputArr.includes("solve")) {
    
  }
  
  else {
    console.log(`I don't understand what you want and/or you can't do that in this room...`)
    playMain();
  }
}

async function playDining() {
  
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && (inputArr.includes("cook"))) {
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
