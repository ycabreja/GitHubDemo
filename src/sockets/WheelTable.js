/* ==================================================================================== */
/*                                 Wheel Test                                           */
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
/* 111020 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */

// Imports
var Models = require('../models');
var WheelTable = Models.WheelTable;

/* ==================================================================================== */
/* This function creates the wheel table values.                                        */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  JSON String: [{                                                       */
/*                                 wheelType: "xxxxxx",                                 */
/*                                 stopNumber: 99,                                      */
/*                                 sliceValue: 9999,                                    */
/*                                 progressive: boolean,                                */
/*                                 progressiveValue: 9999                               */
/*                             }]                                                       */
/* Variables Out: None                                                                  */
/* ==================================================================================== */
var wheelTableCreate = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var wheelTableData = {};
  var wheelType = data[0].wheelType;
  var createResult = true;
  
  for (var i=0; i<data.length; i++) {

    wheelTableData = {
      wheelType: data[i].wheelType,
      wheelStop: data[i].wheelStop,
      sliceLocation: data[i].sliceLocation,
      baseAmount: data[i].baseAmount,
      progressive: data[i].progressive,
      progressiveMinWager: data[i].progressiveMinWager,
      progressiveBase: data[i].progressiveBase,
      progressiveIncrement: data[i].progressiveIncrement,
      progressivePool: data[i].progressivePool
    };
        
    var newWheel = new WheelTable.WheelTableModel(wheelTableData);
        
    //Save pay table row
    newWheel.save(function(saveErr) {
//console.log("element: " + i);          
      if(saveErr) {
        createResult = false;
        socket.emit('ERROR', JSON.stringify({message: 'Error occured when creating ' + wheelType + ' wheel:' + saveErr}));
        return;
      }
    });
  }
  
  if(createResult) {
    socket.emit('wheeltable_created', JSON.stringify({type: wheelType}));
    return;
  }
};


/* ==================================================================================== */
/* This function returns the wheel table values.                                        */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: JSON String: [{                                                       */
/*                               _id: 'xxxxxxxxx',                                      */
/*                               wheelType: 'xxxxxxx',                                  */
/*                               stopNumber: 99,                                        */
/*                               sliceValue: 999999,                                    */
/*                               progressive: boolean,                                  */
/*                               progressiveValue: 999999                               */
/*                             }]                                                       */
/* ==================================================================================== */
var getWheelTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var search = { wheelType: data.type };
  
  //Return data
  WheelTable.WheelTableModel.findAll(search, function(err, wheelTableData) {
    if(err || !wheelTableData) {
      socket.emit('ERROR', JSON.stringify({message: 'Error retrieving wheel table: ' + err}));
      return;
    } else {  //Wheel Table found
      
//console.log("Wheel Table: " + JSON.stringify(wheelTableData));

      switch(data.callingFunction) {
        case 1: //Admin
          socket.emit('wheeltable_retrieved', JSON.stringify({wheelData: wheelTableData, type: data.type}));
          break;
        case 2: //Play
          socket.emit('wheeltableInfo', JSON.stringify({wheelData: wheelTableData, type: data.type}));
          break;
        case 3: //Progressive Refresh
          socket.emit('wheelTableUpdate', JSON.stringify({wheelData: wheelTableData, type: data.type}));
          break;
      }
        
      return;
    }
  });
};

/* ==================================================================================== */
/* This function updates the wheel table values.                                        */
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
var updateWheelTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var search = { _id: data.rowID };
  var updateData = { };
  
//  console.log("Wheel Table Field: " + data.elementNumber + ", Bonus Value: " + data.value);
  
  switch(data.elementNumber) {
    case 1:
      updateData = {
        $set: { 
          sliceLocation: data.value
        }
      };
      break;
    case 2:
      updateData = {
        $set: { 
          baseAmount: data.value
        }
      };
      break;
    case 3:
      updateData = {
        $set: { 
          progressive: data.value
        }
      };
      break;
    case 4:
      updateData = {
        $set: { 
          progressiveMinWager: data.value
        }
      };
      break;
    case 5:
      updateData = {
        $set: { 
          progressiveBase: data.value
        }
      };
      break;
    case 6:
      updateData = {
        $set: { 
          progressiveIncrement: data.value
        }
      };
      break;
    case 7:
      updateData = {
        $set: { 
          progressivePool: data.value
        }
      };
      break;
    case 8:  //Increase progressive pool
//      console.log("Updating Pool By: " + data.value);
      updateData = {
        $inc: { 
          progressivePool: data.value
        }
      };
      break;
    case 9:  //Reset progressive pool
//      console.log("Pool Rest to : " + data.value);
      updateData = {
        $set: { 
          progressivePool: data.value
        }
      };
      break;
  }
  
  WheelTable.WheelTableModel.updateWheelTable(search, updateData, function(err) {
    if(err) {
      socket.emit('ERROR', JSON.stringify({message: 'Error occured when saving wheel table change:' + err}));
      return;
    }
    else { // update session variables
      if(data.elementNumber > 7){
        socket.emit('progressive_updated', JSON.stringify({message: 'Progressive Successfully Updated'}));
      } else {
        socket.emit('wheeltable_updated', JSON.stringify({message: 'Wheel Table Successfully Updated', refresh:data.refresh}));
      }
      return;
    }
  });
};

// ---------------------------------------------------------------------------------------
// Export functions

module.exports.wheelTableCreate = wheelTableCreate;
module.exports.getWheelTable = getWheelTable;
module.exports.updateWheelTable = updateWheelTable;