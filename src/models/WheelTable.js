/* ==================================================================================== */
/*                                 Wheel Test                                           */
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
/* 011020 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */
var mongoose = require("mongoose");

var WheelTableModel;

var WheelTableSchema = new mongoose.Schema({
  wheelType: {  //Reference to number of wheel slices
    type: String,
    required: true,
    trim: true
  },
  wheelStop: {  
    type: Number,
    required: true
  },
  sliceLocation: {
    type: Number,
    required: true,
    default: 0
  },
  baseAmount: {
    type: Number,
    required: true,
    default: 0
  },
  progressive: {
    type: Boolean,
    required: true,
    default: false
  },
  progressiveMinWager: {
    type: Number,
    required: true,
    default: 0
  },
  progressiveBase: {
    type: Number,
    required: true,
    default: 0
  },
  progressiveIncrement: {
    type: Number,
    required: true,
    default: 0
  },
  progressivePool: {
    type: Number,
    required: true,
    default: 0
  }
});

WheelTableSchema.methods.toAPI = function() {
  return {
    wheelType: this.wheelType,
    wheelStop: this.wheelStop,
    sliceLocation: this.sliceLocation,
    baseAmount: this.baseAmount,
    progressiveIncrement: this.progressiveIncrement,
    progressivePool: this.progressivePool
  };
};

WheelTableSchema.statics.findByWagerNumber = function(stopNumber, callback) {

  var search = { wheelStop: stopNumber };

  return WheelTableModel.findOne(search, callback);
};

WheelTableSchema.statics.findByID = function(slideID, callback) {

  var search = { _id: slideID };

  return WheelTableModel.findOne(search, callback);
};

WheelTableSchema.statics.findAll = function(search, callback) {

  return WheelTableModel.find(search, callback).sort({ wheelStop: 1 });
};

// Make updates to the pay table
WheelTableSchema.statics.updateWheelTable = function(search, recordData, callback) {
  return WheelTableModel.updateOne(search, recordData, callback);
};


WheelTableModel = mongoose.model('WheelTable', WheelTableSchema);

module.exports.WheelTableModel = WheelTableModel;
module.exports.WheelTableSchema = WheelTableSchema;
