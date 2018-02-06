class Scene {

	constructor(g) {
		this.time = 0
		this.closeDoor = false
		this.game = g
		var twoMap = createWallLish(this.game)
		this.wallList = twoMap.wallList
		this.diamondsMap = twoMap.diamondsMap
		this.beanList = createBeanList(twoMap.diamondsMap, this.game.images.bean)
		this.beanNumber = this.beanList.length
		this.map = createMap(this.wallList) 
		var monsterNumber = 5
    this.monsterList = []
    for (let i = 0; i < monsterNumber; i++) {
    	this.monsterList.push(new Monster(this.game.images.monster))
    }
    this.__initialize(this)
    this.pacMan = new PacMan(this.game.images.pacMan)
	}

	//注册该场景的按键控制到game
	__initialize(scene,g) {
		scene.time = 0
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
    try {
		  canvas.drawImage(img.img, img.positionX, img.positionY, img.width, img.height)
	  } catch(error) {
      console.log(img)
      console.log(img.img)
    }
  }

  drawPacMan(canvas, img, time) {
    let changeTime = 30 
    if (time % 5 == 0) {
      if (img.state == 1) {
        img.state = 0
      } else {
        img.state = 1
      }
    }
    try {
      canvas.drawImage(img.img[img.state], img.positionX, img.positionY, img.width, img.height)
    } catch(error) {
      console.log(img)
      console.log(img.img)
    }
  }

	upDate() {
    //第一次进入游戏，在背景canvas上画出迷宫图
    if (this.time == 0) {
      this.game.backgroundCtx.fillStyle = "#00008B";
      this.game.backgroundCtx.fillRect (0, 0, 550, 475);
    	for (let i = 0; i < this.wallList.length; i++) {
    	  this.drawImage(this.game.backgroundCtx, this.wallList[i])
      }   
       for (let i = 0; i < this.beanList.length; i++) {
    		this.drawImage(this.game.backgroundCtx, this.beanList[i])
    	}

    } 
    this.time++
    //游戏开始50time后，门关闭，增加门图片（只执行一次）
    if ((this.time > 50) && (!this.closeDoor)) {
      let door = new Wall(this.game.images.wall, 12 * 25, 9 * 25)
      this.closeDoor = true
      this.drawImage(this.game.backgroundCtx, door)
      this.map = changeMap(door, this.map)
    } 

    this.game.ctx.clearRect(0, 0, 1280, 720)

    this.drawPacMan(this.game.ctx, this.pacMan, this.time)

    var x = Math.floor(this.pacMan.positionX / 25)
    var y = Math.floor(this.pacMan.positionY / 25)
    if (this.diamondsMap[x][y] == 2) {
    	this.diamondsMap[x][y] = 0
    	//this.game.backgroundCtx.clearRect(x * 25, y * 25, 25, 25)
      this.game.backgroundCtx.fillRect(x * 25, y * 25, 25, 25);
    	this.beanNumber--
    	if (this.beanNumber == 0) {
    		this.game.scene = new SceneEnd(this.game, true)
    	}
    }
    if (this.beanNumber !== 0) {
    	//怪物的移动速度
    	var monsterSpeech = 3
    	for (let i = 0; i < this.monsterList.length; i++) {
    		for (let j = 0; j < monsterSpeech; j++) {
    			this.monsterList[i].move(this.map)
    		}
    		this.drawImage(this.game.ctx, this.monsterList[i])
    		if (isCrashed(this.monsterList[i], this.pacMan)) {
    			this.game.scene = new SceneEnd(this.game, false)
    			break 
    		}
    	}
    }
    if (this.time == 60) {
      this.time = 1
    }
	}
}