Game.Death = function (game) {
	var deathText;
	var button;
};
Game.Death.prototype.create = function () {
	game.stage.backgroundColor = '#000000';
	deathText = game.add.text(game.world.centerX, game.world.centerY, "You are dead!", {
        font: "48px Arial",
        fill: "#fff",
        align: "center"
    });
	deathText.anchor.set(0.5);
	button = game.add.button(game.world.centerX, game.world.centerY+50, 'button', this.restart, this, this, this, this);
	button.anchor.set(0.5);
};
Game.Death.prototype.restart = function () {
	this.game.state.start("Main");
};
Game.Death.prototype.shutdown = function () {
	deathText.destroy;
	button.destroy;
}
