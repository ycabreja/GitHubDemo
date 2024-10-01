/* ==================================================================================== */
/*                                  Pocket Aces                                         */
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
/* 101320 |       NA         | Original Code                                            */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ------------------------------------------------------------------------------------ */
/*        |                  |                                                          */
/* ==================================================================================== */

var adminConfig;
var bonusTableData;
var acesPlusTableData;
var blindBonusTableData;

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
//Prepopulate the 5 Card Bonus pay table
    $('#bonustable-create').click(function() {
        bonusTablePrepopulate();
        
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Prepopulate the Aces Plus pay table
    $('#acesplustable-create').click(function() {
        acesPlusTablePrepopulate();
        
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Prepopulate Ante Bonus pay table
    $('#blindbonustable-create').click(function() {
        blindBonusTablePrepopulate();
        
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Prepolutate admin table
    $('#config-create').click(function() {
        socket.emit('create_admintable');
        return false;
    });

//----------------------------------------------------------------------------------------------------------
//Save Game Configuration items
    $('#config-save').click(function() {
        var startingCredits = $('#startingCredits').val();
        var refreshBelow = $('#refresh').val();
        var bet1Amount = $('#bet1Amount').val();
        var bet2Amount = $('#bet2Amount').val();
        var bet3Amount = $('#bet3Amount').val();
        var bet4Amount = $('#bet4Amount').val();
        var bet5Amount = $('#bet5Amount').val();
        var bet6Amount = $('#bet6Amount').val();
        
        var betAmounts = [bet1Amount, bet2Amount, bet3Amount, bet4Amount, bet5Amount, bet6Amount];
        
        var variableWagerMultiplier = $('#variablewager').val();
        
        socket.emit('update_config', JSON.stringify({startingCredits: startingCredits, refreshBelow: refreshBelow, betAmounts: betAmounts, variableWagerMulitplier: variableWagerMultiplier}));
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
    
    //connect the socket
    if(socket === undefined){
        socket = io.connect(socketURL);
    }

    defineSockets();
    
    socket.emit('get_adminTable', JSON.stringify({callingFunction: 1}));
    socket.emit('get_bonusTable', JSON.stringify({callingFunction: 1, type: 'bonus'}));
    socket.emit('get_bonusTable', JSON.stringify({callingFunction: 1, type: 'acesplus'}));
    socket.emit('get_bonusTable', JSON.stringify({callingFunction: 1, type: 'blindbonus'}));
    
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
      alert("Admin Table Needs to be Created");      
    });

    //return from bonus table create calls
    socket.on('bonustable_created', function(data){
      var returnData = jQuery.parseJSON(data);
      
      switch(returnData.type) {
        case "bonus":
          socket.emit('get_bonusTable', JSON.stringify({callingFunction: 1, type: 'bonus'}));
          $('#bonustable-create').hide();
          break;
        case "acesplus":
          socket.emit('get_bonusTable', JSON.stringify({callingFunction: 1, type: 'acesplus'}));
          $('#acesplustable-create').hide();
          break;
        case "blindbonus":
          socket.emit('get_bonusTable', JSON.stringify({callingFunction: 1, type: 'blindbonus'}));
          $('#blindbonustable-create').hide();
          break;
      }
    });

    //Bonus table data retrieved
    socket.on('bonustable_retrieved', function(data){
      var returnData = jQuery.parseJSON(data);

      switch(returnData.type) {
        case "bonus":
          bonusTableData = returnData;
          createOddsBasedBonusTable(bonusTableData.bonusData, bonusTableData.type);
          break;
        case "acesplus":
          acesPlusTableData = returnData;
          createOddsBasedBonusTable(acesPlusTableData.bonusData, acesPlusTableData.type);
          break;
        case "blindbonus":
          blindBonusTableData = returnData;
          createOddsBasedBonusTable(blindBonusTableData.bonusData, blindBonusTableData.type);
          break;
      }
    });

    //Bonus Table Updated
    socket.on('bonustable_updated', function(data){
//      alert("Table Updated");
    });
    
    //return from admin table create
    socket.on('admintable_created', function(){
      $('#create_button').hide();
      $('#save_button').show();      
      socket.emit('get_adminTable', JSON.stringify({callingFunction: 1}));
    });

    //Admin Table data retrieved
    socket.on('adminTable_retrieved', function(data){
      adminConfig = jQuery.parseJSON(data);
      $('#config-create').hide();
      $('#startingCredits').val(adminConfig.startingCredits);
      $('#refresh').val(adminConfig.refreshBelow);
      $('#bet1Amount').val(adminConfig.betAmounts[0]);
      $('#bet2Amount').val(adminConfig.betAmounts[1]);
      $('#bet3Amount').val(adminConfig.betAmounts[2]);
      $('#bet4Amount').val(adminConfig.betAmounts[3]);
      $('#bet5Amount').val(adminConfig.betAmounts[4]);
      $('#bet6Amount').val(adminConfig.betAmounts[5]);
      $('#variablewager').val(adminConfig.variableWagerMulitplier);
    });

    //Admin Table Updated
    socket.on('admintable_updated', function(){
      alert("Value(s) Updated");
    });
    

}

//============================================================================================================
//============================================================================================================

function bonusTablePrepopulate() {

/*==========================================================================================================*/
/* This function defines the original values on the bonus table for the 5 Card bonus.                       */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

    var tableData = [
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: 'Royal Flush',
        handRank: 1,
        bonus: 100,
        bonusBase: 1
      },
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: 'Straight Flush',
        handRank: 2,
        bonus: 50,
        bonusBase: 1
      },
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: '4 of a Kind',
        handRank: 3,
        bonus: 30,
        bonusBase: 1
      },
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: 'Full House',
        handRank: 4,
        bonus: 8,
        bonusBase: 1
      },
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: 'Flush',
        handRank: 5,
        bonus: 7,
        bonusBase: 1
      },
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: 'Straight',
        handRank: 6,
        bonus: 4,
        bonusBase: 1
      },
      {
        bonusType: "bonus",
        payOutType: 1,
        displayHand: 'Trips',
        handRank: 7,
        bonus: 3,
        bonusBase: 1
      }
    ];
        
     socket.emit('create_oddsbasedbonustable', JSON.stringify(tableData));

}

