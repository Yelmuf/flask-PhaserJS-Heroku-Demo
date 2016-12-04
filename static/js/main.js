Game.Main = function (game) {
	var player;
	var platforms;
	var cursors;
	var jumpButton;
	var scoreText;
	var coins;
	var score;
	this.score = 0;
	var hearts;
	var enemies;
};
Game.Main.prototype.create = function () {
	game.stage.backgroundColor = '#85b5e1';
    this.bounds = new Phaser.Rectangle(0, 0, 760, 730);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(100, 200, 'char');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    platforms = game.add.physicsGroup();
    platforms.create(500, 150, 'platform');
    platforms.create(0, 300, 'platform');
    platforms.create(400, 450, 'platform');
    platforms.setAll('body.immovable', true);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    coins = game.add.physicsGroup();
    coins.create(550, 120, 'coin');
    coins.create(550, 420, 'coin');
    coins.setAll('body.immovable', true);
    scoreText = game.add.text(10, 10, "You have " + this.score + " coins", {
        font: "24px Arial",
        fill: "#fff",
        align: "center"
    });
    hearts = game.add.group();
    for(var i=0;i<4;i++){
    		hearts.create(550+i*50,10,'heart');
    }
    enemies = game.add.physicsGroup();
    enemies.create(100,600,'enemy');
};
Game.Main.prototype.update = function () {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.overlap(player, coins, this.killCoin, null, this);
	game.physics.arcade.overlap(player, enemies, this.removeHeart, null, this);
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
    
};
Game.Main.prototype.killCoin = function (player,coin) {
	coin.kill();
	this.score++;
	scoreText.text = "You have " + this.score + " coin(s)";
};
Game.Main.prototype.removeHeart = function (player, enemy) {
	if(hearts.children.length == 1){
		this.game.state.start("Death");
	}
	console.log(hearts.children);
	player.x +=100;
	hearts.removeChildAt(0);
};
Game.Main.prototype.shutdown = function(){
		  this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		  platforms.destroy();
		  hearts.destroy();
		  coins.destroy();
		  player.destroy();
}
