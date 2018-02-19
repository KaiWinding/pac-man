class Boom {

	constructor(x = 0, y = 0) {
		this.img = {}
		this.imgLib = new Array
		this.positionX = x
		this.positionY = y
		this.width = 22
		this.height = 22
		this.status = 0
		this.__init()
	}

	__init() {
		for (let i = 0; i < 12; i++) {
			let img = new Image()
			if (i < 10) {
				img.src = 'img/boom/24000' + String(i) + '.png'
			} else {
				img.src = 'img/boom/2400' + String(i) + '.png'
			}
			this.imgLib[i] = img
		}
		this.img = this.imgLib[this.status]
	}
}