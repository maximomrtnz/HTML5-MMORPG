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

			if(this.x != x && this.y!=y){

				this.path = this.requestPathfindingTo(x,y);

			}

		}

	},

	update : function(){

		if(this.isMoving()){

			if(this.path.length > 0){

				var currentTile = this.requestTile(this.x,this.y);

				var nextTile = this.path[0];

				if(currentTile[0] == this.path[0][0] && currentTile[1] == this.path[0][1]){ // If we have reached the next place in the path then remove one slot
					this.path.shift();
				}

				console.log(this.path)

				var x = this.x;
				var y = this.y;
					
				if(currentTile[0] < nextTile[0]){ // Move right
					this.x+= this.speed;
				}else if(currentTile[0] > nextTile[0]){
					this.x-= this.speed;
				}

				if(currentTile[1] < nextTile[1]){ // Move Down
					this.y+= this.speed;
				}else if(currentTile[1] > nextTile[1]){
					this.y-= this.speed;
				}

				this.targetAngle = getDirectionAngle(x,y,this.x,this.y);

				this.sprite.update(this.x,this.y);

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

    checkCollisionWithCameraBorder : function(delta){
    	if(this.check_collision_with_camera_border_callback){
    		this.check_collision_with_camera_border_callback(delta);
    	}
    },

    render : function(){
    	console.log(this.x,this.y);
		this.sprite.render();
	},

	setPosition : function(x,y){
		this.x = x;
		this.y = y;
		this.sprite.update(this.x,this.y);
	}

});