/* ==================================================================================== */
/*                                 Magnum Poker                                         */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the code used to for routing socket.io calls                      */
/* ------------------------------------------------------------------------------------ */
/* Calls To:     None                                                                   */
/*                                                                                      */
/* Called From:  src/app.js                                                             */
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

var Sockets = require('./sockets');

var socketRouter = function(io) {
  // socket.io events and functions
  // on initial connection
  io.on('connection', function(socket) {
    
    //Create the bet based bonus tables
    socket.on('create_betbasedbonustable', function(dataIn){
      Sockets.BonusTable.betBasedBonusTableCreate(dataIn, socket);
    });

    //Create the odds based bonus tables
    socket.on('create_oddsbasedbonustable', function(dataIn){
      Sockets.BonusTable.oddsBasedBonusTableCreate(dataIn, socket);
    });

    //Retrieve the bonus table
    socket.on('get_bonusTable', function(dataIn){
      Sockets.BonusTable.getBonusTable(dataIn, socket);
    });

    //Update the bonus table
    socket.on('update_bonustable', function(dataIn){
      Sockets.BonusTable.updateBonusTable(dataIn, socket);
    });

    //Create the admin table
    socket.on('create_admintable', function(){
      Sockets.Admin.adminTableCreate(socket);
    });

    //Get Admin Configuration
    socket.on('get_adminTable', function(dataIn){
      Sockets.Admin.getAdminTable(dataIn, socket);
    });

    //Update Config
    socket.on('update_config', function(dataIn){
      Sockets.Admin.updateAdminTable(dataIn, socket);
    });

    socket.on('update_betAmounts', function(dataIn){
      Sockets.Admin.updateBetAmounts(dataIn, socket);
    });
    
    //Create the wheel admin table
    socket.on('create_wheelAdminTable', function(){
      Sockets.WheelAdmin.wheelAdminTableCreate(socket);
    });

    //Retrieve the wheel admin table
    socket.on('get_wheelAdminTable', function(dataIn){
      Sockets.WheelAdmin.getWheelAdminTable(dataIn, socket);
    });

    //Update the wheel admin table
    socket.on('update_wheel_config', function(dataIn){
      Sockets.WheelAdmin.updateWheelAdminTable(dataIn, socket);
    });

    //Create the wheel table
    socket.on('create_wheeltable', function(dataIn){
      Sockets.WheelTable.wheelTableCreate(dataIn, socket);
    });

    //Get Wheel Table
    socket.on('get_wheelTable', function(dataIn){
      Sockets.WheelTable.getWheelTable(dataIn, socket);
    });

    //Update Wheel Table
    socket.on('update_wheelTable', function(dataIn){
      Sockets.WheelTable.updateWheelTable(dataIn, socket);
    });

    //Get player id# from admin table
    socket.on('get_playerId', function(){
      Sockets.Admin.getPlayerID(socket);
    });
    
  });
};

module.exports.socketRouter = socketRouter;
