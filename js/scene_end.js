class SceneEnd {

	constructor(g, win) {
		this.game = g
		this.game.ctx.clearRect(0, 0, 1280, 720)
		this.game.backgroundCtx.clearRect(0, 0, 1280, 720)
		if (!win) {
			alert('game over')
		} else {
			alert('you win')
		}
	}
}