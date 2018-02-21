class Scene {

	constructor(g, sceneTime = 0, oldMap) {
		this.time = sceneTime
		this.closeDoor = false
    this.music = {}
		this.game = g
    this.score = document.getElementsByClassName('score')[0].firstChild
    this.pacMan = new PacMan(this.game.images.pacMan)
		var twoMap = createWallLish(this.game)
		this.wallList = twoMap.wallList
    if (this.time == 0) {
      this.score.nodeValue = 0
      this.pacMan.hp.nodeValue = 1
      this.diamondsMap = twoMap.diamondsMap
    }	else {
      this.diamondsMap = oldMap
    }
		this.beanList = createBeanList(twoMap.diamondsMap, this.game.images.bean)
		this.beanNumber = this.beanList.length
		this.map = createMap(this.wallList) 
		var monsterNumber = 5
    this.monsterList = []
    this.gameOver = false
    this.boom = new Boom
    for (let i = 0; i < monsterNumber; i++) {
    	this.monsterList.push(new Monster(this.game.images.monster))
    }
    this.__initialize(this)
    
	}
	//注册该场景的按键控制到game,并添加音乐
	__initialize(scene,g) {
    let newMusic = new Audio
    newMusic.src = 'music/gaming.mp3'
    this.music['gaming'] = newMusic
    newMusic = new Audio 
    newMusic.src = 'music/game-over-1.mp3'
    this.music['gameOver'] = newMusic
    this.music.gaming.loop =true
    this.music.gaming.play()
		//scene.time = 0
    //初始背景并设置音乐
    //this.drawBackground()
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
    //this.game.registerAction('h', function(){
    //  scene.game.pause = !scene.game.pause
    //})
	}

	drawImage(canvas, img) {
		canvas.drawImage(img.img, img.positionX, img.positionY, img.width, img.height)
  }

  drawMonster(canvas, img) {
    canvas.drawImage(img.img[0], img.positionX, img.positionY, img.width - 4, img.height - 1)
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
    canvas.drawImage(img.img[img.state], img.positionX, img.positionY, img.width, img.height)
  }

  drawBackground() {
    this.game.backgroundCtx.fillStyle = "#00008B";
    this.game.backgroundCtx.fillRect(0, 0, 550, 475);
    for (let i = 0; i < this.wallList.length; i++) {
      this.drawImage(this.game.backgroundCtx, this.wallList[i])
    }   
     for (let i = 0; i < this.beanList.length; i++) {
      this.drawImage(this.game.backgroundCtx, this.beanList[i])
    }
  
  }

  drawDoor() {
    let door = new Wall(this.game.images.wall, 12 * 25, 9 * 25)    
    this.closeDoor = true
    this.drawImage(this.game.backgroundCtx, door)
    this.map = changeMap(door, this.map)
  }

  judegePacManPos() {
    let x = Math.floor(this.pacMan.positionX / 25)
    let y = Math.floor(this.pacMan.positionY / 25)
    if (this.diamondsMap[x][y] == 2) {
      let newMusic = new Audio 
      newMusic.src = 'music/eat-bean.wav'
      newMusic.play()
      this.diamondsMap[x][y] = 0
      //this.game.backgroundCtx.clearRect(x * 25, y * 25, 25, 25)
      this.game.backgroundCtx.fillRect(x * 25, y * 25, 25, 25);
      this.beanNumber--
      this.score.nodeValue = Number(this.score.nodeValue) + 10
      if (this.beanNumber == 0) {
        this.game.scene = new SceneEnd(this.game, true)
      }
    }    
  }

  updateMonster() {
    for (let i = 0; i < this.monsterList.length; i++) {
      for (let j = 0; j < this.monsterList[i].monsterSpeech; j++) {
        this.monsterList[i].move(this.map)
      }
      this.drawMonster(this.game.ctx, this.monsterList[i])
      if (isCrashed(this.monsterList[i], this.pacMan)) {
        this.music.gaming.src = ''
        this.music.gameOver.play()
        this.gameOver = true
        //this.game.scene = new SceneEnd(this.game, false)
      }
    }
  }

  pacManDeadCartoon() {
    this.time++
    this.drawImage(this.game.ctx, this.boom)
    if (this.time == 4) {
      if (this.boom.status == 11) {
        if (this.pacMan.hp.nodeValue == '1') {
          this.game.scene = new SceneEnd(this.game, false)
        } else {
          this.game.scene = new Scene(this.game, 1, this.diamondsMap)
          this.game.scene.pacMan.hp.nodeValue--
        }
      }
      this.boom.status++
      this.boom.img = this.boom.imgLib[this.boom.status]
      this.time = 1
    }
  }

	upDate() {    
    if (this.time == 0) {
      this.drawBackground()
    }
    this.time++
    //游戏开始50time后，门关闭，增加门图片（只执行一次）
    if ((this.time > 50) && (!this.closeDoor)) {
      this.drawDoor()
    } 

    this.game.ctx.clearRect(0, 0, 1280, 720)
    //this.drawPacMan(this.game.ctx, this.pacMan, this.time)
    this.judegePacManPos()

    if (this.beanNumber !== 0) {
      this.updateMonster()
    } else {
      console.log('you win !!')      
    }

    if (this.gameOver) {
      this.time = 0
      this.boom.positionX = this.pacMan.positionX
      this.boom.positionY = this.pacMan.positionY
      this.upDate = this.pacManDeadCartoon
    } else {
      this.drawPacMan(this.game.ctx, this.pacMan, this.time)
    }

    if (this.time == 60) {
      this.time = 1
    }
	}
}