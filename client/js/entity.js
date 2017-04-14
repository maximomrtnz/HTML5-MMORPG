var Entity = Class.extend({
	
	init : function (x, y, sprite, speed) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;
		this.speed = speed;
		this.path = null;
		this.targetAngle = 0;
	},

	moveTo : function(x,y){

		if(this.isMoving()){

			return;

		}else{

			var start = this.requestTile(this.x,this.y);

			var end = this.requestTile(x,y);

			if(start[0]!=end[0] || start[1]!=end[1]){
				this.path = this.requestPathfindingTo(x,y);
			}

		}

	},

	update : function(){

		if(this.isMoving()){

			if(this.path.length > 0){

				var nextTile = this.path[0];

				var x = this.x;
				var y = this.y;

				var nextPosition = this.requestGridPositionByTile(nextTile);
					
				if(this.x < nextPosition[0]){ // Move right
					this.x+= this.speed;
				}else if(nextPosition[0] < this.x){
					this.x-= this.speed;
				}

				if(this.y < nextPosition[1]){ // Move Down
					this.y+= this.speed;
				}else if(nextPosition[1] < this.y){
					this.y-= this.speed;
				}

				this.targetAngle = getDirectionAngle(x,y,this.x,this.y);

				this.sprite.update(this.x,this.y);

				console.log(this.x,this.y,nextPosition[0],nextPosition[1]);

				if(this.x == nextPosition[0] && this.y == nextPosition[1]){
					this.path.shift();
				}

			}

			if(this.path.length == 0){ // On finish movement
				this.checkCollisionWithCameraBorder();
			}
			
		}

	},

	isMoving : function(){
		return (this.path!=null)?this.path.length > 0:false;
	},

	requestPathfindingTo : function(x,y){
		if(this.request_path_callback != null){
			return this.request_path_callback(x,y);
		}else{
			return [];
		}
	},

	requestTile : function(x,y){
		if(this.request_tile_callback != null){
			return this.request_tile_callback(x,y);
		}else{
			return [];
		}
	},

 	onRequestPath: function(callback) {
        this.request_path_callback = callback;
    },

    onRequestTile : function(callback){
    	this.request_tile_callback = callback;
    },

    onCheckCollisionWithCameraBorder : function(callback){
    	this.check_collision_with_camera_border_callback = callback;
    },

    onRequestGridPositionByTile : function(callback){
    	this.request_grid_position_by_tile = callback;
    },

    requestGridPositionByTile : function(tile){
    	if(this.request_grid_position_by_tile){
    		return this.request_grid_position_by_tile(tile);
    	}else{
    		return {x:0,y:0};
    	}
    },

    checkCollisionWithCameraBorder : function(delta){
    	if(this.check_collision_with_camera_border_callback){
    		this.check_collision_with_camera_border_callback(delta);
    	}
    },

    render : function(){
		this.sprite.render();
	},

	setPosition : function(x,y){
		this.x = x;
		this.y = y;
		this.sprite.update(this.x,this.y);
	}

});