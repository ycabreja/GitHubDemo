/* ==================================================================================== */
/*                               Wheel Functions                                        */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the javascript function for wheel tasks.                          */
/* ------------------------------------------------------------------------------------ */
/* Calls To:     None                                                                   */
/*                                                                                      */
/* Called From:                                                                         */
/* ==================================================================================== */
/*                                            CHANGE LOG                                */
/* ------------------------------------------------------------------------------------ */
/* DATE   |    CHANGE ID     | CHANGE DESCRIPTION / NOTES                               */
/* ------------------------------------------------------------------------------------ */
/* 042520 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */

var spinButton;
var spinButtonText;
var prizeSlice;
var fadeToBlack;
var wheelObjects;
var wheelOddsArray = [];

/* ==================================================================================== */
/* Function: createWheel                                                                */
/* Purpose: Creates and places scoreboard on game screen.                               */
/* Input:   gameObject: object (reference to game)                                      */
/*           wheelData = {                                                              */
/*            slices: 99,                                                               */
/*            minSpins: 99,                                                             */
/*            maxSpins: 99,                                                             */
/*            wheelSpeed: 9999,                                                         */
/*            outerReductionFactor: .99,                                                */
/*            innerReductionFactor: .99,                                                */
/*            wheelCenterReductionFactor: .99,                                          */
/*            baseFontSize: 99,                                                         */
/*            baseCenterTextFontSize: 99,                                               */
/*            innerDiamterOrig: 9999,                                                   */
/*            innerDiameterOffset: 9999,                                                */
/*            outerDiamterOrig: 9999,                                                   */
/*            spinButtonReduction: .99,                                                 */
/*            wheelCenterX: 9999,                                                       */
/*            wheelCenterY: 9999,                                                       */
/*            innerWheelSprite: 'xxxxxxxx',                                             */
/*            outerWheelSprite: 'xxxxxxxx'                                              */
/*            wheelCenterSprite: 'xxxxxxxx'                                             */
/*            spinButtonSprite: 'xxxxxxxx'                                             */
/*          };                                                                          */
/*            wheelTable: from wheel database table                                     */
/*            wagerNumber: 999                                                          */
/*            wheelConfig: from wheel admin database table                              */
/* Output:  Object containing Wheel group                                               */
/*                                                                                      */
/* ==================================================================================== */
function createWheel(gameObject, wheelData, wheelTable, wheelConfig, shortCutButton) {
    var wheelDiameter = (wheelData.innerDiamterOrig - wheelData.innerDiameterOffset) * wheelData.innerReductionFactor;
    var baseRadians = 360/(2 * wheelConfig.slices) * Math.PI/180;
    var wheelTextFont = (wheelData.baseFontSize * wheelData.innerReductionFactor) + "px Arial Black";
    var wheelCenterTextFont = (wheelData.baseCenterTextFontSize * wheelData.wheelCenterReductionFactor) + "px Arial Black";
    
    var wheelBackground = game.add.sprite(gameWidth/2, gameHeight/2, 'background');
    wheelBackground.anchor.set(.5);
    wheelBackground.exists = true;

    var wheelInner = gameObject.add.sprite(wheelData.wheelCenterX, wheelData.wheelCenterY, wheelData.innerWheelSprite);
    wheelInner.scale.setTo(wheelData.innerReductionFactor, wheelData.innerReductionFactor);
    wheelInner.anchor.set(.5);
    wheelInner.exists = true;

    var wheelText = [];
    var wheelTextColor;
    var wheelStopAmount;
    var poolAmount;
    
    for(var i=0; i<wheelTable.length; i++) {
      if(wheelTable[i].progressive && wheelConfig.betAmounts[wheelData.wagerNumber] >= wheelConfig.betAmounts[wheelTable[i].progressiveMinWager-1]) {
        wheelTextColor = "#ff0000";
        poolAmount = wheelTable[i].progressivePool;
      } else {
        wheelTextColor = "#000000";
        poolAmount = 0;
      }
      
      wheelStopAmount = (wheelTable[i].baseAmount * (wheelData.wagerNumber + 1)) + poolAmount;
      
      var numberString;
      if(wholeNumber(wheelStopAmount)) {
        numberString = wheelStopAmount.toLocaleString(undefined, {maximumFractionDigits: 0});
      } else {
        numberString = wheelStopAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
      }
      
      wheelText[wheelTable[i].sliceLocation] = gameObject.add.text(wheelDiameter/2 * Math.cos((2 * wheelTable[i].sliceLocation + 1) * baseRadians) + wheelData.wheelCenterX, 
                                        wheelData.wheelCenterY - wheelDiameter/2 * Math.sin((2 * wheelTable[i].sliceLocation + 1) * baseRadians), 
                                        "$" + numberString, 
                                        {font: wheelTextFont, fontWeight: 'bold', fill: wheelTextColor});

      wheelText[wheelTable[i].sliceLocation].anchor.set(0, .5);
      wheelText[wheelTable[i].sliceLocation].angle = 180 - (2 * wheelTable[i].sliceLocation + 1)*360/(wheelConfig.slices*2) + 1;
    }

    var innerWheelGroup = gameObject.add.group();
    
    innerWheelGroup.add(wheelInner);
//    innerWheelGroup.add(wheelCenter);
//    innerWheelGroup.add(wheelCenterText);
    
    for(var i=0; i<wheelConfig.slices; i++) {
      innerWheelGroup.add(wheelText[i]);
    }
    
    innerWheelGroup.pivot.x = wheelData.wheelCenterX;
    innerWheelGroup.pivot.y = wheelData.wheelCenterY;
    innerWheelGroup.x = wheelData.wheelCenterX;
    innerWheelGroup.y = wheelData.wheelCenterY;

    var wheelOuter = gameObject.add.sprite(wheelData.wheelCenterX, wheelData.wheelCenterY, wheelData.outerWheelSprite);
    wheelOuter.scale.setTo(wheelData.outerReductionFactor, wheelData.outerReductionFactor);
    wheelOuter.anchor.set(.5);
    wheelOuter.exists = true;

    var wheelCenter = gameObject.add.sprite(wheelData.wheelCenterX, wheelData.wheelCenterY, wheelData.wheelCenterSprite);
    wheelCenter.scale.setTo(wheelData.wheelCenterReductionFactor, wheelData.wheelCenterReductionFactor);
    wheelCenter.anchor.set(.5);
    wheelCenter.exists = true;

    var wheelCenterText = gameObject.add.text(wheelData.wheelCenterX, 
                                        wheelData.wheelCenterY, 
                                        "$" + wheelConfig.betAmounts[wheelData.wagerNumber].toLocaleString(undefined, {maximumFractionDigits: 0}), 
                                        {font: wheelCenterTextFont, fontWeight: 'bold', fill: '#ffffff', align: 'center'});
    wheelCenterText.anchor.set(.5);

//-------------------------------------------------------------------------------------------------------------------------------------
//Add results box
        var resultsTextFormat = {font: '35px Arial', fontWeight: 'bold', fill: '#ffffff', align: 'center'};
        
        var resultsBox = game.add.sprite(wheelData.wheelCenterX, wheelData.wheelCenterY, 'wheelWin');
        resultsBox.scale.setTo(wheelData.wheelCenterReductionFactor, wheelData.wheelCenterReductionFactor);
        resultsBox.anchor.set(.5);
//        resultsBox.exists = true;
        
        var resultsBoxText = game.add.text(wheelData.wheelCenterX, wheelData.wheelCenterY, "WIN $5,000", resultsTextFormat);
        resultsBoxText.anchor.set(.5);
//        resultsBoxText.exists = true;


        var wheelResultsObjects = gameObject.add.group();
        wheelResultsObjects.add(resultsBox);
        wheelResultsObjects.add(resultsBoxText);
        wheelResultsObjects.visible = false;

//-------------------------------------------------------------------------------------------------------------------------------------
//Create spin button
      var outerRadius = (wheelData.outerDiamterOrig * wheelData.outerReductionFactor)/2;
      spinButton = gameObject.add.button(wheelData.wheelCenterX, 0, 
                                             wheelData.spinButtonSprite, 
                                             spinWheel, 
                                                 {
                                                   gameObject: gameObject,
                                                   innerWheelGroup: innerWheelGroup, 
                                                   wheelData: wheelData,
                                                   wheelTable: wheelTable,
                                                   shortCutButton: shortCutButton,
                                                   wheelResultsObjects: wheelResultsObjects,
                                                   wheelConfig:wheelConfig
                                                 });
      spinButton.scale.setTo(wheelData.spinButtonReduction, wheelData.spinButtonReduction);
      spinButton.anchor.set(.5);
//      spinButton.exists = false;
      var spinButtonY = wheelData.wheelCenterY + outerRadius + spinButton.height/3;
      spinButton.y = spinButtonY;
      
      spinButtonText = gameObject.add.text(wheelData.wheelCenterX, spinButtonY, "SPIN", {font: '13.5px Arial', fontWeight: 'bold', fill: '#ffffff', align:"center"});
      spinButtonText.anchor.set(.5);
//      spinButtonText.exists = false;
          

    var wheelScreen = gameObject.add.group();
    wheelScreen.add(wheelBackground);
    wheelScreen.add(innerWheelGroup);
    wheelScreen.add(wheelOuter);
    wheelScreen.add(wheelCenter);
    wheelScreen.add(wheelCenterText);
    wheelScreen.add(spinButton);
    wheelScreen.add(spinButtonText);
    wheelScreen.add(wheelResultsObjects);
    wheelScreen.visible = false;

//-------------------------------------------------------------------------------------------------------------------------------------
//Return Object

    wheelObjects = {   wheelScreen: wheelScreen, 
                        innerWheelGroup: innerWheelGroup, 
                        wheelCenterTextObject: wheelCenterText,
                        wheelData: wheelData,
                        wheelTable: wheelTable,
                        wheelConfig: wheelConfig
                      };
}

