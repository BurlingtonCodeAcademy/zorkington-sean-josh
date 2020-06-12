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
  hasMoved: false,
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
  return { name, location };
};

let green = characterFactory("Mr. Green", "Kitchen");

let mustard = characterFactory("Colonel Mustard", "Lounge");

let scarlet = characterFactory("Miss Scarlet", "Dining Room");

let peacock = characterFactory("Mrs. Peacock", "Lounge");

let plum = characterFactory("Professor Plum", "Library");

let body = characterFactory("Mr. Body", "Kitchen");

let white = characterFactory("Mrs. White", "Study");

let cook = characterFactory("The Cook", "Kitchen");

let roomFactory = (name, desc, ...args) => {
  inventory = [args];
  return { name, desc, inventory };
};

let kitchen = roomFactory(
  "The Kitchen",
  "You see a beautiful kitchen with many appliances including a nice stove.",
  "Frying Pan",
  "Body",
  "Stove"
);

let study = roomFactory(
  "The Study",
  "You see a beautiful mahogany-lined room with a couch upon which Mr. Green and Mrs. White currently sit.",
  "A desk",
  "A couch",
  "A chair"
);

let diningRoom = roomFactory(
  "The Dining Room",
  "You see a large Dining Room with a table and chairs, two of which contain Miss Scarlet and the cook.",
  "Dining Table",
  "An empty chair"
);

let billiardRoom = roomFactory(
  "The Billiard Room",
  "You see a rich mahogany room with a billiard table at the center",
  "Billiard Table",
  "Billiard Balls",
  "Pool Cue"
);

let lounge = roomFactory(
  "The Lounge",
  "You see a beautifully decorated room with a bar cart, a chair and a couch upon which Colonel Mustard and Mrs. Peacock sit.",
  "A couch",
  "A chair",
  "Bar cart"
);

let conservatory = roomFactory(
  "The Conservatory",
  "You see a beautiful conservatory filled with lots of plants and flowers. There is a large cabinet in the far corner.",
  "Orange tree",
  "Bamboo palm",
  "Spider plant",
  "A large cabinet"
);

let ballroom = roomFactory(
  "The Ballroom",
  "You see an expansive ballroom with a parquet floor and a large chandelier hanging in the center.",
  "Chandelier",
  "Table",
  "Column"
);

let library = roomFactory(
  "The Library",
  "You see a large library with many books on the shelf. Nothing much else of interests it seems.",
  "A bookshelf",
  "A fireplace",
  "A sofa"
);

let hall = roomFactory(
  "The Hall",
  "You see the foyer of the house that contains a bench and a long hallway runner.",
  "A bench",
  "A hallway runner"
);

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

let magnifyingGlass = new Item(
  "A Magnifying Glass",
  "An ordinary magnifying glass used to look closer.",
  true,
  ""
);

// Kitchen inventory ///////////////////////////////////////////////////////////////////////////////

let fryingPan = new Item(
  "Pan",
  "An ordinary frying pan. Maybe you could cook up some eggs with it.",
  true,
  ""
);

let deadBody = new Item(
  "Body",
  "\nThe body of Mr. Body lies on his back, lifeless on the kitchen floor. A pool of blood surrounds his head.",
  false,
  () => {
    console.log(
      `\nYou roll over the body to find a note pad partially sticking out of Mr. Body's back pocket...`
    );
    player.hasMoved = true;
  }
);

let stove = new Item(
  "A Stove",
  "\nA nice gas range used for cooking.",
  false,
  () => {
    if (
      player.location === "The Kitchen" &&
      player.inventory.includes("Frying Pan")
    ) {
      console.log(
        "\nYou fry up some delicious eggs. Now back to the matter at hand!"
      );
    } else {
      console.log("\nYou do not have the required item to use this.");
    }
  }
);

// Study inventory /////////////////////////////////////////////////////////////////////////////////

