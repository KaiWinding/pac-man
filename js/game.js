class Game{

  constructor(){
    this.keyBoard = {}
    this.action = {}
    this.scene = null
    var screen = document.getElementById('game-screen')
    var background = document.getElementById('game-background')
    this.ctx = screen.getContext('2d')
    this.backgroundCtx = background.getContext('2d')
    this.pause = false
    this.images = {}
    this.__init()
  }

  __init() {
    var that = this
    window.addEventListener('keydown',function(event){
      let k = event.key
      that.keyBoard[k] = true
      if (k == 'h') {
        that.pause = !that.pause
      }
    })
    window.addEventListener('keyup',function(event){
      that.keyBoard[event.key] = false
    })
  }

  //注册按键事件
  registerAction(keyword, callback) {
    this.action[keyword] = callback
  }

  gameStart(pictures) {
    var loads = 0
    var imgNumber = 0
    // 预先载入所有图片
    var names = Object.keys(pictures)
    var that = this
    for (let i = 0; i < names.length; i++) {
      if (!(pictures[names[i]] instanceof Array)) {
        for (let key in pictures[names[i]]) {
          for (let j = 0; j < pictures[names[i]][key].length; j++) {
            let path = pictures[names[i]][key][j]
            let img = new Image()
            img.src = path
            pictures[names[i]][key][j] = img
            imgNumber++
            img.onload = function() {
              loads++
              if (loads == imgNumber) {
                that.images = pictures
                that.refresh()
              }
            }
          }
        }
      } else {
        for (let j = 0; j < pictures[names[i]].length; j++) {
          let path = pictures[names[i]][j]
          let img = new Image()
          img.src = path
          pictures[names[i]][j] = img
          imgNumber++
          img.onload = function() {
            loads++
            if (loads == imgNumber) {
              that.images = pictures
              that.refresh()
            }
          }
        }
      }
    }
  }

  refresh() {
    var scene = new SceneBegin(this)
    this.scene = scene
    var that = this

    setInterval(function(){
      for (let key in that.action) {
        if (that.keyBoard[key]) {
        that.action[key]()
        }
      }
      if (that.pause) {
        return
      }
      that.scene.upDate()
    }, 1000/40)
  }
}