/* ==================================================================================== */
/* Function: updateWheel                                                                */
/* Purpose: Creates and places scoreboard on game screen.                               */
/* Input:   wheelObject:  contains wheel text objects and center text object            */
/*          wagerNumber: 999                                                            */
/*          wheelTable: from wheel database table                                       */
/*          wheelConfig: from wheel admin database table                                */
/* Output:  None                                                                        */
/*                                                                                      */
/* ==================================================================================== */
function updateWheel(wagerNumber) {

    var wheelTextColor;
    var wheelStopAmount;
    var numberString;
    var poolAmount;

    //Sort Wheel Table by slice location
    wheelObjects.wheelTable.sort(function(obj1, obj2) {
      return obj1.sliceLocation - obj2.sliceLocation;
    });

    for(var i=0; i<wheelObjects.wheelConfig.slices; i++) {
// if(wheelTable[i].progressive && wheelConfig.betAmounts[wheelData.wagerNumber] >= wheelConfig.betAmounts[wheelTable[i].progressiveMinWager-1]) {
      
      if(wheelObjects.wheelTable[i].progressive && wheelObjects.wheelConfig.betAmounts[wheelObjects.wheelData.wagerNumber >= wheelObjects.wheelConfig.betAmounts[wheelObjects.wheelTable[i].progressiveMinWager-1]]) {
        wheelTextColor = "#ff0000";
        poolAmount = wheelObjects.wheelTable[i].progressivePool;
      } else {
        wheelTextColor = "#000000";
        poolAmount = 0;
      }
      
      
      wheelStopAmount = (wheelObjects.wheelTable[i].baseAmount * (wagerNumber + 1)) + poolAmount;
      
      if(wholeNumber(wheelStopAmount)) {
        numberString = wheelStopAmount.toLocaleString(undefined, {maximumFractionDigits: 0});
      } else {
        numberString = wheelStopAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
      }

      wheelObjects.innerWheelGroup.children[wheelObjects.wheelTable[i].sliceLocation+1].setText("$" + numberString);
      wheelObjects.innerWheelGroup.children[wheelObjects.wheelTable[i].sliceLocation+1].addColor(wheelTextColor, 0);
      
      wheelObjects.wheelCenterTextObject.setText("$" + wheelObjects.wheelConfig.betAmounts[wagerNumber].toLocaleString(undefined, {maximumFractionDigits: 0}));
    }

    //Return Wheel Table Sort to wheel stop
    wheelObjects.wheelTable.sort(function(obj1, obj2) {
      return obj1.wheelStop - obj2.wheelStop;
    });

}

