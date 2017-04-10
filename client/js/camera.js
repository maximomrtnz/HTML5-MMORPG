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

	move : function(delta, dirx, diry){
		// move camera
	    this.x += dirx * this.speed * delta;
	    this.y += diry * this.speed * delta;
	    // clamp values
	    this.x = Math.max(0, Math.min(this.x, this.maxX));
	    this.y = Math.max(0, Math.min(this.y, this.maxY));
	}

});