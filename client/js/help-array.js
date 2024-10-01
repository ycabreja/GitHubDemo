
var help_item;
var helpTween;

function defineHelp() {
//array of pause states for tutorial
  help_item = [
    {  //helpStepIndex = 0
      boxX: game.width/2 - 305,
      boxY: game.height/2 - 205,
      boxWidth: 650,
      boxHeight: 200,
      label: "TEXAS HOLD'EM - POCKET ACES EDITION",
      labelX: (game.width/2 - 305) + 20, //Box X location plus space
      labelY: (game.height/2 - 205) + 10,  //Box Y location plus space
      label2Show: true,
      label2: "Classic Texas Hold'em with a Pocket\nAces Feature",
      label2X: (game.width/2 - 305) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 205) + 60,
      arrow: false,
      arrowX: 0,
      arrowY: 0,
      arrowAngle: 0,
      arrow2: false,
      arrow2X: 0,
      arrow2Y: 0,
      arrow2Angle: 0,
      continueExists: true,
      continueX: (game.width/2 - 305) + (610 - 93),
      continueY: (game.height/2 - 205) + (200 - 40),
      exitX: (game.width/2 - 305) + (610/2 - 44),
      exitY: (game.height/2 - 205) + (200 - 40),
      previousExists: false,
      previousX: (game.width/2 - 305) + 15,
      previousY: (game.height/2 - 205) + (200 - 40),
      executeDuring: false,
      during: function() {
          return false;
      },
      executeAfter: false,
      after: function() {
          return false;
      }
    },
    {  //helpStepIndex = 1
      boxX: game.width/2 - 360,
      boxY: game.height/2 - 150,
      boxWidth: 580,
      boxHeight: 150,
      label: "Texas Hold'em - Pocket Aces Edition is\nplayed with a 52-card deck.",
      labelX: (game.width/2 - 360) + 10, //Box X location plus space,
      labelY: (game.height/2 - 150) + 10,
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 360) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 150) + 60,
      arrow: false,
      arrowX: game.width/2,
      arrowY: (game.height/2 - 150) + 5,
      arrowAngle: 90,
      arrow2: false,
      arrow2X: 0,
      arrow2Y: 0,
      arrow2Angle: 0,
      continueExists: true,
      continueX: (game.width/2 - 360) + (580 - 93),
      continueY: (game.height/2 - 150) + (150 - 40),
      exitX: (game.width/2 - 360) + (580/2 - 44),
      exitY: (game.height/2 - 150) + (150 - 40),
      previousExists: true,
      previousX: (game.width/2 - 360) + 15,
      previousY: (game.height/2 - 150) + (150 - 40),
      executeDuring: false,
      during: function() {
        return;
      },
      executeAfter: false,
      after: function() {
        return;
      }
    },
    {  //helpStepIndex = 2
      boxX: game.width/2 - 490,
      boxY: game.height/2 - 40,
      boxWidth: 620,
      boxHeight: 180,
      label: "To start, make an Ante wager by dragging\nchips to the Ante betting circle.",
      labelX: (game.width/2 - 490) + 10, //Box X location plus space
      labelY: (game.height/2 - 40) + 10,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 490) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 40) + 10,
      arrow: true,
      arrowX: (game.width/2 - 490) + (620 - 5),
      arrowY: (game.height/2 - 40) + 110,
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 490/2 - 75) + (70),
      arrow2Y: (game.height/2 - 60) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 490) + (620 - 93),
      continueY: (game.height/2 - 40) + (180 - 40),
      exitX: (game.width/2 - 490) + (620/2 - 44),
      exitY: (game.height/2 - 40) + (180 - 40),
      previousExists: true,
      previousX: (game.width/2 - 490) + 15,
      previousY: (game.height/2 - 40) + (180 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    },
    {  //helpStepIndex = 3
      boxX: game.width/2 - 330,
      boxY: game.height/2 - 40,
      boxWidth: 620,
      boxHeight: 180,
      label: "The same wager will be placed on the\nAnte Bonus betting circle.",
      labelX: (game.width/2 - 330) + 10, //Box X location plus space
      labelY: (game.height/2 - 40) + 10,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 330) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 40) + 10,
      arrow: true,
      arrowX: (game.width/2 - 330) + (620 - 5),
      arrowY: (game.height/2 - 40) + 110,
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 330/2 - 75) + (70),
      arrow2Y: (game.height/2 - 60) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 330) + (620 - 93),
      continueY: (game.height/2 - 40) + (180 - 40),
      exitX: (game.width/2 - 330) + (620/2 - 44),
      exitY: (game.height/2 - 40) + (180 - 40),
      previousExists: true,
      previousX: (game.width/2 - 330) + 15,
      previousY: (game.height/2 - 40) + (180 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    },
    {  //helpStepIndex = 4
      boxX: game.width/2 - 340,
      boxY: game.height/2 - 125,
      boxWidth: 520,
      boxHeight: 160,
      label: "Once a chip is placed in the bet area,\nthe bet area will be highlighted.",
      labelX: (game.width/2 - 340) + 10, //Box X location plus space
      labelY: (game.height/2- 125) + (10),  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 340) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 125) + (90),
      arrow: false,
      arrowX: (game.width/2 - 340) + (510 - 5),
      arrowY: (game.height/2 - 125) + (160/2 + 25),
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 340) + (100),
      arrow2Y: (game.height/2 - 125) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 340) + (510 - 93),
      continueY: (game.height/2 - 125) + (160 - 40),
      exitX: (game.width/2 - 340) + (510/2 - 44),
      exitY: (game.height/2 - 125) + (160 - 40),
      previousExists: true,
      previousX: (game.width/2 - 340) + 15,
      previousY: (game.height/2 - 125) + (160 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    },
    {  //helpStepIndex = 5
      boxX: game.width/2 - 400,
      boxY: game.height/2 - 125,
      boxWidth: 580,
      boxHeight: 240,
      label: "You can then send chips to the highlighted\nbet area by double clicking on the chip.",
      labelX: (game.width/2 - 400) + 10, //Box X location plus space
      labelY: (game.height/2 - 125) + (10),  //Box Y location plus space
      label2Show: true,
      label2: "(The bet area can also be highlighted by\nclicking on it.)",
      label2X: (game.width/2 - 400) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 125) + (105),
      arrow: false,
      arrowX: (game.width/2 - 400) + (580 - 5),
      arrowY: (game.height/2 - 125) + (240/2 + 25),
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 400) + (100),
      arrow2Y: (game.height/2 - 125) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 400) + (580 - 93),
      continueY: (game.height/2 - 125) + (240 - 40),
      exitX: (game.width/2 - 400) + (580/2 - 44),
      exitY: (game.height/2 - 125) + (240 - 40),
      previousExists: true,
      previousX: (game.width/2 - 400) + 15,
      previousY: (game.height/2 - 125) + (240 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 6
      boxX: game.width/2 + 50,
      boxY: game.height/2 - 30,
      boxWidth: 440,
      boxHeight: 250,
      label: "Optional bets can be made on\nthe Pocket Aces Plus wager\nand the 5-Card Bonus wager.",
      labelX: (game.width/2 + 50) + 10, //Box X location plus space
      labelY: (game.height/2 - 30) + 70,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 + 50) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 30) + 100,
      arrow: true,
      arrowX: (game.width/2 + 50) + (440/2) - 60,
      arrowY: (game.height/2 - 30) + 5,
      arrowAngle: 90,
      arrow2: true,
      arrow2X: (game.width/2 + 50) + (440/2) + 110,
      arrow2Y: (game.height/2 - 30) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 + 50) +(440 - 93),
      continueY: (game.height/2 - 30) + (250 - 40),
      exitX: (game.width/2 + 50) + (440/2 - 44),
      exitY: (game.height/2 - 30) + (250 - 40),
      previousExists: true,
      previousX: (game.width/2 + 50) + 15,
      previousY: (game.height/2 - 30) + (250 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 7
      boxX: 25,
      boxY: game.height/2 - 165,
      boxWidth: 470,
      boxHeight: 230,
      label: "Hit the \"Deal\" button.",
      labelX: (25) + 10,
      labelY: (game.height/2 - 165) + 10 ,  //Box Y plus space
      label2Show: true,
      label2: "You and the dealer will each be\ndealt 2 cards.",
      label2X: (25) + 10,  //Box X plus space
      label2Y: (game.height/2 - 165) + (70),
      arrow: true,
      arrowX: (25) + (470 - 5) - 15,
      arrowY: (game.height/2 - 165) + 5,
      arrowAngle: 90,
      arrow2: true,
      arrow2X: (25) + (470 - 55) - 15,
      arrow2Y: (game.height/2 - 165) + (230 - 5),
      arrow2Angle: 270,
      continueExists: true,
      continueX: (25) + (193),
      continueY: (game.height/2 - 165) + 230 - 40, //Box Y plus box height minus space,
      exitX: (25) + (103),
      exitY: (game.height/2 - 165) + 230 - 40, //Box Y plus box height minus space
      previousExists: true,
      previousX: (25) + (10),
      previousY: (game.height/2 - 165) + 230 - 40,
      executeDuring: false,
      during: function() {
          return false;
      },
      executeAfter: false,
      after: function() {
          return false;
      }
    },
    {  //helpStepIndex = 8
      boxX: game.width/2 - 480,
      boxY: game.height/2 - 280,
      boxWidth: 650,
      boxHeight: 150,
      label: "5 cards will be dealt to the community area.",
      labelX: (game.width/2 - 480) + 10, //Box X location plus space,
      labelY: (game.height/2 - 280) + 60,
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 480) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 280) + 60,
      arrow: true,
      arrowX: (game.width/2 - 480) + 650/3,
      arrowY: (game.height/2 - 280) + (150 - 5),
      arrowAngle: -90,
      arrow2: false,
      arrow2X: 0,
      arrow2Y: 0,
      arrow2Angle: 0,
      continueExists: true,
      continueX: (game.width/2 - 480) + (650 - 93),
      continueY: (game.height/2 - 280) + 10,
      exitX: (game.width/2 - 480) + (650/2 - 44),
      exitY: (game.height/2 - 280) + 10,
      previousExists: true,
      previousX: (game.width/2 - 480) + 15,
      previousY: (game.height/2 - 280) + 10,
      executeDuring: true,
      during: function() {
        return false;
      },
      executeAfter: true,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 9
      boxX: game.width/2 - 490,
      boxY: game.height/2 - 220,
      boxWidth: 640,
      boxHeight: 270,
      label: "Your 2 cards will be turned over.",
      labelX: (game.width/2 - 490) + 10, //Box X location plus space
      labelY: (game.height/2 - 220) + (240/2 - 60),  //Box Y location plus space
      label2Show: true,
      label2: "You will be given the option to wager 3X or 4X\nyour Ante.  Or you can choose to \"Check\".",
      label2X: (game.width/2 - 490) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 220) + 100,
      arrow: false,
      arrowX: (game.width/2 - 490) + (90),
      arrowY: (game.height/2 - 220) + (240 - 5),
      arrowAngle: -90,
      arrow2: false,
      arrow2X: (game.width/2 - 490) + (145),
      arrow2Y: (game.height/2 - 220) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 490) + (440 - 93),
      continueY: (game.height/2 - 220) + (10),
      exitX: (game.width/2 - 490) + (440/2 - 44),
      exitY: (game.height/2 - 220) + (10),
      previousExists: true,
      previousX: (game.width/2 - 490) + 15,
      previousY: (game.height/2 - 220) + (10),
      executeDuring: true,
      during: function() {
        playState.showBetButtonsHelp1(game.width/2 - 490 + 640/3, game.height/2 - 220 + 270 - 45);
      },
      executeAfter: true,
      after: function() {
        playState.closeBetButtonsHelp1();
      }
    },
    { //helpStepIndex = 10
      boxX: game.width/2 - 490,
      boxY: game.height/2 - 180,
      boxWidth: 640,
      boxHeight: 220,
      label: "If you have pocket aces. you will also be given\nthe option to bet " + adminConfig.variableWagerMulitplier + "X your Ante.",
      labelX: (game.width/2 - 490) + 10, //Box X location plus space
      labelY: (game.height/2 - 180) + (240/2 - 60),  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 490) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 180) + 100,
      arrow: false,
      arrowX: (game.width/2 - 490) + (90),
      arrowY: (game.height/2 - 180) + (240 - 5),
      arrowAngle: -90,
      arrow2: false,
      arrow2X: (game.width/2 - 490) + (145),
      arrow2Y: (game.height/2 - 180) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 490) + (440 - 93),
      continueY: (game.height/2 - 180) + (10),
      exitX: (game.width/2 - 490) + (440/2 - 44),
      exitY: (game.height/2 - 180) + (10),
      previousExists: true,
      previousX: (game.width/2 - 490) + 15,
      previousY: (game.height/2 - 180) + (10),
      executeDuring: true,
      during: function() {
        playState.showBetButtonsHelp2(game.width/2 - 490 + 640/3, game.height/2 - 180 + 220 - 45);
      },
      executeAfter: true,
      after: function() {
        playState.closeBetButtonsHelp2();
      }
    },
    { //helpStepIndex = 11
      boxX: game.width/2 - 220,
      boxY: game.height/2 - 180,
      boxWidth: 640,
      boxHeight: 310,
      label: "Next, the first 3 community cards will be turned\nover.",
      labelX: (game.width/2 - 220) + 10, //Box X location plus space
      labelY: (game.height/2 - 180) + (240/2 - 60),  //Box Y location plus space
      label2Show: true,
      label2: "You will be given the option to wager 2X your\nAnte.  Or you can choose to \"Check\" again.",
      label2X: (game.width/2 - 220) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 180) + 140,
      arrow: false,
      arrowX: (game.width/2 - 220) + (90),
      arrowY: (game.height/2 - 180) + (240 - 5),
      arrowAngle: -90,
      arrow2: false,
      arrow2X: (game.width/2 - 220) + (145),
      arrow2Y: (game.height/2 - 180) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 220) + (440 - 93),
      continueY: (game.height/2 - 180) + (10),
      exitX: (game.width/2 - 220) + (440/2 - 44),
      exitY: (game.height/2 - 180) + (10),
      previousExists: true,
      previousX: (game.width/2 - 220) + 15,
      previousY: (game.height/2 - 180) + (10),
      executeDuring: true,
      during: function() {
        playState.showBetButtonsHelp3(game.width/2 - 220 + 640/3 + 50, game.height/2 - 180 + 310 - 45);
      },
      executeAfter: true,
      after: function() {
        playState.closeBetButtonsHelp3();
      }
    },
    { //helpStepIndex = 12
      boxX: game.width/2 - 40,
      boxY: game.height/2 - 180,
      boxWidth: 640,
      boxHeight: 310,
      label: "Then, the last 2 community cards are turned\nover.",
      labelX: (game.width/2 - 40) + 10, //Box X location plus space
      labelY: (game.height/2 - 180) + (240/2 - 60),  //Box Y location plus space
      label2Show: true,
      label2: "Now you have the option to wager 1X your\nAnte or Fold.",
      label2X: (game.width/2 - 40) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 180) + 140,
      arrow: false,
      arrowX: (game.width/2 - 40) + (90),
      arrowY: (game.height/2 - 180) + (240 - 5),
      arrowAngle: -90,
      arrow2: false,
      arrow2X: (game.width/2 - 40) + (145),
      arrow2Y: (game.height/2 - 180) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 40) + (440 - 93),
      continueY: (game.height/2 - 180) + (10),
      exitX: (game.width/2 - 40) + (440/2 - 44),
      exitY: (game.height/2 - 180) + (10),
      previousExists: true,
      previousX: (game.width/2 - 40) + 15,
      previousY: (game.height/2 - 180) + (10),
      executeDuring: true,
      during: function() {
        playState.showBetButtonsHelp4(game.width/2 - 40 + 640/3 + 50, game.height/2 - 180 + 310 - 45);
      },
      executeAfter: true,
      after: function() {
        playState.closeBetButtonsHelp4();
      }
    },
    { //helpStepIndex = 13
      boxX: game.width/2 - 440/2 + 200,
      boxY: game.height/2,
      boxWidth: 440,
      boxHeight: 240,
      label: "If you win the hand, your\nAnte Bonus payout amount\nshows here.",
      labelX: (game.width/2 - 440/2 + 200) + 10, //Box X location plus space
      labelY: (game.height/2) + (240/2 - 60),  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 440/2 + 200) + 10, //Box X location plus space,
      label2Y: (game.height/2) + 100,
      arrow: true,
      arrowX: (game.width/2 - 440/2 + 200) + (440 - 5),
      arrowY: (game.height/2) + (240 - 65),
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 440/2 + 200) + (145),
      arrow2Y: (game.height/2) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 440/2 + 200) + (440 - 93),
      continueY: (game.height/2) + (10),
      exitX: (game.width/2 - 440/2 + 200) + (440/2 - 44),
      exitY: (game.height/2) + (10),
      previousExists: true,
      previousX: (game.width/2 - 440/2 + 200) + 15,
      previousY: (game.height/2) + (10),
      executeDuring: true,
      during: function() {
        return false;
      },
      executeAfter: true,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 14
      boxX: game.width/2 - 440/2,
      boxY: game.height/2 - 170,
      boxWidth: 440,
      boxHeight: 170,
      label: "The Dealer Qualifies with a\nPair or Better.",
      labelX: (game.width/2 - 440/2) + 10, //Box X location plus space
      labelY: (game.height/2 - 170) + 10,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 440/2) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 170) + 100,
      arrow: false,
      arrowX: (game.width/2 - 440/2) + (440 - 5),
      arrowY: (game.height/2 - 170) + (200 - 5),
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 440/2) + (145),
      arrow2Y: (game.height/2 - 170) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 440/2) + (440 - 93),
      continueY: (game.height/2 - 170) + (170 - 40),
      exitX: (game.width/2 - 440/2) + (440/2 - 44),
      exitY: (game.height/2 - 170) + (170 - 40),
      previousExists: true,
      previousX: (game.width/2 - 440/2) + 15,
      previousY: (game.height/2 - 170) + (170 - 40),
      executeDuring: true,
      during: function() {
        return false;
      },
      executeAfter: true,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 15
      boxX: game.width/2 - 440/2,
      boxY: game.height/2 - 170,
      boxWidth: 440,
      boxHeight: 170,
      label: "If the Dealer does not qualify\nthe Ante is a Push.",
      labelX: (game.width/2 - 440/2) + 10, //Box X location plus space
      labelY: (game.height/2 - 170) + 10,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 440/2) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 170) + 100,
      arrow: false,
      arrowX: (game.width/2 - 440/2) + (440 - 5),
      arrowY: (game.height/2 - 170) + (200 - 5),
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 440/2) + (145),
      arrow2Y: (game.height/2 - 170) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 - 440/2) + (440 - 93),
      continueY: (game.height/2 - 170) + (170 - 40),
      exitX: (game.width/2 - 440/2) + (440/2 - 44),
      exitY: (game.height/2 - 170) + (170 - 40),
      previousExists: true,
      previousX: (game.width/2 - 440/2) + 15,
      previousY: (game.height/2 - 170) + (170 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: true,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 16
      boxX: game.width/2 + 230,
      boxY: game.height/2 - 140,
      boxWidth: 460,
      boxHeight: 210,
      label: "The 5-Card Bonus is paid based\non the 5-Card Bonus pay table.",
      labelX: (game.width/2 + 230) + 10, //Box X location plus space
      labelY: (game.height/2 - 140) + 70,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 + 230) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 140) + 100,
      arrow: true,
      arrowX: (game.width/2 + 230) + (460/2) + 25,
      arrowY: (game.height/2 - 140) + 5,
      arrowAngle: 90,
      arrow2: false,
      arrow2X: (game.width/2 + 230) + (440 - 65),
      arrow2Y: (game.height/2 - 140) + 5,
      arrow2Angle: 90,
      continueExists: true,
      continueX: (game.width/2 + 230) +(460 - 93),
      continueY: (game.height/2 - 140) + (210 - 40),
      exitX: (game.width/2 + 230) + (460/2 - 44),
      exitY: (game.height/2 - 140) + (210 - 40),
      previousExists: true,
      previousX: (game.width/2 + 230) + 15,
      previousY: (game.height/2 - 140) + (210 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 17
      boxX: game.width/2 - 440/2 + 200,
      boxY: game.height/2 - 180,
      boxWidth: 440,
      boxHeight: 240,
      label: "The Pocket Aces Plus bonus is\npaid based on the Pocket Aces\nPlus bonus pay table.",
      labelX: (game.width/2 - 440/2 + 200) + 10, //Box X location plus space
      labelY: (game.height/2 - 180) + (240/2 - 60),  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 440/2 + 200) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 180) + 100,
      arrow: true,
      arrowX: (game.width/2 - 440/2 + 200) + (440 - 5),
      arrowY: (game.height/2 - 180) + (240 - 55),
      arrowAngle: 180,
      arrow2: false,
      arrow2X: (game.width/2 - 440/2 + 200) + (145),
      arrow2Y: (game.height/2 - 180) + 5,
      arrow2Angle: 90,
      continueExists: false,
      continueX: (game.width/2 - 440/2 + 200) + (440 - 93),
      continueY: (game.height/2 - 180) + (10),
      exitX: (game.width/2 - 440/2 + 200) + (440/2 - 44),
      exitY: (game.height/2 - 180) + (10),
      previousExists: true,
      previousX: (game.width/2 - 440/2 + 200) + 15,
      previousY: (game.height/2 - 180) + (10),
      executeDuring: true,
      during: function() {
        return false;
      },
      executeAfter: true,
      after: function() {
        return false;
      }
    },
    { //helpStepIndex = 18
      boxX: game.width/2 - 450/2,
      boxY: game.height/2 - 130,
      boxWidth: 450,
      boxHeight: 160,
      label: "                  Have Fun!",
      labelX: (game.width/2 - 450/2) + 10, //Box X location plus space
      labelY: (game.height/2 - 130) + 20,  //Box Y location plus space
      label2Show: false,
      label2: "",
      label2X: (game.width/2 - 450/2) + 10, //Box X location plus space,
      label2Y: (game.height/2 - 130) + 100,
      arrow: false,
      arrowX: (game.width/2 - 450/2) + (90),
      arrowY: (game.height/2 - 130) + (440 - 5),
      arrowAngle: -90,
      arrow2: false,
      arrow2X: (game.width/2 - 450/2) + (145),
      arrow2Y: (game.height/2 - 130) + 5,
      arrow2Angle: 90,
      continueExists: false,
      continueX: (game.width/2 - 450/2) + (450 - 93),
      continueY: (game.height/2 - 130) + (160 - 40),
      exitX: (game.width/2 - 450/2) + (450/2 - 44),
      exitY: (game.height/2 - 130) + (160 - 40),
      previousExists: true,
      previousX: (game.width/2 - 450/2) + 15,
      previousY: (game.height/2 - 130) + (160 - 40),
      executeDuring: false,
      during: function() {
        return false;
      },
      executeAfter: false,
      after: function() {
        return false;
      }
    }
  ];
}