    class PacMan {

      constructor(pic, x = 27, y = 25){
        this.img = pic
        //this.img.src = 'ball.png'
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
          if (this.direction[key]) {
            //moveDirection.push(key)
          }
        }
        if (this.direction[control]) {
          nowdirection = control
        //根据刚刚获得的运动方向和怪兽的速度计算出怪兽下一帧的位置
        switch(nowdirection){
          case 'top': this.positionY = this.positionY - this.speech; this.direction = {
          'top': true,
          'bottom': false,
          'left': false,
          'right': false
        }; break;
          case 'bottom': this.positionY = this.positionY + this.speech; this.direction = {
          'top': false,
          'bottom': true,
          'left': false,
          'right': false
        }; break;
          case 'left': this.positionX = this.positionX - this.speech; this.direction = {
          'top': false,
          'bottom': false,
          'left': true,
          'right': false
        }; break;
          case 'right': this.positionX = this.positionX + this.speech; this.direction = {
          'top': false,
          'bottom': false,
          'left': false,
          'right': true
        }; break;
        }
        } else {
        this.direction = {
          'top': false,
          'bottom': false,
          'left': false,
          'right': false
        }
        this.direction[nowdirection] = true
        }
      }
    }
