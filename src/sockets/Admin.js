/* ==================================================================================== */
/*                                 Magnum Poker                                         */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the socket call code for a Admin Configuration functions.         */
/* ------------------------------------------------------------------------------------ */
/* Calls To:     None                                                                   */
/*                                                                                      */
/* Called From:  src/socket-routes.js                                                   */
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
var Admin = Models.Admin;


/* ==================================================================================== */
/* This function creates the admin table.                                               */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: None                                                                  */
/* ==================================================================================== */
var adminTableCreate = function(socket) {
  
  var adminTableData = {
      startingCredits: 10000,
      betAmounts: [1,5,10,25,50,100],
      variableWagerMulitplier: 7,
      refreshBelow: 6,
      playerNumber: 1
    };
        
    var newAdmin = new Admin.AdminModel(adminTableData);
        
    //Save pay table row
    newAdmin.save(function(saveErr) {
      if(saveErr) {
        socket.emit('ERROR', JSON.stringify({message: 'Error occured when creating admin table:' + saveErr}));
        return;
      } else {  //Return account data
        socket.emit('admintable_created');
        return;
      }
    });
};

/* ==================================================================================== */
/* This function returns the pay table values.                                          */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: JSON String: {                                                        */
/*                               _id: 'xxxxxxxxx',                                      */
/*                               startingCredits: 9999,                                 */
/*                               timerSeconds: 9999                                     */
/*                               betAmounts: [9999]                                     */
/*                               playerNumber: 9999                                     */
/*                             }                                                        */
/* ==================================================================================== */
var getAdminTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  
  //Return data
  Admin.AdminModel.getAdmin(function(err, adminTableData) {
    if(err || !adminTableData) {
      socket.emit('ADMIN_ERROR', JSON.stringify({message: 'Error retrieving admin table: ' + err}));
      return;
    } else {  //Admin
//console.log("Admin Table: " + JSON.stringify(adminTableData));
      switch(data.callingFunction) {
        case 1: //Admin
          socket.emit('adminTable_retrieved', JSON.stringify(adminTableData));
          break;
        case 2: //Play
        socket.emit('adminTableInfo', JSON.stringify(adminTableData));
          break;
      }
      
        return;
    }
  });
};

/* ==================================================================================== */
/* This function updates the admin table values.                                        */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In: JSON String: {                                                         */
/*                               baseCredits: '999',                                    */
/*                               basePayout: '9999'                                     */
/*                             }                                                        */
/* Variables Out:  None                                                                 */
/* ==================================================================================== */
var updateAdminTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var search = { };
  
  var updateData = {
    $set: { 
      startingCredits: data.startingCredits,
      refreshBelow: data.refreshBelow,
      betAmounts: data.betAmounts,
      variableWagerMulitplier: data.variableWagerMulitplier
    }
  };
  
  Admin.AdminModel.updateAdmin(search, updateData, function(err) {
    if(err) {
      socket.emit('ERROR', JSON.stringify({message: 'Error occured when saving admin table change:' + err}));
      return;
    }
    else { // update session variables
      socket.emit('admintable_updated', JSON.stringify({message: 'Admin Table Successfully Updated'}));
      return;
    }
  });
};


/* ==================================================================================== */
/* This function retrieves the next player number available and increases it by 1.      */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: JSON String: {                                                        */
/*                               playerNumber: '999',                                   */
/*                             }                                                        */
/* ==================================================================================== */
var getPlayerID = function(socket) {
  var playerNumber;
 
  var search = { };
  
  var updateData  = {
      $inc: { 
        'playerNumber': 1
      }
  };
  
  
  Admin.AdminModel.getAndUpdateLastPlayerNumber(search, updateData, function(err, playerNumberData) {
    if(err) {
      socket.emit('ERROR', JSON.stringify({message: 'Error retrieving playerNumber: ' + err}));
      return;
    } 
    
    if(!playerNumberData) {
      playerNumber = 0;    
    } else {
      playerNumber = playerNumberData.playerNumber;
    }
    
    socket.emit('playerNumber_retrieved', JSON.stringify( {playerNumber: playerNumber} ));
    return;
  });
};


// ---------------------------------------------------------------------------------------
// Export functions

module.exports.adminTableCreate = adminTableCreate;
module.exports.getAdminTable = getAdminTable;
module.exports.updateAdminTable = updateAdminTable;
// module.exports.updateBetAmounts = updateBetAmounts;
module.exports.getPlayerID = getPlayerID;