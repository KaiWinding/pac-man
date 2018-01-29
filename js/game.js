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
    var that = this
    window.addEventListener('keydown',function(event){
      that.keyBoard[event.key] = true
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
    var loads = []
    // 预先载入所有图片
    var names = Object.keys(pictures)
    var that = this
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        var path = pictures[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            that.images[name] = img
            // 所有图片都成功载入之后, 调用 run
            loads.push(1)
            if (loads.length == names.length) {
                that.refresh()
            }
        }
    }
  }

  refresh() {
    var scene = new Scene(this)
    this.scene = scene
    var that = this

    setInterval(function(){
      var thisGame = that
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