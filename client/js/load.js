//gamestate for loading assets

var loadState = {
  
  preload: function(){
    
    //Logo
    game.load.image('logo', 'assets/img/pocketaceslogo.png');

    //Table Images
    game.load.image('acesPlusFull', 'assets/img/acesplusfull.png');
    game.load.image('acesPlusPlain', 'assets/img/acesplusplain.png');
    game.load.image('bonus5Card', 'assets/img/bonus5card.png');

    //Wheel Images
    game.load.image('wheelOuter', 'assets/img/wheelOuter_small.png');
    game.load.image('wheelInner', 'assets/img/wheelInner_small.png');
    game.load.image('wheelCenter', 'assets/img/wheelCenter.png');
    game.load.image('wheelWin', 'assets/img/wheel_win.png');
        
    
    //Backgrounds
    game.load.image('background', 'assets/img/greentablelayout_wide.png');    
    game.load.image('chip_holder', 'assets/img/chipholder_darkgrey.png');
    game.load.image('fadetoblack', 'assets/img/fadetoblack.png');
    
    
    //Help
    game.load.image('close', 'assets/img/button_x.png');
    game.load.image('help', 'assets/img/button_help.png');
    game.load.image('next', 'assets/img/button_next.png');
    game.load.image('previous', 'assets/img/button_previous.png');
    game.load.image('exit', 'assets/img/button_exit.png');
    game.load.image('helpArrow', 'assets/img/left_arrow.png');
    
    //SpriteSheet images
    game.load.spritesheet('cards', 'assets/img/cards.png', 79, 123, 57);
    game.load.spritesheet('chips', 'assets/img/chips_spritesheet.png', 512, 512, 13);
    
    //Buttons
    game.load.image('button_blue', 'assets/img/button_blue.png');    
    game.load.image('button_red', 'assets/img/button_red.png');    
    game.load.image('button_green', 'assets/img/button_green.png');    
    game.load.image('button_black', 'assets/img/button_black.png');
    game.load.image('button_gold', 'assets/img/button_gold.v3.png');
    game.load.image('deal_flash', 'assets/img/button_dealFlash_green.png');    

    
    //Win and lose
    game.load.image('win', 'assets/img/button_win.png');
    game.load.image('lose', 'assets/img/button_lose.png');
    
    //Sounds
    game.load.image('sound_on', 'assets/img/button_sound-on.png');
    game.load.image('sound_off', 'assets/img/button_sound-off1.png');
    
    game.load.audio('shuffle', ['assets/sounds/PlayingCards_Shuffle_02.mp3', 'assets/sounds/PlayingCards_Shuffle_02.ogg' ]);
    game.load.audio('deal', ['assets/sounds/PlayingCards_DealFlip_06.mp3', 'assets/sounds/PlayingCards_DealFlip_06.ogg' ]);
    game.load.audio('cardflip', ['assets/sounds/PlayingCards_DealFlip_02.mp3', 'assets/sounds/PlayingCards_DealFlip_02.ogg' ]);
    game.load.audio('cardslide', ['assets/sounds/PlayingCards_Slide_01.mp3', 'assets/sounds/PlayingCards_Slide_01.ogg' ]);
    game.load.audio('bet', ['assets/sounds/Three Chips Bid Sound 2.mp3', 'assets/sounds/Three Chips Bid Sound 2.ogg' ]);
    game.load.audio('win', ['assets/sounds/Four Chips Bid Sound 2.mp3', 'assets/sounds/Four Chips Bid Sound 2.ogg' ]);
    game.load.audio('push', ['assets/sounds/slot_machine_stop_1.mp3', 'assets/sounds/slot_machine_stop_1.ogg' ]);
    game.load.audio('lose', ['assets/sounds/slot_machine_bonus_lose.mp3', 'assets/sounds/slot_machine_bonus_lose.ogg' ]);
    game.load.audio('bonuswin', ['assets/sounds/slot_machine_bonus_win.mp3', 'assets/sounds/slot_machine_bonus_win.ogg' ]);
    game.load.audio('spin', ['assets/sounds/Fortune_Prize_Wheel4.mp3', 'assets/sounds/Fortune_Prize_Wheel4.ogg' ]);    
  },
  
  create: function(){
    var backgroundScaleX = 1.4;
    var backgroundScaleY = 1.285;
    
    this.backgroundSplash = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    this.backgroundSplash.scale.setTo(backgroundScaleX, backgroundScaleY);
    this.backgroundSplash.anchor.set(.5);
    this.backgroundSplash.exists = true;
      
    this.logoSplash = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    this.logoSplash.scale.setTo(.3, .3);
    this.logoSplash.anchor.set(.5);
    this.logoSplash.exists = true;

    this.loadPause = game.time.create();
    this.loadPauseEvent = this.loadPause.add(2000, this.finishLoad, this);
    this.loadPause.start();
  },
  
  finishLoad: function() {
    
      //is the socket already connected
      if(socket != undefined){
        socket.disconnect();  //disconnect and reconnect with a new socket
      }
        
      shuffle = game.add.audio('shuffle');
      deal = game.add.audio('deal');
      cardflip = game.add.audio('cardflip');
      cardslide = game.add.audio('cardslide');
      bet = game.add.audio('bet');
      win = game.add.audio('win');
      push = game.add.audio('push');
      lose = game.add.audio('lose');
      bonusWin = game.add.audio('bonuswin');
      spin = game.add.audio('spin');


      game.sound.setDecodedCallback( [ shuffle, deal, cardflip, cardslide, bet, win, push, lose, bonusWin, spin ], this.connectSocket, this);
    },
    
    
    //connect the socket, set the room info, game settings and
    connectSocket: function(){
        socket = io.connect(socketURL);
        
        //gets config table
        socket.emit('get_adminTable', JSON.stringify({callingFunction: 2}));
        
        //Config data returned
        socket.on('adminTableInfo', function(data){
          adminConfig = JSON.parse(data);
//          console.log(adminConfig);
          socket.emit('get_bonusTable', JSON.stringify({callingFunction: 2, type: 'bonus'}));
        }.bind(this));
        
        //retrieved bonus table data 
        socket.on('bonustableInfo', function(data){
          var returnData = JSON.parse(data);

          //Hearts bonus called after config data returned.  When Hearts data returned,
          //attack bonus data called.  Attack data retrieval starts game.
          switch(returnData.type) {
            case "bonus":
              bonusTableData = returnData.bonusData;
              socket.emit('get_bonusTable', JSON.stringify({callingFunction: 2, type: 'acesplus'}));
              break;
            case "acesplus":
              acesPlusData = returnData.bonusData;
              socket.emit('get_bonusTable', JSON.stringify({callingFunction: 2, type: 'blindbonus'}));
              break;
            case "blindbonus":
              blindBonusTableData = returnData.bonusData;
              socket.emit('get_wheelAdminTable', JSON.stringify({callingFunction: 2}));
              break;
          }
        }.bind(this));

        //Config data returned
        socket.on('wheeladminTableInfo', function(data){
          wheelAdminConfig = JSON.parse(data);
          console.log(wheelAdminConfig);
          socket.emit('get_wheelTable', JSON.stringify({callingFunction: 2, type: 'slice16'}));
        }.bind(this));
        
        //retrieved wheel table data 
        socket.on('wheeltableInfo', function(data){
          var returnData = JSON.parse(data);

          switch(returnData.type) {
            case "slice16":
              wheelTableData = returnData.wheelData;
              game.state.start('play');
              break;
          }
        }.bind(this));

        //if there was an error
        socket.on('ERROR', function(data){
          this.messageData = JSON.parse(data);
          console.log(this.messageData.message);
        }.bind(this));

        this.gamePlaySockets();
    },
    
    gamePlaySockets: function() {
      //Wheel Table Updated
      socket.on('progressive_updated', function(data){
        socket.emit('get_wheelTable', JSON.stringify({callingFunction: 3, type: 'slice16'}));
      });

      //retrieved updated progressive amounts from wheel table
      socket.on('wheelTableUpdate', function(data){
        var returnData = JSON.parse(data);

        switch(returnData.type) {
          case "slice16":
            wheelTableData = returnData.wheelData;
            break;
        }
      }.bind(this));
      
    }
};