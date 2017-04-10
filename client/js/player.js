var Player = Entity.extend({

	init : function(x,y,sprite,speed){
		this._super(x,y,sprite,speed);
	},

	move : function (x,y) {
		this.x += x;
		this.y += y;
		this.sprite.update(this.x,this.y);
	},

	attack : function(){

	},

	render : function(){
		this.sprite.render();
	}

});