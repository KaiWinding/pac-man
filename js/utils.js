function changeMap(wall, map) {
	for (let j = wall.positionX; j < (wall.positionX + wall.width ); j++){
    for (let k = wall.positionY; k < (wall.positionY + wall.height ); k++){
      map[j][k] = false 
    } 
  }
  return map
}