//============================================================================================================
//============================================================================================================

function acesPlusTablePrepopulate() {

/*==========================================================================================================*/
/* This function defines the original values on the bonus table for the Pocket Aces Plus bonus.             */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

    var tableData = [
      {
        bonusType: "acesplus",
        payOutType: 1,
        displayHand: 'Pair of Aces',
        handRank: 1,
        bonus: 40,
        bonusBase: 1
      },
      {
        bonusType: "acesplus",
        payOutType: 1,
        displayHand: 'Ace/Face Suited',
        handRank: 2,
        bonus: 20,
        bonusBase: 1
      },
      {
        bonusType: "acesplus",
        payOutType: 1,
        displayHand: 'Ace/Face Unsuited',
        handRank: 3,
        bonus: 10,
        bonusBase: 1
      },
      {
        bonusType: "acesplus",
        payOutType: 1,
        displayHand: 'Pair',
        handRank: 4,
        bonus: 4,
        bonusBase: 1
      }
    ];
        
     socket.emit('create_oddsbasedbonustable', JSON.stringify(tableData));

}

//============================================================================================================
//============================================================================================================

function blindBonusTablePrepopulate() {

/*==========================================================================================================*/
/* This function defines the original values on the bonus table for the Ante bonus.                         */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

    var tableData = [
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: 'Royal Flush',
        handRank: 1,
        bonus: 200,
        bonusBase: 1
      },
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: 'Straight Flush',
        handRank: 2,
        bonus: 50,
        bonusBase: 1
      },
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: '4 of a Kind',
        handRank: 3,
        bonus: 10,
        bonusBase: 1
      },
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: 'Full House',
        handRank: 4,
        bonus: 3,
        bonusBase: 1
      },
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: 'Flush',
        handRank: 5,
        bonus: 3,
        bonusBase: 2
      },
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: 'Straight',
        handRank: 6,
        bonus: 1,
        bonusBase: 1
      },
      {
        bonusType: "blindbonus",
        payOutType: 1,
        displayHand: 'All Other',
        handRank: 7,
        bonus: 1,
        bonusBase: 0
      }
    ];
        
     socket.emit('create_oddsbasedbonustable', JSON.stringify(tableData));

}