let studyDesk = new Item("A Desk", false, true, "Just an ordinary desk");

let studyCouch = new Item(
  "A couch",
  false,
  true,
  "\nA nice Victorian-style couch upon which Mr. Green and Mrs. White currently sit."
);

let studyChair = new Item(
  "A chair",
  false,
  true,
  "A cushy Victorian-style chair. Perhaps you could have a sit."
);

// Dining Room inventory ///////////////////////////////////////////////////////////////////////////

let diningTable = new Item(
  "Dining Table",
  false,
  true,
  "A beautiful banquet dining table that seats 14."
);

let diningChair = new Item(
  "Dining chair",
  false,
  true,
  "An empty dining chair next to Miss Scarlet and the cook. Perhaps you could have a sit."
);

const kitchenMessage = "\nYou have entered the kitchen.";

const diningMessage = "\nYou enter the dining room to find Miss Scarlet sobbing and the cook with his arm around her trying to console her. ";

const studyMessage = "\nYou have entered the study.";

const billiardMessage = "\nYou have entered the billiard room.";

green.dialogOne =
  "\nWe were all enjoying some good after dinner conversation when the power in the house went out and then the lights came back on we heard a scream from the kitchen. When we all rushed in we discovered Mr. Body dead on the floor. Miss Scarlet was the first one to discover the body. She's pretty broken up about it. My cook is currently in the [dining room] with her consoling her. Maybe you should go [speak] to her.";

cook.dialogOne = "\nHello inspector. What a horrible thing that has happened.";

// Beginning of function declarations ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

async function start() {
  const welcomeMessage = `\nWelcome to our Murder Mystery! You are an inspector tasked with solving a murder that occured at a dinner party. The actions you may need to take are: (examine), (move), (speak), (take), (drop), (use), (go), (look around), (look closer) and (solve).`;

  console.log(welcomeMessage);
  let getName = await ask(`\nWhat is your name, Inspector? >_`);
  player.name = getName;
  let initialize = await ask(
    `\nIt is a dreary Friday evening in November. You're catching up on some paperwork when the phone rings...\n\n"Good evening, Inspector ${player.name}. My name is Mr. Green and I'm afraid I am in need of your services. I've been hosting a dinner party tonight and one of my guests has been murdered. All of the guests are still here and we've vowed that nobody leaves until we find the killer.\n\nCan you help us?" (y/n) >_`
  );
  if (initialize === "n") {
    process.exit();
  } else if (initialize === "y") {
    player.location = "The Kitchen";

    const arrivalMessage = `\nYou arrive in the kitchen of Mr. Green's mansion to find the body of Mr. Body. Mr. Green looks at your expectantly.`;

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
  } else if (inputArr.includes("move") && inputArr.includes("body")) {
    deadBody.action();
    console.log(body.extraDesc);
    playKitchen();
  } else if (inputArr.includes("speak") && inputArr.includes("green")) {
    console.log(green.dialogOne);

    if (!player.hasSpokenTo.includes("green")) {
      player.hasSpokenTo.push("green");
    }
    playKitchen();
  } else if (inputArr.includes("take") && inputArr.includes("pan")) {
    player.inventory.push("Frying Pan");
    console.log("\nYou have picked up a frying pan.");
    playKitchen();
  } else if (inputArr.includes("use") && inputArr.includes("stove")) {
    stove.action();
    playKitchen();
  } else if (
    inputArr.includes("take") &&
    (inputArr.includes("notepad") || inputArr.includes("pad"))
  ) {
    if (player.hasMoved === true) {
      console.log("\nYou have taken the note pad.");
      player.inventory.push("Mr. Body's note pad");
      playKitchen();
    } else {
      console.log("\nYou do not see any note pad.");
      playKitchen();
    }
  } else if (inputArr.includes("drop") || inputArr.includes("pan")) {
    player.inventory = player.inventory.indexOf("Frying Pan").splice;
    console.log("\nYou have dropped the frying pan.");
    playKitchen();
  } else if (inputArr.includes("go") && inputArr.includes("dining")) {
    player.location = "The Dining Room";
    console.log(diningMessage);
    playDining();
  } else if (inputArr.includes("go") && inputArr.includes("conservatory")) {
    player.location = "The Conservatory";
    console.log(conservatoryMessage);
    playConservatory();
  } else if (inputArr.includes("go") && inputArr.includes("library")) {
    player.location = "The Library";
    console.log(libraryMessage);
    playLibrary();
  } else if (inputArr.includes("go") && inputArr.includes("study")) {
    player.location = "The Study";
    console.log(studyMessage);
    playStudy();
  } else if (inputArr.includes("look") && inputArr.includes("around")) {
    console.log("\n" + kitchen.desc + " Items include: " + kitchen.inventory);
    playKitchen();
  } else {
    console.log(
      `\nI don't understand what you want and/or you can't do that in this room...`
    );
    playKitchen();
  }
}

