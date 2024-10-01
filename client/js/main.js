//global vars
var game;

//Game Dimensions
var gameWidth = 1400;
var gameHeight = 720;
//var gameWidth = window.innerWidth* window.devicePixelRatio * .75;
//var gameHeight = window.innerHeight * window.devicePixelRatio * .8;


//Config variables
var adminConfig;
var bonusTableData;
var acesPlusData;
var blindBonusTableData;
var wheelAdminConfig;
var wheelTableData;

//Chip Index Array - used to find chip value on chip array
var chipIndexArray = [];
chipIndexArray[0] = 1;
chipIndexArray[1] = 2;
chipIndexArray[2] = 5;
chipIndexArray[3] = 10;
chipIndexArray[4] = 20;
chipIndexArray[5] = 25;
chipIndexArray[6] = 50;
chipIndexArray[7] = 100;
chipIndexArray[8] = 250;
chipIndexArray[9] = 500;
chipIndexArray[10] = 1000;
chipIndexArray[11] = 2000;
chipIndexArray[12] = 5000;

//Sound variables
var shuffle;
var deal;
var cardflip;
var cardslide;
var bet;
var win;
var push;
var lose;
var spin;
var bonuswin;

//Data capture variables
var storeDealerCards = [];
var storePlayerCards = [];
var storeDealerHand = [];
var storePlayerHand = [];
var storePlayerHandRank;
var storeDealerHandRank;
var storeAttackBonusRank;
var storeHeartsCardBonusRank;
var storeHeartsPlusBonusRank;

//when the page loads initialize Phaser and gamestates
window.onload = function() {

  game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'gameDiv');

  game.state.add('boot', bootState);
  game.state.add('load', loadState);
  game.state.add('play', playState);

  game.state.start('boot');
};

function wholeNumber(number) {
  return ( (number - Math.floor(number)) === 0 ) ? true :  false;
}