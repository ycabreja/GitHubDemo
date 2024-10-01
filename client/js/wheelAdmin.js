/* ==================================================================================== */
/*                                  Wheel                                               */
/*                              Copyright (c) 2020                                      */
/*                                 TIOLI GAMING                                         */
/*                                                                                      */
/* This file contains the javascript code specific to the Admin page.                   */
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

var wheelAdminConfig;
var wheelTableData;

function page_actions() {

/*==========================================================================================================*/
/* This function binds the page element actions that occur when the user interacts with the page.           */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     clear_form()                                                                               */
/*                                                                                                          */
/* Called From:  admin.html                                                                                 */
/*==========================================================================================================*/

//----------------------------------------------------------------------------------------------------------
//Prepopulate the Top Flush Bonus pay table
    $('#wheeltable-create').click(function() {
        wheelTablePrepopulate();
        
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Prepolutate admin table
    $('#config-create').click(function() {
        socket.emit('create_wheelAdminTable');
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Save Game Configuration items
    $('#config-save').click(function() {
        var pageObject;
        var betAmounts = [];
          
        var slices = $('#slices').val();
        
        for(var i=0; i<wheelAdminConfig.betAmounts.length; i++) {
          pageObject = "#bet" + (i+1) + "Amount";
          betAmounts.push($(pageObject).val());
        }
        
        socket.emit('update_wheel_config', JSON.stringify({slices: slices, betAmounts: betAmounts, type: 1}));
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Save Odds Configuration items
    $('#configOdds-save').click(function() {
      var sliceOdds = [];
      var pageObject;
      
      for(var i=0; i<wheelAdminConfig.sliceHits.length; i++) {
        pageObject = "#slice" + (i+1) + "Odds";
        sliceOdds.push($(pageObject).val());
      }

        socket.emit('update_wheel_config', JSON.stringify({sliceHits: sliceOdds, type: 2}));
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Change Odds value
    $('.hits').change(function() {
        var elementChanged = parseInt(this.getAttribute("data-arrayNum"));
        var elementAmount = parseInt($(this).val());

        wheelAdminConfig.sliceHits[elementChanged] = elementAmount;
        
        addHitsTotal(wheelAdminConfig.sliceHits);
        return false;
    });

}

//============================================================================================================
//============================================================================================================

function page_initialize() {

/*==========================================================================================================*/
/* This function prepares the page for use upon initial load or refresh.                                    */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  admin.html                                                                                 */
/*==========================================================================================================*/

    $("#tabs").tabs();
    $("#wheelPaytTableTabs").tabs();
    
    //connect the socket
    if(socket === undefined){
        socket = io.connect(socketURL);
    }

    defineSockets();
    
    socket.emit('get_wheelAdminTable', JSON.stringify({callingFunction: 1}));
    
}

//============================================================================================================
//============================================================================================================

function defineSockets() {

/*==========================================================================================================*/
/* This function defines the socket calls recieved from the server.                                         */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_initialize()                                                                          */
/*==========================================================================================================*/

    //If Error occurs
    socket.on('ERROR', function(data){
      var return_data = jQuery.parseJSON(data);
      alert(return_data.message);      
    });

    //If Error occurs
    socket.on('ADMIN_ERROR', function(data){
      $('#save_button').hide();      
      $('#create_button').show();
      alert("Wheel Admin Table Needs to be Created");      
    });

    //return from bonus table create calls
    socket.on('wheeltable_created', function(data){
      var returnData = jQuery.parseJSON(data);
      
      switch(returnData.type) {
        case "slice16":
          socket.emit('get_wheelTable', JSON.stringify({callingFunction: 1, type: 'slice16'}));
          $('#wheeltable-create').hide();
          break;
      }
    });

    //Bonus table data retrieved
    socket.on('wheeltable_retrieved', function(data){
      var returnData = jQuery.parseJSON(data);

      switch(returnData.type) {
        case "slice16":
          wheelTableData = returnData;
          createWheelTable(wheelTableData.wheelData, "baseAmountsTable", "wheeltable-create");
          break;
      }
    });

    //Wheel Table Updated
    socket.on('wheeltable_updated', function(data){
      returnData = jQuery.parseJSON(data);
      
      if(returnData.refresh) {
        socket.emit('get_wheelTable', JSON.stringify({callingFunction: 1, type: 'slice16'}));
      }
    });
    
    //return from admin table create
    socket.on('wheeladmintable_created', function(){
      $('#create_button').hide();
      $('#save_button').show();
      socket.emit('get_wheelAdminTable', JSON.stringify({callingFunction: 1}));
    });

    //Admin Table data retrieved
    socket.on('wheeladminTable_retrieved', function(data){
      wheelAdminConfig = jQuery.parseJSON(data);
      $('#config-create').hide();
      $('#slices').val(wheelAdminConfig.slices);
      
      var pageObject;
      for(var i=0; i<wheelAdminConfig.betAmounts.length; i++) {
        pageObject = "#bet" + (i+1) + "Amount";
        $(pageObject).val(wheelAdminConfig.betAmounts[i]);
      }
      
      for(var i=0; i<wheelAdminConfig.sliceHits.length; i++) {
        pageObject = "#slice" + (i+1) + "Odds";
        $(pageObject).val(wheelAdminConfig.sliceHits[i]);
      }
      
      addHitsTotal(wheelAdminConfig.sliceHits);
      
      socket.emit('get_wheelTable', JSON.stringify({callingFunction: 1, type: 'slice16'}));
    });

    //Admin Table Updated
    socket.on('wheeladmintable_updated', function(){
      alert("Value(s) Updated");
      socket.emit('get_wheelAdminTable', JSON.stringify({callingFunction: 1}));
    });
    

}

//============================================================================================================
//============================================================================================================

function addHitsTotal(hitsArray) {

/*==========================================================================================================*/
/* This function adds the total hits and populates the total hits element.                                  */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

    var totalHits = 0;
    for(var i=0; i<hitsArray.length; i++){
      totalHits += hitsArray[i];
    }
    
    $("#totalHits").val(totalHits.toLocaleString(undefined, {maximumFractionDigits: 0}));

}


//============================================================================================================
//============================================================================================================

function wheelTablePrepopulate() {

/*==========================================================================================================*/
/* This function defines the original values on the bonus table for the hearts bonus.                       */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

    var tableData = [
      {
        wheelType: "slice16",
        wheelStop: 1,
        sliceLocation: 5,
        baseAmount: 5,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 2,
        sliceLocation: 3,
        baseAmount: 7,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 3,
        sliceLocation: 9,
        baseAmount: 10,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 4,
        sliceLocation: 0,
        baseAmount: 12,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 5,
        sliceLocation: 11,
        baseAmount: 15,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 6,
        sliceLocation: 15,
        baseAmount: 20,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 7,
        sliceLocation: 13,
        baseAmount: 25,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 8,
        sliceLocation: 6,
        baseAmount: 30,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 9,
        sliceLocation: 8,
        baseAmount: 40,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 10,
        sliceLocation: 12,
        baseAmount: 50,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 11,
        sliceLocation: 2,
        baseAmount: 75,
        progressiveBase: 0,
        progressive: false,
        progressiveMinWager: 0,
        progressiveIncrement: 0,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 12,
        sliceLocation: 7,
        baseAmount: 100,
        progressiveBase: 1,
        progressive: true,
        progressiveMinWager: 5,
        progressiveIncrement: 14,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 13,
        sliceLocation: 10,
        baseAmount: 125,
        progressiveBase: 1,
        progressive: true,
        progressiveMinWager: 4,
        progressiveIncrement: 11,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 14,
        sliceLocation: 1,
        baseAmount: 200,
        progressiveBase: 1,
        progressive: true,
        progressiveMinWager: 3,
        progressiveIncrement: 8,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 15,
        sliceLocation: 14,
        baseAmount: 1000,
        progressiveBase: 1,
        progressive: true,
        progressiveMinWager: 2,
        progressiveIncrement: 6,
        progressivePool: 0
      },
      {
        wheelType: "slice16",
        wheelStop: 16,
        sliceLocation: 4,
        baseAmount: 5000,
        progressiveBase: 1,
        progressive: true,
        progressiveMinWager: 1,
        progressiveIncrement: 4,
        progressivePool: 0
      }
    ];
        
     socket.emit('create_wheeltable', JSON.stringify(tableData));

}

//============================================================================================================
//============================================================================================================

function createWheelTable(wheelTable, tableName, prePopulateButtonName) {

/*==========================================================================================================*/
/* This function creates the wheel tables on the page.                                                      */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

var htmlString = "";
var tableID = "#" + tableName;
var prepoluateButtonID = "#" + prePopulateButtonName;
  
  //Create table if exists or put message if doesn't exist
  if(wheelTable.length === 0) {
    htmlString = "<tr>";
        htmlString += "<td colspan='2'>";
          htmlString += "<div class='empty_table_message'>";
            htmlString += "No Pay Data to show";
          htmlString += "</div>";
        htmlString += "</td>";
     htmlString += "</tr>";
     
     $(tableID).html(htmlString);
  } else {  //Build Pay table
    $(prepoluateButtonID).hide();
    
    var cellID1;
    var cellID2;
    var cellID3;
    var cellID4;
    var cellID5;
    var cellID6;
    var cellID7;
    
    for(var i=0; i< wheelTable.length; i++) {
      
      cellID1 = tableName + "cellNumber" + i + "1";
      cellID2 = tableName + "cellNumber" + i + "2";
      cellID3 = tableName + "cellNumber" + i + "3";
      cellID4 = tableName + "cellNumber" + i + "4";
      cellID5 = tableName + "cellNumber" + i + "5";
      cellID6 = tableName + "cellNumber" + i + "6";
      cellID7 = tableName + "cellNumber" + i + "7";
      
      var progressive = (wheelTable[i].progressive) ? "Y": "N";
      
      htmlString += "<tr>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "<label class='displayName_input'>";
            htmlString += (i+1);
            htmlString += "</label>";
          htmlString += "</center>";
        htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<input type='text' class='displayName_input' ";
          htmlString += "id='" + cellID1 + "' ";
          htmlString += "onchange='updateWheelTable(\"#" + cellID1 + "\", ";
          htmlString += "\"" + wheelTable[i]._id + "\", 1)' ";
          htmlString += "value='" + wheelTable[i].sliceLocation + "' ";
          htmlString += "size='30'>";
        htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "<input type='text' class='ante_input' ";
            htmlString += "id='" + cellID2 + "' ";
            htmlString += "onchange='updateWheelTable(\"#" + cellID2 + "\", ";
            htmlString += "\"" + wheelTable[i]._id + "\", 2)' ";
            htmlString += "value='" + wheelTable[i].baseAmount + "' ";
            htmlString += "size='1'>";
          htmlString += "</center>";
        htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "<input type='text' class='ante_input' ";
            htmlString += "id='" + cellID3 + "' ";
            htmlString += "onchange='updateWheelTable(\"#" + cellID3 + "\", ";
            htmlString += "\"" + wheelTable[i]._id + "\", 3)' ";
            htmlString += "value='" + progressive + "' ";
            htmlString += "size='1'>";
          htmlString += "</center>";
        htmlString +="</td>";
        if(wheelTable[i].progressive) {
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<input type='text' class='ante_input' ";
              htmlString += "id='" + cellID4 + "' ";
              htmlString += "onchange='updateWheelTable(\"#" + cellID4 + "\", ";
              htmlString += "\"" + wheelTable[i]._id + "\", 4)' ";
              htmlString += "value='" + wheelTable[i].progressiveMinWager + "' ";
              htmlString += "size='1'>";
            htmlString += "</center>";
          htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "<input type='text' class='ante_input' ";
            htmlString += "id='" + cellID5 + "' ";
            htmlString += "onchange='updateWheelTable(\"#" + cellID5 + "\", ";
            htmlString += "\"" + wheelTable[i]._id + "\", 5)' ";
            htmlString += "value='" + wheelTable[i].progressiveBase + "' ";
            htmlString += "size='1'>";
          htmlString += "</center>";
        htmlString +="</td>";
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<input type='text' class='ante_input' ";
              htmlString += "id='" + cellID6 + "' ";
              htmlString += "onchange='updateWheelTable(\"#" + cellID6 + "\", ";
              htmlString += "\"" + wheelTable[i]._id + "\", 6)' ";
              htmlString += "value='" + wheelTable[i].progressiveIncrement + "' ";
              htmlString += "size='1'>";
            htmlString += "</center>";
          htmlString +="</td>";
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<input type='text' class='ante_input' ";
              htmlString += "id='" + cellID7 + "' ";
              htmlString += "onchange='updateWheelTable(\"#" + cellID7 + "\", ";
              htmlString += "\"" + wheelTable[i]._id + "\", 7)' ";
              htmlString += "value='" + wheelTable[i].progressivePool.toLocaleString(undefined, {maximumFractionDigits: 2}) + "' ";
              htmlString += "size='1'>";
            htmlString += "</center>";
          htmlString +="</td>";
        } else {
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<label class='displayName_input'>";
              htmlString += " "; //Min Wager hidden
              htmlString += "</label>";
            htmlString += "</center>";
          htmlString += "</td>";
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<label class='displayName_input'>";
              htmlString += " "; //Prgressive Base hidden
              htmlString += "</label>";
            htmlString += "</center>";
          htmlString += "</td>";
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<label class='displayName_input'>";
              htmlString += " "; //Prgressive Increment hidden
              htmlString += "</label>";
            htmlString += "</center>";
          htmlString += "</td>";
          htmlString += "<td>";
            htmlString += "<center>";
              htmlString += "<label class='displayName_input'>";
              htmlString += " "; //Prgressive Pool hidden
              htmlString += "</label>";
            htmlString += "</center>";
          htmlString += "</td>";          
        }
      htmlString +="</tr>";      
    }
    
    $(tableID).html(htmlString);
  }
}

//============================================================================================================
//============================================================================================================

function updateWheelTable(cellName, rowID, elementNumber) {

/*==========================================================================================================*/
/* This function updates the dragon bonus data on the database.                                             */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  html                                                                                       */
/*==========================================================================================================*/

  var cellObject = $(cellName);
  var newValue;
  var refresh;
  
  if(elementNumber === 3) {
    newValue = ($(cellObject).val().toUpperCase() === 'Y') ? 1: 0;
    refresh = true;
  } else {
    newValue = $(cellObject).val();
    refresh = false;
  }

  socket.emit('update_wheelTable', JSON.stringify({rowID: rowID, elementNumber: elementNumber, value: newValue, refresh: refresh}));

}

//============================================================================================================
//============================================================================================================

