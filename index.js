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


let roomFactory = (name, desc, ...args) => {
  inventory = [args]
  return {name, desc, inventory}
};

let kitchen = roomFactory("The Kitchen", "Frying Pan", "Body");

let study = roomFactory("The Study", "A desk", "A couch", "A chair");

let diningRoom = roomFactory("The Dining Room", "Dining Table", "An empty chair");

let billiardRoom = roomFactory("The Billiard Room", "Billiard Table", "Billiard Balls", "Pool Cue");

let lounge = roomFactory("The Lounge", "A chaise lounge", "A chair", "Bar cart");

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

let magnifyingGlass = new Item('A Magnifying Glass', 'An ordinary magnifying glass used to look closer.', true, '');
// Kitchen inventory ///////////////////////////////////////////////////////////////////////////////

let fryingPan = new Item('Frying Pan', 'An ordinary frying pan. Maybe you could cook up some eggs with it.', true, () => {if (player.location === "The Kitchen") {console.log('You fry up some delicious eggs. Now back to the matter at hand!')}});

let deadBody = new Item('The Body', "The body of Mr. Body lies on his back, lifeless on the kitchen floor. A pool of blood surrounds his head.", false, () => {console.log(`You roll over the body to find a note pad partially sticking out of Mr. Body's back pocket...`});


// Study inventory /////////////////////////////////////////////////////////////////////////////////

let studyDesk = new Item("A Desk", "A sturdy wooden desk, worn from years of use. Perfect for studying!", false, () => { console.log('Grabbing a book on phytology, you sit at the desk and study up on the magical wonders of photosynthesis. 10 minutes later you know everything there is to know about plants. Back to investigating!');});

let studyCouch = new Item('A couch', "A nice Victorian-style couch upon which Mr. Green and Mrs. White currently sit.", false, () => { console.log('Without warning, you turn around and, interrupting their conversation, attempt to squeeze in with Mr. Green and Mrs. White on what is clearly a two-person couch. Following some initial grunts of suprise and discomfort, the room falls into an awkward silence. A moment passes and Mrs. White can bear it no longer, prompting her to comment that "perhaps the couch is not quite long enough to fit three people". Embarassed, you offer a quick apology and remove yourself from the couch. Your acquiantances eye you with a mix of confusion and suspicion before returning to their conversation.')});

let studyChair = new Item('A chair', "A cushy Victorian-style chair. Perhaps you could have a sit.", false, () => {console.log("Sitting down in the chair, you soon realize that despite it\'s Victorian flourishes, it is quite uncomfortable. Furthermore, Mr. Green and Mrs. White are clearly growing uncomfortable that you are just sitting there observing them from across the room. Best to get back to the mission.")});

// Dining Room inventory ///////////////////////////////////////////////////////////////////////////

let diningTable = new Item('Dining Table', "A beautiful banquet dining table that seats 14.", false, () => { console.log("'What a grand table' you murmer as you walk alongside it, running your hand across the exquisitely embroidered tablecloth that runs it\'s length. 'Ahem.' the cook grumbles. 'I believe you were brought here to solve a murder, not to marvel at the scenery.' You pause, raising an eyebrow. This cook really seems to be in a mood... perhaps it would be good to talk to him.")});

let diningChair = new Item('Dining chair', "An empty dining chair next to Miss Scarlet and the cook. Perhaps you could have a sit.", false, () => { console.log("Sitting down into the dining chair, you imagine a feast commencing before your eyes. What spectacular meals must have graced this banquet table? What intoxicating smells perfumed this dining room air? Visions of roasted duck and crusted country pasties consume you. Oatcake with honeycomb and flowers, tender freshwater shrimp garnished with cream and rose leaves, hazlenut bread and devilled barley pearls in acorn puree... oh, the ecstacy! OH THE ECSTA- 'What in the world are you going on about?!' Screams the cook, looking quite annoyed. You realize that at some point during your daydream you began speaking out loud. Yikes. Best leave this siren of a dining chair and get back to work...")} );

// Lounge inventory ////////////////////////////////////////////////////////////////////////////////

let loungeChaise = new Item('Chaise lounge', 'An elegant left arm chaise lounge', false, () => { console.log("Leaning back into the lounge, your mind begins to drift as eyes examine the painted ceiling of the room. It depicts a lovely scene of clouds and angels, floating along a dreamy backdrop baby blue swirls. You can almost make out little stars twinkling in the distance, suggesting even greater depth to the sky above. What secrets lie beyond the lofty heights? What mysteries live cloaked among the clouds? Hmmmm, but an even greater mystery remains waiting to be solved right here on the ground, and daylight is burning. Carpe diem!")});

let loungeChair = new Item("Lounge chair", "A chair. In a lounge.", false, () => { console.log("You take a seat in the chair. To your dismay, you find it to be quite uncomfortable. That chaise lounge across the room, however... that looks quite nice...")});

let loungeBarCart = new Item("Bar cart", "A 3-tier bar cart", false, () => { console.log("Well well well! A cart filled with nothing but the finest spirits, beers, and wines! What shall you have? A little hot toddy to take the edge off? A negroni, pour vous? You are tempted, very tempted... but with options this tasty you risk compormising your focus. You must remain sharp! Who knows when the next clue will arise? And besides, there IS still a murderer in the house with a strong motive to see you dead... yes, best keep your wits about you. Maybe you\'ll return to the cart AFTER this is finished.")});

// Conservatory inventory //////////////////////////////////////////////////////////////////////////

let orangeTree = new Item("Orange tree", "An orange tree", false, () => { console.log("Looking both ways to make sure you aren't being watched, you determine you are alone. You pluck an orange, and damn - this is one seriously fresh orange! Minutes later, and you've finished the whole thing. But where to discard the peel?")})

let bambooPalm = new Item("Bamboo palm", "A bamboo palm", false, () => { console.log("Just a bamboo palm. Nice.")})

let spiderPlant = new Item("Spider plant", "A spider plant", false, () => { console.log("Ah, the humble spider plant: known to purify air more effectively than any other household plant. Nothing particularly distinct about this one, though.")});

// Ballroom inventory //////////////////////////////////////////////////////////////////////////

let chandelier = new Item()

let ballroomTable = new Item()

let column = new Item()

// Library inventory //////////////////////////////////////////////////////////////////////////

let libBookshelf = new Item()

let libFireplace = new Item()

let libSofa = new Item()

// Hall inventory //////////////////////////////////////////////////////////////////////////

let hallPiano = new Item()

let hallChandelier = new Item()

let hallColumn = new Item()




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
