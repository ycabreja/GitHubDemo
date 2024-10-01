/* ==================================================================================== */
/*                                 Magnum Poker                                         */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the model and database functions for the Admin table.             */
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
var mongoose = require("mongoose");

var AdminModel;

var AdminSchema = new mongoose.Schema({
  startingCredits: {
    type: Number,
    required: true,
    default: 0
  },
  betAmounts: [
    {
    type: Number,
    required: true,
    default: 0
    }
  ],
  variableWagerMulitplier: {
    type: Number,
    required: true,
    default: 7
  },
  refreshBelow: {
    type: Number
  },
  playerNumber: {
    type: Number
  }
});

AdminSchema.methods.toAPI = function() {
  return {
    startingCredits: this.startingCredits,
    betAmounts: this.betAmounts,
    refreshBelow: this.refreshBelow,
    dragonBonusWager1BetAmount: this.dragonBonusWager1BetAmount,
    dragonBonusWager2BetAmount: this.dragonBonusWager2BetAmount
  };
};

AdminSchema.statics.getAdmin = function(callback) {

  var search = { };
  
  return AdminModel.findOne(search, callback);
};

// Make updates to the admin table
AdminSchema.statics.updateAdmin = function(search, adminData, callback) {
  return AdminModel.updateOne(search, adminData, callback);
};

// Make updates to the admin table
AdminSchema.statics.getAndUpdateLastPlayerNumber = function(search, updateData, callback) {
  return AdminModel.findOneAndUpdate(search, updateData, callback);
};
//findAndModify

AdminModel = mongoose.model('Admin', AdminSchema);

module.exports.AdminModel = AdminModel;
module.exports.AdminSchema = AdminSchema;
