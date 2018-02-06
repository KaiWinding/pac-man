class PacMan {

  constructor(pic, x = 27, y = 25){
    //this.img = pic
    //this.img.src = 'ball.png'
    this.img = {}
    this.imgLib = {}
    this.state = 0
    this.__initImg()
    this.positionX = x
    this.positionY = y
    this.width = 20 
    this.height = 20
    this.speech = 5
    this.direction = {
      'top': false,
      'bottom': false,
      'left': false,
      'right': true
    }
  }

  __initImg(){
    this.imgLib = {
      'top': new Array,
      'bottom': new Array,
      'left': new Array,
      'right': new Array
    }
    let img = new Image()
    img.src = 'img/pac-up0.png'
    this.imgLib['top'][0] = img
    img = new Image()
    img.src = 'img/pac-up1.png'
    this.imgLib['top'][1] = img
    img = new Image()
    img.src = 'img/pac-bottom0.png'
    this.imgLib['bottom'][0] = img
    img = new Image()
    img.src = 'img/pac-bottom1.png'
    this.imgLib['bottom'][1] = img
    img = new Image()
    img.src = 'img/pac-left0.png'
    this.imgLib['left'][0] = img
    img = new Image()
    img.src = 'img/pac-left1.png'
    this.imgLib['left'][1] = img
    img = new Image()
    img.src = 'img/pac-right0.png'
    this.imgLib['right'][0] = img
    img = new Image()
    img.src = 'img/pac-right1.png'
    this.imgLib['right'][1] = img
    this.img = this.imgLib.right
  }

  move(map, control){
    var nowdirection = ''
    for (let key in this.direction) {
      if (this.direction[key]) {
        nowdirection = key
      }
    }
    this.direction = {
      'top': true,
      'bottom': true,
      'left': true,
      'right': true
    }
    //这一段的作用是判定逻辑2，使用一个数组moveDireciton来存储怪兽下一帧可运行的方向，这里的判定方法是在各个方向上加上速度获得怪兽下一帧往这一方向运动的位置，将位置参数与map数组即地图参数比较，若该位置有墙壁即说明不可向该方向运动
    var moveDirection = {}
    for (let key in this.direction) {
      if (this.direction[key]) {
        switch(key) {
          case 'top': if (map[this.positionX][this.positionY - this.speech] && map[this.positionX + this.width][this.positionY - this.speech]){}else{
            this.direction[key] = false
          }; break;
          case 'bottom': if (map[this.positionX][this.positionY + this.height + this.speech] && map[this.positionX + this.width][this.positionY + this.height + this.speech]){}else{
            this.direction[key] = false
          }; break;
          case 'right': if (map[this.positionX + this.width + this.speech][this.positionY] && map[this.positionX + this.width + this.speech][this.positionY + this.height]){}else{
            this.direction[key] = false
          }; break;
          case 'left' : if (map[this.positionX - this.speech][this.positionY] && map[this.positionX - this.speech][this.positionY + this.height]){}else{
            this.direction[key] = false
          }; break;
        }
      }
    }
    if (this.direction[control]) {
      nowdirection = control
      switch(nowdirection){
        case 'top': this.positionY = this.positionY - this.speech; break;
        case 'bottom': this.positionY = this.positionY + this.speech; break;
        case 'left': this.positionX = this.positionX - this.speech; break;
        case 'right': this.positionX = this.positionX + this.speech; break;
      }
    }
    this.direction = {
      'top': false,
      'bottom': false,
      'left': false,
      'right': false           
    }
    this.direction[nowdirection] = true
    this.img = this.imgLib[nowdirection]
  }
}