async function playDining() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("cook")) {
    console.log(cook.dialogOne);
    if (!player.hasSpokenTo.includes("cook")) {
      player.hasSpokenTo.push("cook");
    }
    playDining();
  } else if (inputArr.includes("speak") && inputArr.includes("scarlet")) {
    console.log(scarlet.dialogOne);
    if (!player.hasSpokenTo.includes("scarlet")) {
      player.hasSpokenTo.push("scarlet");
    }
    playDining();
  } else if (inputArr.includes("look") && inputArr.includes("around")) {
    console.log("\n" + diningRoom.desc + " Items include: " + diningRoom.inventory);
    playDining();
  } else if (inputArr.includes("go") && inputArr.includes("kitchen")) {
    player.location = "The Kitchen";
    console.log(kitchenMessage);
    playKitchen();
  } else if (inputArr.includes("go") && inputArr.includes("conservatory")) {
    player.location = "The Conservatory";
    console.log(conservatoryMessage);
    playConservatory();
  } else if (inputArr.includes("go") && inputArr.includes("library")) {
    player.location = "The Library";
    console.log(libraryMessage);
    playLibrary();
  } else if (inputArr.includes("go") && inputArr.includes("study")) {
    player.location = "The Study";
    console.log(studyMessage);
    playStudy();
  } else if (inputArr.includes("go") && inputArr.includes("billiard")) {
    player.location = "The Billiard Room";
    console.log(billiardMessage);
    playBilliardRoom();
  } else {
    console.log(
      `\nI don't understand what you want and/or you can't do that in this room...`
    );
    playKitchen();
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

  if (inputArr.includes("use") && inputArr.includes("key")) {
    if (player.inventory.includes("A key")) {
      console.log(
        "\nYou open the cabinet to reveal a collection of stolen artwork and a billiard ball covered in blood. You pick up the billiard ball. You now have the evidence you need to solve the murder."
      );
      player.inventory.push("A bloody billiard ball");
      playConservatory();
    } else {
      console.log("\nYou do not have a key!");
      playConservatory();
    }
  } else if (inputArr.includes("solve") && inputArr.includes("murder")) {
    if (player.inventory.inclues("A bloody billiard ball")) {
      console.log(
        "I conclude that Mr. Green is the murderer, by way of the cook! Mr. Green took a billiard ball from the billiard room and ordered the cook to murder Mr. Body with it because Mr. Body was an investigative journalist working on a story that threatened to expose the fact that Mr. Green is a collector of priceless stolen artwork!"
      );
      process.exit();
    } else {
      console.log("You lack a piece of evidence to solve the murder!");
      playConservatory();
    }
  } else {
    console.log("I'm sorry I can't do that here or don't know what you want.");
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
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");

  if (inputArr.includes("speak") && inputArr.includes("")) {
  }
}

// Launching game ////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

start();