//============================================================================================================
//============================================================================================================

function createOddsBasedBonusTable(bonusTableData, type) {

/*==========================================================================================================*/
/* This function creates the pay table on the page.                                                         */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  page_actions()                                                                             */
/*==========================================================================================================*/

var htmlString;
var tableName;
var prePopulateButtonName;

  switch(type) {
    case "bonus":
      tableName = 'bonusTable';
      prePopulateButtonName = '#bonustable-create';
      break;
    case "acesplus":
      tableName = 'acesPlusTable';
      prePopulateButtonName = '#acesplustable-create';
      break;
    case "blindbonus":
      tableName = 'blindBonusTable';
      prePopulateButtonName = '#blindbonustable-create';
      break;
  }
  
  var tableID = "#" + tableName;
  
  if(bonusTableData.length === 0) {
    htmlString = "<tr>";
        htmlString += "<td colspan='2'>";
          htmlString += "<div class='empty_table_message'>";
            htmlString += "No Pay Data to show";
          htmlString += "</div>";
        htmlString += "</td>";
     htmlString += "</tr>";
     
     $(tableID).html(htmlString);
  } else {  //Build Pay table
    $(prePopulateButtonName).hide();
    
    var cellID1;
    var cellID2;
    var cellID3;
    
    for(var i=0; i< bonusTableData.length; i++) {
      cellID1 = tableName + "cellNumber" + bonusTableData[i].handRank + "1";
      cellID2 = tableName + "cellNumber" + bonusTableData[i].handRank + "2";
      cellID3 = tableName + "cellNumber" + bonusTableData[i].handRank + "3";
      
      htmlString += "<tr>";
        htmlString += "<td>";
          htmlString += "<input type='text' class='displayName_input' ";
          htmlString += "id='" + cellID1 + "' ";
          htmlString += "onchange='updateBonusTable(\"#" + cellID1 + "\", ";
          htmlString += "\"" + bonusTableData[i]._id + "\", 1)' ";
          htmlString += "value='" + bonusTableData[i].displayHand + "' ";
          htmlString += "size='30'>";
        htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "<input type='text' class='ante_input' ";
            htmlString += "id='" + cellID2 + "' ";
            htmlString += "onchange='updateBonusTable(\"#" + cellID2 + "\", ";
            htmlString += "\"" + bonusTableData[i]._id + "\", 2)' ";
            htmlString += "value='" + bonusTableData[i].bonus + "' ";
            htmlString += "size='1'>";
          htmlString += "</center>";
        htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "to";
          htmlString += "</center>";
        htmlString +="</td>";
        htmlString += "<td>";
          htmlString += "<center>";
            htmlString += "<input type='text' class='ante_input' ";
            htmlString += "id='" + cellID3 + "' ";
            htmlString += "onchange='updateBonusTable(\"#" + cellID3 + "\", ";
            htmlString += "\"" + bonusTableData[i]._id + "\", 3)' ";
            htmlString += "value='" + bonusTableData[i].bonusBase + "' ";
            htmlString += "size='1'>";
          htmlString += "</center>";
        htmlString +="</td>";
      htmlString +="</tr>";      
    }
    
    $(tableID).html(htmlString);
  }
}


//============================================================================================================
//============================================================================================================

function updateBonusTable(cellName, rowID, elementNumber) {

/*==========================================================================================================*/
/* This function updates the dragon bonus data on the database.                                             */
/*                                                                                                          */
/*----------------------------------------------------------------------------------------------------------*/
/* Calls To:     None                                                                                       */
/*                                                                                                          */
/* Called From:  html                                                                                       */
/*==========================================================================================================*/

  var cellObject = $(cellName);
  var newValue = $(cellObject).val();
  
  socket.emit('update_bonustable', JSON.stringify({rowID: rowID, elementNumber: elementNumber, value: newValue}));

}

//============================================================================================================
//============================================================================================================

