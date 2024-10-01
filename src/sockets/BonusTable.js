/* ==================================================================================== */
/*                                 Magnum Poker                                         */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the socket call code for a Bonus Table functions.                 */
/* ------------------------------------------------------------------------------------ */
/* Calls To:     None                                                                   */
/*                                                                                      */
/* Called From:                                                                         */
/* ==================================================================================== */
/*                                            CHANGE LOG                                */
/* ------------------------------------------------------------------------------------ */
/* DATE   |    CHANGE ID     | CHANGE DESCRIPTION / NOTES                               */
/* ------------------------------------------------------------------------------------ */
/* 042220 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */

// Imports
var Models = require('../models');
var BonusTable = Models.BonusTable;

/* ==================================================================================== */
/* This function creates the bet based bonus table amounts.                             */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  JSON String: [{                                                       */
/*                                 bonusType: "xxxxxx",                                 */
/*                                 payOutType: 9,                                       */
/*                                 displayHand: 'xxxxxxx',                              */
/*                                 handRank: 9,                                         */
/*                                 betBonus: [{                                         */
/*                                               betAmount: 9999,                       */
/*                                               bonusAmount: 9999                      */
/*                                           }]                                         */
/*                             }]                                                       */
/* Variables Out: None                                                                  */
/* ==================================================================================== */
var betBasedBonusTableCreate = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var betBasedBonusTableData = {};
  var tableType = data[0].bonusType;
  var createResult = true;
  
  for (var i=0; i<data.length; i++) {

    betBasedBonusTableData = {
      bonusType: data[i].bonusType,
      payOutType: data[i].payOutType,
      displayHand: data[i].displayHand,
      handRank: data[i].handRank,
      wager1Win: data[i].wager1Win,
      wager2Win: data[i].wager2Win
    };
        
    var newPay = new BonusTable.BonusTableModel(betBasedBonusTableData);
        
    //Save pay table row
    newPay.save(function(saveErr) {
//console.log("element: " + i);          
      if(saveErr) {
        createResult = false;
        socket.emit('ERROR', JSON.stringify({message: 'Error occured when creating ' + tableType + ' bonus table:' + saveErr}));
        return;
      } else {  //Return account data
//        if(i == (data.length - 1)) {
//          socket.emit('bonustable_created', JSON.stringify({type: tableType}));
//          return;
//        }
      }
    });
  }
  if(createResult) {
//console.log("last element");          
          socket.emit('bonustable_created', JSON.stringify({type: tableType}));
          return;
  }
};

/* ==================================================================================== */
/* This function creates the odds based bonus table amounts.                            */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  JSON String: [{                                                       */
/*                                 bonusType: "xxxxxx",                                 */
/*                                 payOutType: 9,                                       */
/*                                 displayHand: 'xxxxxxx',                              */
/*                                 handRank: 9,                                         */
/*                                 oddsBonus: [{                                        */
/*                                               bonus: 9999,                           */
/*                                               bonusBase: 9999                        */
/*                                           }]                                         */
/*                             }]                                                       */
/* Variables Out: None                                                                  */
/* ==================================================================================== */
var oddsBasedBonusTableCreate = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var oddsBasedBonusTableData = {};
  var tableType = data[0].bonusType;
  
  for (var i=0; i<data.length; i++) {

    oddsBasedBonusTableData = {
      bonusType: data[i].bonusType,
      payOutType: data[i].payOutType,
      displayHand: data[i].displayHand,
      handRank: data[i].handRank,
      bonus: data[i].bonus,
      bonusBase: data[i].bonusBase
    };
        
    var newPay = new BonusTable.BonusTableModel(oddsBasedBonusTableData);
        
    //Save pay table row
    newPay.save(function(saveErr) {
      if(saveErr) {
        socket.emit('ERROR', JSON.stringify({message: 'Error occured when creating ' + tableType + ' bonus table:' + saveErr}));
        return;
      } else {  //Return account data
        if(i == (data.length - 1)) {
          socket.emit('bonustable_created', JSON.stringify({type: tableType}));
          return;
        }
      }
    });
  }
};

/* ==================================================================================== */
/* This function returns the bonus table values.                                        */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: JSON String: [{                                                       */
/*                               _id: 'xxxxxxxxx',                                      */
/*                               displayHand: 'xxxxxxx',                                */
/*                               handRank: '99',                                        */
/*                               fifthCard: '999999',                                   */
/*                               sixthCard: '999999',                                   */
/*                               seventhCard: '999999'                                  */
/*                             }]                                                       */
/* ==================================================================================== */
var getBonusTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var search = { bonusType: data.type };
  
  //Return data
  BonusTable.BonusTableModel.findAll(search, function(err, bonusTableData) {
    if(err || !bonusTableData) {
      socket.emit('ERROR', JSON.stringify({message: 'Error retrieving bonus table: ' + err}));
      return;
    } else {  //Bonus Table found
      
//console.log("Bonus Table: " + JSON.stringify(bonusTableData));

      switch(data.callingFunction) {
        case 1: //Admin
          socket.emit('bonustable_retrieved', JSON.stringify({bonusData: bonusTableData, type: data.type}));
          break;
        case 2: //Play
          socket.emit('bonustableInfo', JSON.stringify({bonusData: bonusTableData, type: data.type}));
          break;
      }
        
      return;
    }
  });
};

/* ==================================================================================== */
/* This function updates the bonus table values.                                        */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In: JSON String: {                                                         */
/*                               rowID: 'xxxxxxxxx',                                    */
/*                               elementNumber: '9',                                    */
/*                               value: '999999' (or 'xxxxxx')                          */
/*                             }                                                        */
/* Variables Out:  None                                                                 */
/* ==================================================================================== */
var updateBonusTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var search = { _id: data.rowID };
  var updateData = { };
  
//  console.log("Bonus Field: " + data.elementNumber + ", Bonus Value: " + data.value);
  
  switch(data.elementNumber) {
    case 1:
      updateData = {
        $set: { 
          displayHand: data.value
        }
      };
      break;
    case 2:
      updateData = {
        $set: { 
          bonus: data.value
        }
      };
      break;
    case 3:
      updateData = {
        $set: { 
          bonusBase: data.value
        }
      };
      break;
    case 4:
      updateData = {
        $set: { 
          wager1Win: data.value
        }
      };
      break;
    case 5:
      updateData = {
        $set: { 
          wager2Win: data.value
        }
      };
      break;
  }
  
  BonusTable.BonusTableModel.updateBonusTable(search, updateData, function(err) {
    if(err) {
      socket.emit('ERROR', JSON.stringify({message: 'Error occured when saving bonus table change:' + err}));
      return;
    }
    else { // update session variables
      socket.emit('bonustable_updated', JSON.stringify({message: 'Bonus Table Successfully Updated'}));
      return;
    }
  });
};

// ---------------------------------------------------------------------------------------
// Export functions

module.exports.betBasedBonusTableCreate = betBasedBonusTableCreate;
module.exports.oddsBasedBonusTableCreate = oddsBasedBonusTableCreate;
module.exports.getBonusTable = getBonusTable;
module.exports.updateBonusTable = updateBonusTable;