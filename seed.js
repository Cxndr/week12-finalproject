import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const emptyAllTables = async () => {
  try {
    await db.query("BEGIN");

    // await db.query("TRUNCATE TABLE wg_users RESTART IDENTITY CASCADE");
    // await db.query("TRUNCATE TABLE wg_prompts RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE wg_posts RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE wg_words RESTART IDENTITY CASCADE");
    await db.query("TRUNCATE wg_filler_words RESTART IDENTITY CASCADE");

    await db.query("COMMIT");
    console.log("All tables have been emptied.");
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error emptying tables:", error);
  }
};

const baseWordList = [
  "wiggle", "bamboozle", "marshmallow", "zany", "flop", "gobble", "squawk", "sizzle", "bonkers", "giggle", "slippery", "doodle", "jiggle", "pudding", "wobble", "clunky", "muggle", "splat", "goof", "snuggle", "quack", "bumblebee",   "zipper", "flabbergasted", "funky", "tickle", "jellybean", "dingbat", "smush", "wacky", "noodle", "twinkle",   "jumble", "pipsqueak", "wigwam", "fizzle", "kooky", "bloop", "boogie", "quirky", "snazzy", "yodel", "sprinkle",   "gooey", "scribble", "tater", "popcorn", "bizarre", "gigantic", "sparkle", "chuckle", "cluck", "blimp", "jolly",  "gurgle", "bubble", "guffaw", "munchkin", "whammy", "puff", "mellow", "drizzle", "jabber", "loopy", "fling",   "fuzzy", "swish", "blip", "goober", "bumble", "bungle", "chomp", "kablooey", "glop", "crinkle", "dippy",   "peppy", "burp", "zing", "floofy", "razzle", "tattle", "fluffy", "hoot", "gobbledygook", "plunge", "flap",   "yucky", "crumb", "blob", "tricky", "boggle", "twiddle", "ticklish", "splodge", "squirm", "chirp", "bonanza",   "fiddle", "splash", "blabber", "rumble", "prickle", "splatter", "splish", "zoom", "jelly", "flop", "goofball",   "fluff", "blur", "zippy", "nudge", "gabble", "gaggle", "twang", "shimmy", "zip", "cheesy", "swoop", "slink",   "giddy", "hula", "whoosh", "dizzy", "clomp", "scrunch", "poodle", "gurgle", "swizzle", "dabble", "jitterbug",   "waddle", "muddle", "flapjack", "bubbly", "piddle", "scramble", "pounce", "gobstopper", "swish", "doohickey",   "fritter", "hodgepodge", "shamble", "tick", "plunk", "lickety", "pumpernickel", "loaf", "sneak", "booger",   "clammy", "zonk", "yippee", "cackle", "oozing", "goopy", "quibble", "humdinger", "razz", "twaddle", "fluff",   "toodle", "chortle", "jittery", "shmooze", "tingle", "wiggly", "gibber", "trundle", "wibble", "grumble",   "skedaddle", "squeeze", "slobber", "rattle", "sprinkle", "curly", "piddle", "fumble", "glitch", "blustery",   "tippy", "tizzy", "whisk", "jangle", "frizzle", "zappy", "scoot", "frump", "quip", "schmaltz", "stumble",   "squabble", "nuzzle", "buzz", "whopper", "boink", "frumpy", "knickknack", "floppy", "snooze", "clatter",   "pirate", "alien", "pizza", "glitter", "dance", "cat", "robot", "sleep", "spaceship", "lava", "nap", "shark",   "volcano", "coffee", "dog", "moon", "banana", "unicorn", "secret", "potato", "lost", "angry", "glue", "cheese", "cake", "dinosaur", "stinky", "time", "magic", "fart", "sleepy", "snail", "cloud", "button", "jelly", "phone", 
  "couch", "tired", "panic", "whisper", "noise", "chicken", "sock", "bubbles", "dragon", "sandwich", "juggle",   "mystery", "adventure", "tiny", "loud", "monster", "wild", "confetti", "giraffe", "slime", "chocolate", "parrot",   "balloon", "spaghetti", "race", "spider", "ninja", "wizard", "explosion", "pirate ship", "treasure", "alarm",   "frog", "castle", "cupcake", "confused", "invisible", "boring", "fast", "sticky", "whistle", "crayon", "pancakes",   "clumsy", "toothbrush", "fortune", "fish", "fork", "squishy", "cloudy", "disco", "zombie", "rocket", "quiet",   "freeze", "train", "crocodile", "sneeze", "pirate hat", "squirrel", "fluffy", "kangaroo", "jellyfish", "underwear", "mud", "trampoline", "hug", "bagel", "sparkle", "surprise", "ice cream", "feather", "umbrella", "waffle",   "ice", "cactus", "traffic", "bubblegum", "confuse", "rollercoaster", "croissant", "burger", "clown", "lightning", "puzzle", "popsicle", "lobster", "screaming", "pants", "surfboard", "candy", "penguin", "submarine", "helicopter", "owl", "vacuum", "beach", "donut", "cereal", "plunger", "pirate flag", "spacesuit", "tornado", "yo-yo", "butter",   "mustache", "thunder", "toast", "sunglasses", "pillow", "superhero", "basket", "mustard", "fireworks", "cucumber", "snowman", "blanket", "snowball", "sloth", "frisbee", "beep", "grapes", "mountain", "turkey", "pray", "smooth", "betrayal", "rock", "require", "torment", "kingdom", "devil", "whip", "argue", "attain", "basic", "grand", "test", "behind", "show", "lucky", "oppose", "stab", "crisis", "run", "jump", "swim", "fly", "write", "read", "paint", "draw", "climb", "drive", "play", "sing", "dance", "laugh", "smile", "think", "dream", "hope", "believe", "grow", "shine", "wander", "explore", "study",   "learn", "teach", "share", "build", "create", "invent", "cook", "bake", "ride", "travel", "plan",   "organize", "listen", "hear", "see", "watch", "observe", "notice", "understand", "remember", "forget",   "start", "stop", "begin", "end", "continue", "try", "complete", "move", "stay", "wait", "rest", "recover",   "imagine", "wish", "promise", "help", "serve", "protect", "guide", "support", "care", "love", "hate", "follow", "lead", "inspire", "connect", "disconnect", "engage", "choose", "decide", "prepare", "finish",   "admit", "deny", "consider", "explain", "express", "describe", "ask", "answer", "propose", "suggest",   "defend", "attack", "reach", "miss", "find", "lose", "search", "discover", "provide", "receive"
];

