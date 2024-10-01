//gamestate for Phaser settings
var bootState = {
  
  preload: function(){
    
    //set canvas id
    game.canvas.id = 'gameCanvas';
    
    //set scaling and position
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  
  create: function(){
    
    game.state.start('load');
  }
}

