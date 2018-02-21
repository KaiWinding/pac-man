class SceneBegin {

	constructor(g) {
		this.game = g
		this.__initialize(this)
	}

	__initialize(scene) {
    let startInterface = document.getElementsByClassName('start-interface')[0]
    startInterface.style.visibility = 'visible'
    this.game.registerAction('Enter', function(){
      if (scene.game.scene instanceof SceneBegin) {
        startInterface.style.visibility = 'hidden'
        scene.game.scene = new Scene(scene.game)
      }
    })

    let startButton = document.getElementsByClassName('begin-button')[0]
    startButton.onclick = function() {
      if (scene.game.scene instanceof SceneBegin) {
        startInterface.style.visibility = 'hidden'
        scene.game.scene = new Scene(scene.game)
      }
    }
	}	

	upDate() {

	}
}