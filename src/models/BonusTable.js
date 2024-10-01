/* ==================================================================================== */
/*                                 Magnum Poker                                         */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the model and database functions for the Bonus Pay Tables.        */
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

var BonusTableModel;

var BonusTableSchema = new mongoose.Schema({
  bonusType: {  //Reference to bonus table used
    type: String,
    required: true,
    trim: true
  },
  payOutType: {  //1 - odds-based bonus, 2 - direct bet bonus
    type: Number,
    required: true
  },
  displayHand: {
    type: String,
    required: true,
    trim: true
  },
  handRank: {
    type: Number,
    required: true
  },
  bonus: {
    type: Number,
    required: true,
    default: 0
  },
  bonusBase: {
    type: Number,
    required: true,
    default: 0
  },
  wager1Win: {
    type: Number,
    required: true,
    default: 0
  },
  wager2Win: {
    type: Number,
    required: true,
    default: 0
  }
});

BonusTableSchema.methods.toAPI = function() {
  return {
    displayHand: this.displayHand,
    handRank: this.handRank,
    oddsBonus: this.oddsBonus,
    betBonus: this.betBonus
  };
};

BonusTableSchema.statics.findByDisplayName = function(displayName, callback) {

  var search = { displayHand: displayName };

  return BonusTableModel.findOne(search, callback);
};

BonusTableSchema.statics.findByID = function(handID, callback) {

  var search = { _id: handID };

  return BonusTableModel.findOne(search, callback);
};

BonusTableSchema.statics.findAll = function(search, callback) {

  return BonusTableModel.find(search, callback).sort({ handRank: 1 });
};

// Make updates to the pay table
BonusTableSchema.statics.updateBonusTable = function(search, recordData, callback) {
  return BonusTableModel.updateOne(search, recordData, callback);
};

BonusTableModel = mongoose.model('BonusTable', BonusTableSchema);


module.exports.BonusTableModel = BonusTableModel;
module.exports.BonusTableSchema = BonusTableSchema;
