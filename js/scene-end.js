class SceneEnd {

	constructor(g, win) {
		this.game = g
		this.__initialize(this, win)
	}

	__initialize(scene, win) {
    this.game.registerAction('r', function(){
      if (!(scene.game.scene instanceof Scene)) {
        endInterface.style.visibility = 'hidden'
        inforBoard.style.visibility = 'visible'
        scene.game.scene = new Scene(scene.game)
      }
    })
    let endInterface = document.getElementsByClassName('end-interface')[0]
    let inforBoard = document.getElementsByClassName('infor-board')[0]
    let winText = document.getElementsByClassName('win-text')[0]
    let loseText = document.getElementsByClassName('lose-text')[0]
    inforBoard.style.visibility = 'hidden'
    endInterface.style.visibility = 'visible'
    this.game.ctx.clearRect(0, 0, 1280, 720)
    this.game.backgroundCtx.clearRect(0, 0, 1280, 720)
    this.game.ctx.font = "bold 30px Arial"
    if (win) {
    	//this.game.ctx.fillText('游戏胜利， 请按 r 重新开始游戏', 100, 200)
      winText.style.display = 'block'
      loseText.style.display = 'none'
    } else {
    	//this.game.ctx.fillText('游戏失败， 请按 r 重新开始游戏', 100, 200)
      winText.style.display = 'none'
      loseText.style.display = 'block'
  	}
	}	

	upDate() {

	}
}