class PacMan {

  constructor(pic = {}, x = 27, y = 25){
    this.img = {}
    this.imgLib = pic
    this.state = 0
    this.img = this.imgLib.right
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
