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
  "\nYou see a beautiful conservatory filled with lots of plants and flowers. There is an orange tree, a bamboo palm and a spider plant. There is also a large cabinet in the far corner.",
  "Orange tree",
  "Bamboo palm",
  "Spider plant",
  "A large cabinet"
);

let ballroom = roomFactory(
  "The Ballroom",
  "\nYou see an expansive ballroom with a parquet floor and a large chandelier hanging in the center.",
  "Chandelier",
  "Table",
  "Column"
);

let library = roomFactory(
  "The Library",
  "\nYou see a large library with many books on the shelf. Nothing much else of interests it seems.",
  "A bookshelf",
  "A fireplace",
  "A sofa"
);

let hall = roomFactory(
  "The Hall",
  "\nYou see the foyer of the house that contains a bench and a long hallway runner.",
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
  "\nAn ordinary magnifying glass used to look closer.",
  true,
  ""
);

// Kitchen inventory ///////////////////////////////////////////////////////////////////////////////

let fryingPan = new Item(
  "Pan",
  "\nAn ordinary frying pan. Maybe you could cook up some eggs with it.",
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

let studyDesk = new Item(
  "A Desk",
  "\nA sturdy wooden desk, worn from years of use. Perfect for studying!",
  false,
  () => {
    console.log(
      "\nGrabbing a book on phytology, you sit at the desk and study up on the magical wonders of photosynthesis. 10 minutes later you know everything there is to know about plants. Back to investigating!"
    );
  }
);

let studyCouch = new Item(
  "A couch",
  "\nA nice Victorian-style couch upon which Mr. Green and Mrs. White currently sit.",
  false,
  () => {
    console.log(
      '\nWithout warning, you turn around and, interrupting their conversation, attempt to squeeze in with Mr. Green and Mrs. White on what is clearly a two-person couch. Following some initial grunts of suprise and discomfort, the room falls into an awkward silence. A moment passes and Mrs. White can bear it no longer, prompting her to comment that "perhaps the couch is not quite long enough to fit three people". Embarassed, you offer a quick apology and remove yourself from the couch. Your acquiantances eye you with a mix of confusion and suspicion before returning to their conversation.'
    );
  }
);

let studyChair = new Item(
  "A chair",
  "\nA cushy Victorian-style chair. Perhaps you could have a sit.",
  false,
  () => {
    console.log(
      "\nSitting down in the chair, you soon realize that despite it's Victorian flourishes, it is quite uncomfortable. Furthermore, Mr. Green and Mrs. White are clearly growing uncomfortable that you are just sitting there observing them from across the room. Best to get back to the mission."
    );
  }
);

// Dining Room inventory ///////////////////////////////////////////////////////////////////////////

let diningTable = new Item(
  "Dining Table",
  "\nA beautiful banquet dining table that seats 14.",
  false,
  () => {
    console.log(
      "\n'What a grand table' you murmer as you walk alongside it, running your hand across the exquisitely embroidered tablecloth that runs it's length. 'Ahem.' the cook grumbles. 'I believe you were brought here to solve a murder, not to marvel at the scenery.' You pause, raising an eyebrow. This cook really seems to be in a mood... perhaps it would be good to talk to him."
    );
  }
);

let diningChair = new Item(
  "Dining chair",
  "\nAn empty dining chair next to Miss Scarlet and the cook. Perhaps you could have a sit.",
  false,
  () => {
    console.log(
      "\nSitting down into the dining chair, you imagine a feast commencing before your eyes. What spectacular meals must have graced this banquet table? What intoxicating smells perfumed this dining room air? Visions of roasted duck and crusted country pasties consume you. Oatcake with honeycomb and flowers, tender freshwater shrimp garnished with cream and rose leaves, hazlenut bread and devilled barley pearls in acorn puree... oh, the ecstacy! OH THE ECSTA- 'What in the world are you going on about?!' Screams the cook, looking quite annoyed. You realize that at some point during your daydream you began speaking out loud. Yikes. Best leave this siren of a dining chair and get back to work..."
    );
  }
);

// Lounge inventory ////////////////////////////////////////////////////////////////////////////////

let loungeChaise = new Item(
  "Chaise lounge",
  "\nAn elegant left arm chaise lounge",
  false,
  () => {
    console.log(
      "\nLeaning back into the lounge, your mind begins to drift as eyes examine the painted ceiling of the room. It depicts a lovely scene of clouds and angels, floating along a dreamy backdrop baby blue swirls. You can almost make out little stars twinkling in the distance, suggesting even greater depth to the sky above. What secrets lie beyond the lofty heights? What mysteries live cloaked among the clouds? Hmmmm, but an even greater mystery remains waiting to be solved right here on the ground, and daylight is burning. Carpe diem!"
    );
  }
);

let loungeChair = new Item(
  "Lounge chair",
  "\nA chair. In a lounge.",
  false,
  () => {
    console.log(
      "\nYou take a seat in the chair. To your dismay, you find it to be quite uncomfortable. That chaise lounge across the room, however... that looks quite nice..."
    );
  }
);

let loungeBarCart = new Item("Bar cart", "A 3-tier bar cart", false, () => {
  console.log(
    "\nWell well well! A cart filled with nothing but the finest spirits, beers, and wines! What shall you have? A little hot toddy to take the edge off? A negroni, pour vous? You are tempted, very tempted... but with options this tasty you risk compormising your focus. You must remain sharp! Who knows when the next clue will arise? And besides, there IS still a murderer in the house with a strong motive to see you dead... yes, best keep your wits about you. Maybe you'll return to the cart AFTER this is finished."
  );
});

// Conservatory inventory //////////////////////////////////////////////////////////////////////////

let orangeTree = new Item("Orange tree", "An orange tree", false, () => {
  console.log(
    "\nLooking both ways to make sure you aren't being watched, you determine you are alone. You pluck an orange, and damn - this is one seriously fresh orange! Minutes later, and you've finished the whole thing. But where to discard the peel?"
  );
});

let bambooPalm = new Item("Bamboo palm", "A bamboo palm", false, () => {
  console.log("\nJust a bamboo palm. Nice.");
});

let spiderPlant = new Item("Spider plant", "A spider plant", false, () => {
  console.log(
    "\nAh, the humble spider plant: known to purify air more effectively than any other household plant. Nothing particularly distinct about this one, though."
  );
});

// Ballroom inventory //////////////////////////////////////////////////////////////////////////

let chandelier = new Item("Chandelier", "A chandelier", false, () => { 
  console.log(
    "\nWhat is my perfect crime? I break into Tiffany's at midnight. Do I go for the vault? No, I go for the chandelier. It's priceless. As I'm taking it down, a woman catches me. She tells me to stop. It's her father's business. She's Tiffany. I say no. We make love all night. In the morning, the cops come and I escape in one of their uniforms. I tell her to meet me in Mexico, but I go to Canada. I don't trust her. Besides, I like the cold. Thirty years later, I get a postcard. I have a son and he's the chief of police. This is where the story gets interesting. I tell Tiffany to meet me in Paris by the Trocadero. She's been waiting for me all these years. She's never taken another lover. I don't care. I don't show up. I go to Berlin. That's where I stashed the chandelier."
  );
});

let ballroomTable = new Item("Ballroom table", "A ballroom table", false, () => {
  console.log(
    "\nJust a round table for holding drinks. Not much to see here. And who sits down at a ball anyway?"
  );
});

let column = new Item("Column", "A column", false, () => {
  console.log(
    "\nA stately column. Magnifique!"
  );
});

// Library inventory /////////////////////////////////////////////////////////////////////////////

let libBookshelf = new Item("Bookshelf", "A bookshelf", false, () => {
  console.log(
    "\nA large and ancient bookshelf, filled with numerous volumes of books, games, and little treasures."
  )
});

let libFireplace = new Item("Fireplace", "A fireplace", false, () => {
  console.log(
    "\nA warm, crackling fireplace. Who knows who's been feeding the fire, but it's orange glow illuminates the book case and casts all sorts of furtive shadows across an otherwise dark room (no windows, poor design, really)."
  );
});

let libSofa = new Item("Sofa", "A sofa", false, () => {
  console.log(
    "\nA clubby, tufted leather Chesterfield. Though well worn from ages of use, it's a handsome sofa that strikes a bold silhouette and commands respect. Situated across from the fire, it would be a lovely place to read or take a nap."
  );
});

const studyMessage = "\nYou have entered the study.";

const billiardMessage = "\nYou have entered the billiard room.";

// Dialog assignments ////////////////////////////////////////////////////////////////////////////

green.dialogOne = `\n"We were all enjoying some good after dinner conversation when the power in the house went out and then the lights came back on we heard a scream from the kitchen. When we all rushed in we discovered Mr. Body dead on the floor. Miss Scarlet was the first one to discover the body. She's pretty broken up about it. My cook is currently in the dining room with her consoling her. Maybe you should go speak to her."`;

scarlet.dialogOne = `\nShe lifts her head up from the table, still sobbing, to meet your eyes. Through a stream of tears she explains to you that when the lights went out she heard a thud in the kitchen and when the lights came back on she went to the kitchen to see what the commotion was about only to discover Mr. Body lying dead on the floor in a pool of his own blood.`;

cook.dialogOne = `\n"Hello, inspector. What a horrible thing that has happened." You notice what appears to be a few drops of blood on his apron. Curious.`;

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
    console.log(diningRoom.desc);
    playDining();
  } else if (inputArr.includes("go") && inputArr.includes("conservatory")) {
    player.location = "The Conservatory";
    console.log(conservatory.desc);
    playConservatory();
  } else if (inputArr.includes("go") && inputArr.includes("library")) {
    player.location = "The Library";
    console.log(library.desc);
    playLibrary();
  } else if (inputArr.includes("go") && inputArr.includes("study")) {
    player.location = "The Study";
    console.log(study.desc);
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
    console.log(
      "\n" + diningRoom.desc + " Items include: " + diningRoom.inventory
    );
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
        `You gather everyone in the Conservatory to make your final statement. "I conclude that Mr. Green is the murderer, by way of the cook! Mr. Green took a billiard ball from the billiard room and ordered the cook to murder Mr. Body with it because Mr. Body was an investigative journalist working on a story that threatened to expose the fact that Mr. Green is a collector of priceless stolen artwork!"`
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

  if (inputArr.includes("speak") && inputArr.includes("green")) {
  }
}

async function playBilliardRoom() {
  let input = await ask("\n>_ ");
  let inputArr = input.toLowerCase().split(" ");
}

// Launching game ////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

start();