/* ==================================================================================== */
/* Function: spinWheel                                                                  */
/* Purpose: Creates and places scoreboard on chipholder image.                          */
/* Input:   gameObject: object (reference to game)                                      */
/*           innerWheelGroup: object that references the inner wheel and text           */
/*           wheelData = {                                                              */
/*            slices: 99,                                                               */
/*            minSpins: 99,                                                             */
/*            maxSpins: 99,                                                             */
/*            wheelSpeed: 9999,                                                         */
/*            outerReductionFactor: .99,                                                */
/*            innerReductionFactor: .99,                                                */
/*            wheelCenterReductionFactor: .99,                                          */
/*            baseFontSize: 99,                                                         */
/*            baseCenterTextFontSize: 99,                                               */
/*            innerDiamterOrig: 9999,                                                   */
/*            innerDiameterOffset: 9999,                                                */
/*            outerDiamterOrig: 9999,                                                   */
/*            spinButtonReduction: .99,                                                 */
/*            wheelCenterX: 9999,                                                       */
/*            wheelCenterY: 9999,                                                       */
/*            innerWheelSprite: 'xxxxxxxx',                                             */
/*            outerWheelSprite: 'xxxxxxxx'                                              */
/*            wheelCenterSprite: 'xxxxxxxx'                                             */
/*            spinButtonSprite: 'xxxxxxxx'                                              */
/*          };                                                                          */
/* Output:  None                                                                        */
/*                                                                                      */
/* ==================================================================================== */
function spinWheel(){
       var spinGameObject = this.gameObject;
       var spinWheelData = this.wheelData;
       var innerWheel = this.innerWheelGroup;
       var spinWheelTable = this.wheelTable;
       var spinWheelResultsObjects = this.wheelResultsObjects;
       var spinWheelConfig = this.wheelConfig;
       var spinShortCutButton = this.shortCutButton;
       var degreesPerSlice = 360 / spinWheelData.slices;
       
       playSound(spinGameObject, 'spin', 1);
  
      //Hide spin button
      showSpinButton(false);
      
      // the wheel will spin round from minSpins to maxSpins times. This is just coreography
       //Return a number from minSpins to maxSpins
       var rounds = Math.floor(Math.random() * (spinWheelData.maxSpins - spinWheelData.minSpins - 1)) + spinWheelData.minSpins;


       //Select a random index from the array of hit possibilities
       var winningWheelStopIndex = Math.floor(Math.random() * wheelOddsArray.length); //Get a wheel stop from the random array
       
       //Get the number of the wheel stop based on the random index above
       var winningWheelStop = wheelOddsArray[winningWheelStopIndex];
       
       //Determine the slice location of the selected wheel stop
       var winningSlice = spinWheelTable[winningWheelStop].sliceLocation;
       
       //Return a degree number betweeen 2.5 and 20.  This will be added the degrees of the slice chosen
       //The -5 in maxDegrees for Random assignment allows for the 2.5 degrees reduction at the bottom and top
       //The 25 in the varyDegrees assignment executes the 2.5 degree spacing from the wheel lines (it is multiplied by 10)
       //Divide by 10 since we increased the degrees by a factor of 10.  This gets us to the tenth of a degree
       var maxDegreesForRandom = (degreesPerSlice - 5) * 10;  //Multiply by 10 to get to 10th of a degree
       var varyDegrees = (Math.floor(Math.random() * maxDegreesForRandom) + 25) / 10;   
       
       //Add the random degreens to the degrees where the winning slice starts
       var degrees = winningSlice * degreesPerSlice + varyDegrees;
       
      // animation tweeen for the spin: duration defined by speed variable, will rotate by (360 * rounds + degrees) degrees
        this.innerWheelGroup.angle = 0;
         var spinTween = this.gameObject.add.tween(innerWheel).to({
               angle: 360 * rounds + degrees
          }, this.wheelData.wheelSpeed, Phaser.Easing.Quadratic.Out, true);

         //When finished enable spin button again
         spinTween.onComplete.add(function(){
           stopSound(spinGameObject);
           spinWheelResults(spinGameObject, adjustedSliceNumber(winningSlice), spinWheelData, spinWheelTable, spinWheelResultsObjects, spinWheelConfig);
           
           var pauseTimer = spinGameObject.time.create();  
           pauseTimer.add(spinWheelData.pauseToComplete, moveToBlackAfter, {gameObject: spinGameObject, shortCutButton: spinShortCutButton, wheelResultsObjects: spinWheelResultsObjects, endFunction: spinWheelData.endFunction});
           pauseTimer.start();
         });
}

