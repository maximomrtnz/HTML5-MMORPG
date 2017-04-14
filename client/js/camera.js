var Camera = Class.extend({

	init : function (width,height,map,speed) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.maxX = map.width * map.tilewidth - width;
    	this.maxY = map.width * map.tilewidth - height;
		this.speed = speed;
	},

	moveTo : function(delta, x, y){

		var angle = getDirectionAngle(this.x,this.y,x,y);

		var dirx = 0;
		var diry = 0;

		if(angle == 0){ // RIGTH
			dirx = 1;
		}else if(angle == 180){ // LEFT
			dirx = -1;
		}else if(angle == 90){ // UP
			diry = -1;
		}else if(angle == 270){ // DOWN
			diry = 1;
		}

		// move camera
	    this.x += dirx * this.speed * delta;
	    this.y += diry * this.speed * delta;
	    // clamp values
	    this.x = Math.max(0, Math.min(this.x, this.maxX));
	    this.y = Math.max(0, Math.min(this.y, this.maxY));

	}


});