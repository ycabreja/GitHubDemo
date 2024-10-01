/* ==================================================================================== */
/*                                 Wheel                                                */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the socket call code for a WheelAdmin Configuration functions.         */
/* ------------------------------------------------------------------------------------ */
/* Calls To:     None                                                                   */
/*                                                                                      */
/* Called From:  src/socket-routes.js                                                   */
/* ==================================================================================== */
/*                                            CHANGE LOG                                */
/* ------------------------------------------------------------------------------------ */
/* DATE   |    CHANGE ID     | CHANGE DESCRIPTION / NOTES                               */
/* ------------------------------------------------------------------------------------ */
/* 111320 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */

// Imports
var Models = require('../models');
var WheelAdmin = Models.WheelAdmin;


/* ==================================================================================== */
/* This function creates the admin table.                                               */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: None                                                                  */
/* ==================================================================================== */
var wheelAdminTableCreate = function(socket) {
  
  var adminTableData = {
      slices: 16,
      sliceHits: [400, 2025, 3155, 3500, 4000, 3500, 3000, 2200, 1600, 900, 400, 225, 60, 28, 6, 1],
      betAmounts: [1,2,3,4,5]
    };
        
    var newWheelAdmin = new WheelAdmin.WheelAdminModel(adminTableData);
        
    //Save pay table row
    newWheelAdmin.save(function(saveErr) {
      if(saveErr) {
        socket.emit('ERROR', JSON.stringify({message: 'Error occured when creating admin table:' + saveErr}));
        return;
      } else {  //Return account data
        socket.emit('wheeladmintable_created');
        return;
      }
    });
};

/* ==================================================================================== */
/* This function returns the admin table values.                                        */
/* ------------------------------------------------------------------------------------ */
/* Called From:  socket-routes.js                                                       */
/*                                                                                      */
/* Variables In:  None                                                                  */
/* Variables Out: JSON String: {                                                        */
/*                               _id: 'xxxxxxxxx',                                      */
/*                               slices: 9999,                                          */
/*                               betAmounts: [9999]                                     */
/*                             }                                                        */
/* ==================================================================================== */
var getWheelAdminTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  
  //Return data
  WheelAdmin.WheelAdminModel.getWheelAdmin(function(err, adminTableData) {
    if(err || !adminTableData) {
      socket.emit('ADMIN_ERROR', JSON.stringify({message: 'Error retrieving admin table: ' + err}));
      return;
    } else {  //WheelAdmin
//console.log("WheelAdmin Table: " + JSON.stringify(adminTableData));
      switch(data.callingFunction) {
        case 1: //WheelAdmin
          socket.emit('wheeladminTable_retrieved', JSON.stringify(adminTableData));
          break;
        case 2: //Play
        socket.emit('wheeladminTableInfo', JSON.stringify(adminTableData));
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
/*                               slices: '999',                                         */
/*                               betAmounts: [9999]                                     */
/*                             }                                                        */
/* Variables Out:  None                                                                 */
/* ==================================================================================== */
var updateWheelAdminTable = function(dataIn, socket) {
  var data = JSON.parse(dataIn);
  var search = { };
  var updateData = {};
  
  if(data.type = 1) {
    updateData = {
      $set: { 
        slices: data.slices,
        betAmounts: data.betAmounts
      }
    };
  } else {
    updateData = {
      $set: { 
        sliceHits: data.sliceHits
      }
    };
  }
  
  WheelAdmin.WheelAdminModel.updateWheelAdmin(search, updateData, function(err) {
    if(err) {
      socket.emit('ERROR', JSON.stringify({message: 'Error occured when saving admin table change:' + err}));
      return;
    }
    else { // update session variables
      socket.emit('wheeladmintable_updated', JSON.stringify({message: 'WheelAdmin Table Successfully Updated'}));
      return;
    }
  });
};



// ---------------------------------------------------------------------------------------
// Export functions

module.exports.wheelAdminTableCreate = wheelAdminTableCreate;
module.exports.getWheelAdminTable = getWheelAdminTable;
module.exports.updateWheelAdminTable = updateWheelAdminTable;