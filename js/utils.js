function changeMap(wall, map) {
	for (let j = wall.positionX; j < (wall.positionX + wall.width ); j++){
    for (let k = wall.positionY; k < (wall.positionY + wall.height ); k++){
      map[j][k] = false 
    } 
  }
  return map
}

function isCrashed(a,b){
		
	if ((a.positionY+a.height)<b.positionY) {
		return false 
	} else if ((b.positionY+b.height)<a.positionY) {
		return false 
	} else if ((a.positionX+a.width)<b.positionX) {
		return false 
	} else if ((b.positionX+b.width)<a.positionX) {
		return false 
	} else {
	return true 
	}
}