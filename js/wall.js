class Wall {

  constructor(pic, x = 0, y = 0) {
  	this.img = pic
    //this.img = new Image()
    //this.img.src = 'brick.png'
    this.positionX = x
    this.positionY = y
    this.width = 25
    this.height = 25
  }
}