function  showSpinButton(showButton) {
    spinButton.exists = showButton;
    spinButtonText.exists = showButton;
}

function adjustedSliceNumber(returnedSlice) {
      //Since the image is offset by 4 slices from the text, it needs to be reconciled
      var adjustedSlice;
  
      if(returnedSlice < 12) {
        adjustedSlice = returnedSlice + 4;  //To offset the starting point
      } else {  //Adjust first 4 slices
        switch(returnedSlice) {
          case 12: 
            adjustedSlice = 0;
            break;
          case 13: 
            adjustedSlice = 1;
            break;
          case 14: 
            adjustedSlice = 2;
            break;
          case 15: 
            adjustedSlice = 3;
            break;
        }
      }
      
      return adjustedSlice;  
}

/* ==================================================================================== */
/* Function: getWager                                                                   */
/* Purpose: Returns the location value of a wager for the wheel.                        */
/* Input:   amount:  99999                                                              */
/*          wheel Admin Config                                                          */
/* Output:  The index of the wager location in config array                             */
/*                                                                                      */
/* ==================================================================================== */
function getWager(amount, configData) {
  for(var i=0; i<configData.betAmounts.length; i++) {
    if(amount === configData.betAmounts[i]) {
      return i;
      break;
    }
  }
}
    
function spinWheelResults(gameObject, prizeSlice, spinWheelData, spinWheelTable, spinWheelResultsObjects, spinWheelConfig) {
//wheelStopAmount = (wheelTable[i].baseAmount * (wheelData.wagerNumber + 1)) + wheelTable[i].progressivePool;

  //Sort Wheel Table by slice location
  spinWheelTable.sort(function(obj1, obj2) {
    return obj1.sliceLocation - obj2.sliceLocation;
  });

  var poolAmount;
  if(spinWheelTable[prizeSlice].progressive && spinWheelConfig.betAmounts[spinWheelData.wagerNumber] >= spinWheelConfig.betAmounts[spinWheelTable[prizeSlice].progressiveMinWager-1]) {
    poolAmount = spinWheelTable[prizeSlice].progressivePool
    spinWheelData.winProgressive = true;  //To determine if progressive was won
  } else {
    poolAmount = 0; 
    spinWheelData.winProgressive = false;  //To determine if progressive was won
  }
  
  var prizeValue = (spinWheelTable[prizeSlice].baseAmount * (spinWheelData.wager)) + poolAmount;

  spinWheelData.winAmount = prizeValue;  //To use by main game
  spinWheelData.winWheelStop = spinWheelTable[prizeSlice].wheelStop;  //To determine the wheel stop that won
  
  var numberString;
  if(wholeNumber(prizeValue)) {
    numberString = prizeValue.toLocaleString(undefined, {maximumFractionDigits: 0});
  } else {
    numberString = prizeValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
  
  spinWheelResultsObjects.children[1].setText("WIN $" + numberString);
  spinWheelResultsObjects.visible = true;
  playSound(gameObject, 'bonuswin', .7);  
  
  console.log("Slice: " + prizeSlice);
  console.log("Wager Number: " + spinWheelData.wagerNumber);
  console.log("Win: " + prizeValue);
  
  //Return Wheel Table Sort to wheel stop
  spinWheelTable.sort(function(obj1, obj2) {
    return obj1.wheelStop - obj2.wheelStop;
  });
  
}

function getPrizeIndex(returnedSlice) {
  //Since the image is offset by 4 slices from the text, it needs to be reconciled
  var adjustedSlice;

  if(returnedSlice < 12) {
    adjustedSlice = returnedSlice + 4;  //To offset the starting point
  } else {  //Adjust first 4 slices
    switch(returnedSlice) {
      case 12: 
        adjustedSlice = 0;
        break;
      case 13: 
        adjustedSlice = 1;
        break;
      case 14: 
        adjustedSlice = 2;
        break;
      case 15: 
        adjustedSlice = 3;
        break;
    }
  }

  return adjustedSlice;
}
    
    
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

/* ==================================================================================== */
/* Function: createfadeToBlack                                                          */
/* Purpose: Create a fade to black screen.                                              */
/* Input:   gameObject                                                                  */
/*          data = {                                                                    */
/*             width: 9999,                                                             */
/*             height: 9999,                                                            */
/*             reductionFactor: 9,                                                      */
/*             startX: 9999,                                                            */
/*             startY: 9999,                                                            */
/*             showX: 9999,                                                             */
/*             showY: 9999,                                                             */
/*             leaveX: 9999,                                                            */
/*             leaveY: 9999,                                                            */
/*             logoX: 9999,                                                             */
/*             logoY: 9999,                                                             */
/*             speed: 9999,                                                             */
/*             pause: 9999                                                              */
/*          }                                                                           */
/* Output:  An object holding the fade to black screen.                                 */
/*                                                                                      */
/* ==================================================================================== */
function createfadeToBlack(gameObject, data) {
    //Fade To Black screen
    var fadeToBlackObject = gameObject.add.sprite(data.startX, data.startY, 'fadetoblack');
    fadeToBlackObject.scale.setTo(data.reductionFactor, data.reductionFactor);
    fadeToBlackObject.anchor.set(.5);
    fadeToBlackObject.exists = true;

    var fadeToBlackWheelInner = gameObject.add.sprite(data.imageX, data.imageY, 'wheelInner');
    fadeToBlackWheelInner.scale.setTo(data.imageReduction, data.imageReduction);
    fadeToBlackWheelInner.anchor.set(.5);
//    fadeToBlackWheelInner.exists = false;

    var fadeToBlackWheelOuter = gameObject.add.sprite(data.imageX, data.imageY, 'wheelOuter');
    fadeToBlackWheelOuter.scale.setTo(data.imageReduction, data.imageReduction);
    fadeToBlackWheelOuter.anchor.set(.5);
//    fadeToBlackWheelOuter.exists = false;

    var bonusLogo = gameObject.add.text(data.logoX, data.logoY, "Spin The Wheel!!", {font: '62px Arial Black', fontWeight: 'bold', fill: '#ffffff', align:"center"});
    bonusLogo.anchor.set(.5);
//    bonusLogo.exists = false;
    
    var ftbObjectGroup = gameObject.add.group();
    ftbObjectGroup.add(fadeToBlackWheelInner);
    ftbObjectGroup.add(fadeToBlackWheelOuter);
    ftbObjectGroup.add(bonusLogo);
    ftbObjectGroup.visible = false;
        
    fadeToBlack = {fadeToBlackScreen: fadeToBlackObject, ftbObjects: ftbObjectGroup, data: data};
}

/* ==================================================================================== */
/* Function: moveFadeToBlack                                                            */
/* Purpose: Slides the fade to black screen into view.                                  */
/* Input: gameObject                                                                    */ 
/*        fadeToBlack Object                                                            */
/*          data = {                                                                    */
/*             width: 9999,                                                             */
/*             height: 9999,                                                            */
/*             reductionFactor: 9,                                                      */
/*             startX: 9999,                                                            */
/*             startY: 9999,                                                            */
/*             showX: 9999,                                                             */
/*             showY: 9999,                                                             */
/*             leaveX: 9999,                                                            */
/*             leaveY: 9999,                                                            */
/*             logoX: 9999,                                                             */
/*             logoY: 9999,                                                             */
/*             speed: 9999,                                                             */
/*             pause: 9999                                                              */
/*          }                                                                           */
/* Output:  None                                                                        */
/*                                                                                      */
/* ==================================================================================== */
function moveFadeToBlack(gameObject, shortCutButton) {
     var fadeToBlackTween = gameObject.add.tween(fadeToBlack.fadeToBlackScreen).to({
           x: fadeToBlack.data.showX,
           y: fadeToBlack.data.showY
      }, fadeToBlack.data.enterSpeed, Phaser.Easing.Linear.In, true);

     //When finished enable spin button again
     fadeToBlackTween.onComplete.add(function(){
       fadeToBlack.ftbObjects.visible = true;
       wheelObjects.wheelScreen.visible = true;
       var pauseTimer = gameObject.time.create();  
       pauseTimer.add(fadeToBlack.data.enterPause, leaveFadeToBlack, {gameObject: gameObject});
       pauseTimer.start();
       
//       setTimeout(leaveFadeToBlack(gameObject, fadeObject, data), data.pause);
     });
}

function leaveFadeToBlack() {
   
    var leaveTween = this.gameObject.add.tween(fadeToBlack.fadeToBlackScreen).to({
          x: fadeToBlack.data.leaveX,
          y: fadeToBlack.data.leaveY
     }, fadeToBlack.data.enterSpeed, Phaser.Easing.Linear.In, true);

     leaveTween.onStart.add(function(){
       fadeToBlack.ftbObjects.visible = false;
     });

     leaveTween.onComplete.add(function(){
//       fadeObject.fadeToBlackScreen.x = data.startX;
//       fadeObject.fadeToBlackScreen.y = data.startY;
     });
}

function moveToBlackAfter() {
      var afterGameObject = this.gameObject;
      var afterShortCutButton = this.shortCutButton;
      var afterWheelResultsObjects = this.wheelResultsObjects;
      var afterEndFunction = this.endFunction;
      
      var fadeToBlackAfterTween = afterGameObject.add.tween(fadeToBlack.fadeToBlackScreen).to({
           x: fadeToBlack.data.showX,
           y: fadeToBlack.data.showY
      }, fadeToBlack.data.leaveSpeed, Phaser.Easing.Linear.In, true);

     //When finished enable spin button again
     fadeToBlackAfterTween.onComplete.add(function(){
       wheelObjects.wheelScreen.visible = false;
       afterWheelResultsObjects.visible = false;
       var pauseTimer = afterGameObject.time.create();  
       pauseTimer.add(fadeToBlack.data.leavePause, resetFadeToBlack, {gameObject: afterGameObject, shortCutButton: afterShortCutButton, endFunction: afterEndFunction});
       pauseTimer.start();
       
//       setTimeout(leaveFadeToBlack(gameObject, fadeObject, data), data.pause);
     });
}

function resetFadeToBlack() {
    var resetShortCutButton = this. shortCutButton;
    var resetEndFunction = this.endFunction;
    
    var resetTween = this.gameObject.add.tween(fadeToBlack.fadeToBlackScreen).to({
          x: fadeToBlack.data.startX,
          y: fadeToBlack.data.startY
     }, fadeToBlack.data.leaveSpeed, Phaser.Easing.Linear.In, true);

     resetTween.onComplete.add(function(){
        resetShortCutButton.inputEnabled = true;
        showSpinButton(true);
        resetEndFunction();
//       fadeObject.fadeToBlackScreen.x = data.startX;
//       fadeObject.fadeToBlackScreen.y = data.startY;
     });   
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

function createOddsArray(hitsArray) {
  var i, j;
  
  //Create the array
  for(i=0; i<hitsArray.length; i++) {   
    for(j=0; j<hitsArray[i]; j++) {
      wheelOddsArray.push(i);
    }
  }
  
  //Shuffle the array
  for(i=wheelOddsArray.length - 1; i>=0; i--) {
    randomIndex = Math.floor(Math.random() * wheelOddsArray.length);
    temp = wheelOddsArray[i];
    wheelOddsArray[i] = wheelOddsArray[randomIndex];
    wheelOddsArray[randomIndex] = temp;
  }
}