console.log("Hello from Setup!")
//game variables
const gameOverSound = new Audio("../assets/sounds/super-mario-death-sound-sound-effect.mp3");
const music = new Audio("../assets/sounds/Super_Mario_Bros_Theme_Song_(getmp3.pro).mp3");
      music.loop = true;
      music.volume = 1.0;
const debugModeIsOn = false;
const startKey = " ";
const restartKey = " ";
const hitboxColor = "rgb(28, 141, 253)";
const destructionXPosition = -1000;
const spawnXPosition = canvas.width * 1.2
let gameState = "menu"; // menu, action or gameover

// bird variables
const birdImage = new Image(90, 90);
      birdImage.src = "../assets/images/Mario.png";
const birdStartYPosition = 250;
const birdStartYSpeed = 0;
const birdStartYAccelleration = 0;
const birdBeginningYAccelleration = 0.3;
const birdXPosition = 250;
const birdHitboxRadius = 30;
const birdFlapSound = new Audio("../assets/sounds/smw_jump.wav")
const birdFlapForce = -8;
const birdFlapKey = " ";
let birdYSpeed = birdStartYSpeed;
let birdYAccelleration = birdStartYAccelleration;
let birdYPosition = birdStartYPosition;
let birdCanFlap = false;


// score variables
const scoreImage = new Image(60, 60);
      scoreImage.src = "../assets/images/Mariocoin.png";
const scoreImageXPosition = 70;
const scoreImageYPosition = 70;
const scoreTextXPosition = 100;
const scoreTextYPosition = 90;
const scoreTextSize = 50;
const scoreTextColor = "yellow";
let scoreValue = 0;

// cloud variables
const cloudImage = new Image(200, 200);
      cloudImage.src = "../assets/images/cloud.png";
const cloudSpawnInterval = 3000; // milliseconds
const cloudXSpeed = -.7;
let cloudTimeSinceLastSpawn = 0; // milliseconds
let clouds = [
    {
        xPosition: canvas.width,
        yPosition: randomBetween(0, canvas.height/2), 
    },
    {
        xPosition: canvas.width -500,
        yPosition: randomBetween(0, canvas.height/2), 
    },
    {
        xPosition: canvas.width-1000,
        yPosition: randomBetween(0, canvas.height/2), 
    },
];

// fireball variables
const fireballImage = new Image(350, 350);
      fireballImage.src = "../assets/images/fireball.png";
const fireballXSpeed = -5.5;
const fireballHitboxRadius = 140;
const fireballSpawnInterval = 2000;
let fireballTimeSinceLastSpawn = fireballSpawnInterval;
let fireballs = [];

// bowser variables
const bowserSound = new Audio("../assets/sounds/bowser_5.wav");
const bowserImage = new Image(350, 350);
      bowserImage.src = "../assets/images/Bowser.png";
const bowserXSpeed = -20.5;
const bowserHitboxRadius = 150;
const bowserSpawnInterval = 4000;
let bowserTimeSinceLastSpawn = bowserSpawnInterval;
let bowsers = [];

// coin variables
const coinSound = new Audio("../assets/sounds/smw_coin.wav");
const coinImage = scoreImage;
const coinHitboxRadius = 30;
const coinXSpeed = -5;
const coinSpawnInterval = 1000;
const coinValue = 1;
let coinTimeSinceLastSpawn = coinSpawnInterval
let coins = [];

// diamond variables
const diamondSound = coinSound;
const diamondImage = new Image(60, 60);
      diamondImage.src = "../assets/images/diamond 1.png";
const diamondHitboxRadius = 30;
const diamondXSpeed = -5;
const diamondSpawnInterval = 1000;
const diamondValue = 5;
let diamondTimeSinceLastSpawn = diamondSpawnInterval;
let diamondXPosition = canvas.width
let diamondYPosition = randomBetween(0, canvas.height);
let diamonds = [];

// Udiamond variables
const UdiamondSound = coinSound;
const UdiamondImage = new Image(60, 60);
      UdiamondImage.src = "../assets/images/Udiamond.png";
const UdiamondHitboxRadius = 30;
const UdiamondXSpeed = -10;
const UdiamondSpawnInterval = 5000;
const UdiamondValue = 50;
let UdiamondTimeSinceLastSpawn = coinSpawnInterval;
let UdiamondXPosition = canvas.width
let UdiamondYPosition = randomBetween(0, canvas.height);
let Udiamonds = [];

// menu text variables
const menuFirstText = "Press" + startKey + "space to start";
const menuTextXPosition = 300;
const menuTextYPosition = 400; 
const menuSecondText = "Press space to flap wings";
const menuTextSize = 60;
const menuTextColor = "yellow";
const gameOverText = "Press" + restartKey + "space to restart";