const fillerWordList = [
  "an", "this", "that", "these", "those", "my", "your", "its", "our", "their", 
  "in", "is", "to", "more", "no", "or", "but", "so", "if", "then", "because", "since", "while", 
  "although", "though", "even", "as", "for", "nor", "yet", 
  "with", "without", "by", "from", "over", "under", 
  "on", "at", "of", "off", "into", "onto", "upon", "about", 
  "up", "down", "before", "after", "between", "among", 
  "either", "neither", "both", "whether", "until", "unless", 
  "where", "when", "who", "whom", "whose", "which", "what", 
  "not", "like", "unlike", "near", "far", "beyond", "within", 
  "each", "every", "any", "some", "all", "few", "many", "most", 
  "such", "only", "just", "quite", "rather", "also", "are", "their", "they", "can", "cannot",
];

const insertInChunks = async (table, wordList, chunkSize = 1000) => {
  for (let i = 0; i < wordList.length; i += chunkSize) {
    const chunk = wordList.slice(i, i + chunkSize);
    const values = chunk.map((_, idx) => `($${idx + 1})`).join(", ");
    const query = `
      INSERT INTO ${table} (word) VALUES ${values}
      ON CONFLICT (word) DO NOTHING;
    `;
    await db.query(query, chunk);
  }
};

const fillWithWords = async () => {
  try {
    await db.query("BEGIN");
    await insertInChunks("wg_words", baseWordList);
    await insertInChunks("wg_filler_words", fillerWordList);
    await db.query("COMMIT");
    console.log("Database seeded successfully.");
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error seeding database:", error);
  }
};


await emptyAllTables();
fillWithWords();
