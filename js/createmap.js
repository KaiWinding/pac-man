//创造一个二维数组描述整个canvas的所有像素点，初始值设为true即该点无任何对象
function createMap(wallList){
  var map = new Array
  for (let i = 0; i < 800; i++){
    map[i] = new Array
    for (let j = 0; j < 500; j++){
      map[i][j] = true
    }
  }
  //遍历所有的墙对象，在map二维数组中将每个墙对象的占据的像素点赋值为false，即该点存在对象必须考虑可否通过的问题
  for (let i = 0; i < wallList.length; i++){
    map = changeMap(wallList[i], map)
  }
  return map
}

//生成所有的墙单位，暂时没有地图编辑器，手撸了一个地图
function createWallLish(g) {
  var wallList = []
  var diamondsMap = []
  for (let i = 0; i < 22; i++){
    diamondsMap[i] = new Array
    for (let j = 0; j < 18; j++){
      diamondsMap[i][j] = 2
    }
  }
  for (let i = 0; i < 22; i++){
    let newWall = new Wall(g.images.wall, i * 25) 
    wallList.push(newWall)
    diamondsMap[i][0] = 1
  }
  //for (let i = 0; i < 32; i++){
  //  let newWall = new Wall(g.images.wall, i * 25, 475)
  //  wallList.push(newWall)
  //}
  for (let i = 1; i < 19; i++){
    let newWall = new Wall(g.images.wall, 0, i*25)
    wallList.push(newWall)
    diamondsMap[0][i] = 1
  }
  //for (let i = 1; i < 19; i++){
  //  let newWall = new Wall(g.images.wall, 775 ,i*25)
  //  wallList.push(newWall)
  //}
  for (let i = 1; i < 19; i++){
    let newWall = new Wall(g.images.wall, 21 * 25, i*25)
    wallList.push(newWall)
    diamondsMap[21][i] = 1
  }
  for (let i = 1; i < 21; i++){
    let newWall = new Wall(g.images.wall, i * 25, 18 * 25)
    wallList.push(newWall)
    diamondsMap[i][18] = 1
  }
  var diyWall = [ 
    [4,1], [8,1], [14,1],
    [2,2], [6,2], [8,2], [14,2], [16,2], [18,2], [19,2],
    [2,3], [4,3], [5,3], [6,3], [8,3], [9,3], [10,3], [11,3], [12,3], [13,3], [14,3], [16,3], [18,3], [19,3],
    [2,4],
    [2,5], [3,5], [4,5], [6,5], [8,5], [9,5], [10,5], [12,5], [13,5], [14,5], [15,5], [16,5], [18,5], [19,5],
    [2,6], [6,6], [14,6], [18,6], [19,6],
    [2,7], [4,7], [6,7], [8,7], [10,7], [11,7], [12,7], [16,7], [18,7], [19,7],
    [4,8], [8,8], [10,8], [11,8], [12,8], [14,8], [15,8], [16,8],
    [2,9], [3,9], [4,9], [6,9], [7,9], [8,9], [10,9], [16,9], [18,9], [19,9], [20,9],
    [4,10], [8,10], [10,10], [11,10], [12,10], [14,10], [16,10],
    [2,11], [4,11], [6,11], [8,11], [10,11], [11,11], [12,11], [14,11], [16,11], [18,11], [19,11],
    [2,12], [6,12], [14,12], [18,12], [19,12],
    [2,13], [3,13], [4,13], [6,13], [8,13], [9,13], [10,13],
    [12,13], [13,13], [14,13], [15,13], [16,13], [18,13], [19,13],
    [2,14],
    [2,15], [4,15], [5,15], [6,15], [8,15], [9,15], [10,15], [11,15], [12,15], [13,15], [14,15], [16,15], [18,15], [19,15],
    [2,16], [6,16], [8,16], [14,16], [16,16], [18,16], [19,16],
    [4,17], [8,17], [14,17]
  ]
  for (let i = 0; i < diyWall.length; i++) {
    let newWall = new Wall(g.images.wall, diyWall[i][0] * 25, diyWall[i][1] * 25)
    wallList.push(newWall)
    diamondsMap[diyWall[i][0]][diyWall[i][1]] = 1
  }
  diamondsMap[11][9] = 1
  diamondsMap[12][9] = 1
  diamondsMap[9][1] = 1
  diamondsMap[10][1] = 1
  diamondsMap[11][1] = 1
  diamondsMap[12][1] = 1
  diamondsMap[13][1] = 1 
  diamondsMap[9][2] = 1
  diamondsMap[10][2] = 1
  diamondsMap[11][2] = 1
  diamondsMap[12][2] = 1
  diamondsMap[13][2] = 1
  diamondsMap[9][17] = 1
  diamondsMap[10][17] = 1
  diamondsMap[11][17] = 1
  diamondsMap[12][17] = 1
  diamondsMap[13][17] = 1  
  diamondsMap[9][16] = 1
  diamondsMap[10][16] = 1
  diamondsMap[11][16] = 1
  diamondsMap[12][16] = 1
  diamondsMap[13][16] = 1 
  return { wallList, diamondsMap}
}
//建立一个21*18的数组作为方块图
//0为无物品
//1为格子上有墙壁
//2为格子上有豆子

function createBeanList(map, pic) {
  var beanList = []
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j <map[i].length; j++) {
      if (map[i][j] == 2) {
        beanList.push(new Bean(pic, i * 25 + 10, j * 25 + 10))
      }
    }
  }
  return beanList
}