class Scene {

	constructor(g) {
		this.time = 0
		this.closeDoor = false
		this.game = g
		this.wallList = createWallLish(this.game)
		this.map = createMap(this.wallList) 
		var monsterNumber = 5
    this.monsterList = []
    for (let i = 0; i < 5; i++) {
    	this.monsterList.push(new Monster(this.game.images.monster))
    }
    this.__initialize(this)
    this.pacMan = new PacMan(this.game.images.pacMan)
	}

	//注册该场景的按键控制到game
	__initialize(scene,g) {
    this.game.registerAction('a', function(){
      scene.pacMan.move(scene.map, 'left')
    })
    this.game.registerAction('w', function(){
      scene.pacMan.move(scene.map, 'top')
    })
    this.game.registerAction('s', function(){
      scene.pacMan.move(scene.map, 'bottom')
    })
    this.game.registerAction('d', function(){
      scene.pacMan.move(scene.map, 'right')
    })
    this.game.registerAction('h', function(){
      scene.game.pause = !scene.game.pause
    })
	}

	drawImage(canvas, img) {
		canvas.drawImage(img.img, img.positionX, img.positionY, img.width, img.height)
	}

	upDate() {
    this.time++
    if (this.time == 1) {
    	for (let i = 0; i < this.wallList.length; i++) {
    	  this.drawImage(this.game.backgroundCtx, this.wallList[i])
      }   
    } 

    if ((this.time > 50) && (!this.closeDoor)) {
      let door = new Wall(this.game.images.wall, 12 * 25, 9 * 25)
      this.closeDoor = true
      this.drawImage(this.game.backgroundCtx, door)
      this.map = changeMap(door, this.map)
    } 

    this.game.ctx.clearRect(0,0,screen.width,screen.height)
    this.drawImage(this.game.ctx, this.pacMan)
    for (let i = 0; i < this.monsterList.length; i++) {
    	this.monsterList[i].move(this.map)
    	this.drawImage(this.game.ctx, this.monsterList[i])
    }
	}
}