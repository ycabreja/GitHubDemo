/* ==================================================================================== */
/*                                 Wheel                                                */
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
/* 111320 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */
var mongoose = require("mongoose");

var WheelAdminModel;

var WheelAdminSchema = new mongoose.Schema({
  slices: {
    type: Number,
    required: true,
    default: 16
  },
  betAmounts: [
    {
    type: Number,
    required: true,
    default: 0
    }
  ],
  sliceHits: [
    {
    type: Number,
    required: true,
    default: 0
    }
  ]
});

WheelAdminSchema.methods.toAPI = function() {
  return {
    slices: this.slices,
    betAmounts: this.betAmounts,
    sliceHits: this.sliceHits
  };
};

WheelAdminSchema.statics.getWheelAdmin = function(callback) {

  var search = { };
  
  return WheelAdminModel.findOne(search, callback);
};

// Make updates to the admin table
WheelAdminSchema.statics.updateWheelAdmin = function(search, adminData, callback) {
  return WheelAdminModel.updateOne(search, adminData, callback);
};

WheelAdminModel = mongoose.model('WheelAdmin', WheelAdminSchema);

module.exports.WheelAdminModel = WheelAdminModel;
module.exports.WheelAdminSchema = WheelAdminSchema;
