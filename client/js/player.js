var Player = Entity.extend({

	move : function () {
		if(this.move_callback){
			this.move_callback();
		}
	},

	attack : function(){

	},

	onMove : function(callback){
		this.move_callback = callback;
	},

	getAStarMovement: function(){
		var map = this.getWalkableMap(),
		path;
		map[Math.floor(this.position.y)][Math.floor(this.position.x)] = 's';
		map[Math.floor(this.targetAgent.position.y)][Math.floor(this.targetAgent.position.x)] = 'g';

		path = astar(map,'manhattan',true);
		if(path && path.length>1){
			return {
				x: path[1].col,
				y: path[1].row
			};
		}
		return this.position;
	}

});