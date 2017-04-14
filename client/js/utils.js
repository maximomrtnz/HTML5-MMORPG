function getDirectionAngle(startX,startY,nextX,nextY) {
	
    // Get direction angle could
    var angle = Math.atan2(nextX - startX, -(nextY - startY))*(180/Math.PI);

    if(angle == 0){ // UP
    	return 90;
    }else if(angle == 90){ // RIGHT
    	return 0;
    }else if(angle == -90){ // LEFT
    	return 180;
    }else if(angle == 180){ // DOWN
    	return 270;
    }

}


function xy2Tile(x,y,tilewidth){
	return [Math.floor(x/tilewidth),Math.floor(y/tilewidth)];
}

function xy2GridPosition(x,y,tilewidth){
	return [Math.floor(x/tilewidth)*tilewidth,Math.floor(y/tilewidth)*tilewidth];
}

function tile2GridPosition(row,col, tilewidth){
	return [tilewidth*row,tilewidth*col];
}