var Player = Entity.extend({

	init : function(x,y,sprite,speed){
		
		var self = this;

		this._super(x,y,sprite,speed);

		this.sprite.onRequestSpriteSheetRow(function(){

			// This is depends on every spritesheet of every entity

			if(self.targetAngle == 0){ // RIGHT
				return 1;
			}else if(self.targetAngle == 180){ // LEFT
				return 1;
			}else if(self.targetAngle == 90){ // UP
				return 4;
			}else if(self.targetAngle == 270){ // DOWN
				return 7;
			}	

		});

	},


	attack : function(){

	}

});