class SceneEnd {

	constructor(g, win) {
		this.game = g
		this.__initialize(this, win)
	}

	__initialize(scene, win) {
    this.game.registerAction('r', function(){
      if (!(scene.game.scene instanceof Scene)) {
        scene.game.scene = new Scene(scene.game)
      }
    })
    this.game.ctx.clearRect(0, 0, 1280, 720)
    this.game.backgroundCtx.clearRect(0, 0, 1280, 720)
    this.game.ctx.font = "bold 30px Arial"
    if (win) {
    	this.game.ctx.fillText('游戏胜利， 请按 r 重新开始游戏', 100, 200)
    } else {
    	this.game.ctx.fillText('游戏失败， 请按 r 重新开始游戏', 100, 200)
  	}
	}	

	upDate() {

	}
}