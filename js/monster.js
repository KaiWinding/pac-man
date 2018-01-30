    //怪物类，吃豆人中的怪物
    class Monster {

      constructor(pic, x = 11 * 25, y = 9 * 25){
        this.img = pic
        //this.img.src = 'qq.png'
        this.positionX = x
        this.positionY = y
        this.width = 24 
        this.height = 24
        this.speech = 1
        this.direction = {
          'top': false,
          'bottom': false,
          'left': false,
          'right': true
        }
      }
      //怪兽的每一帧的运动方法，目前的设定要遵守的逻辑是：1.怪兽不会180度转向；2.怪兽不能撞墙；3.当怪兽遇到多个可运动方向时，随机选择一个方向移动；4.怪兽只有四个移动方向，分别是上下左右；
      move(map){
        //进行下一帧的运动判定时先判定逻辑1，即怪兽不能进行180转向，在这里将怪兽上一帧运动方向的反方向设为false，即怪兽这一帧不能向该方向运动
        if (this.direction.top) {
          this.direction.left = true
          this.direction.right = true
        } else if (this.direction.bottom) {
          this.direction.left = true 
          this.direction.right = true 
        } else if (this.direction.right) {
          this.direction.top = true 
          this.direction.bottom = true  
        } else if (this.direction.left) {
          this.direction.top = true 
          this.direction.bottom = true 
        }
        //这一段的作用是判定逻辑2，使用一个数组moveDireciton来存储怪兽下一帧可运行的方向，这里的判定方法是在各个方向上加上速度获得怪兽下一帧往这一方向运动的位置，将位置参数与map数组即地图参数比较，若该位置有墙壁即说明不可向该方向运动
        var moveDirection = []
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
            moveDirection.push(key)
          }
        }
        //将剩下可运动的方向进行一个随机选择，获得下一帧怪兽运动的方向
        if (moveDirection.length > 1) {
          for (let i = 0; i < moveDirection.length; i++){
            this.direction[moveDirection[i]] = false
          }
          var randomDirection = Math.floor(Math.random() * moveDirection.length + 0)
          this.direction[moveDirection[randomDirection]] = true
        } else {
        	var randomDirection = 0
        }
        //根据刚刚获得的运动方向和怪兽的速度计算出怪兽下一帧的位置
        switch(moveDirection[randomDirection]) {
          case 'top': this.positionY = this.positionY - this.speech; break;
          case 'bottom': this.positionY = this.positionY + this.speech; break;
          case 'left': this.positionX = this.positionX - this.speech; break;
          case 'right': this.positionX = this.positionX + this.speech; break;
        }
      }
    }
