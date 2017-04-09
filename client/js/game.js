var Game = Class.extend({
	
	init: function() {
		
		var self = this;

		this.canvas = document.getElementById("ctx");

		this.addEventListener('click',function(evt){
			self.onClick(evt);
		},false);

		this.context = this.canvas.getContext("2d");
		this.canvas.scale = 1;

		// Adding JSON
		assetManager.queueDownload('map.json');

		// Adding Images
		assetManager.queueDownload('img/leatherarmor.png');

		assetManager.downloadAll(function(){self.setup();});
	},

	setup : function(){

		var self = this;

		// Create Tiled Map
		this.map = new Map(this.context,assetManager.getAsset('map.json'));

		this.map.onLoad(function(){
			
			// Run the Game
			self.run();
		
		})

		this.character = new Sprite(this.context,assetManager.getAsset('img/leatherarmor.png'),32,32,5);	

	},

	render: function(){
		this.map.renderLayers();
		this.character.render(this.canvas.width/2,this.canvas.height/2);
	},

	update : function(){
		this.character.update();
	},

	run : function(){

		var self = this;

		this.update();
		this.render();

		requestAnimFrame(function(){self.run();});
	
	},

	onClick : function(event){
		var x;
		var y;
		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		}
		else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= gCanvasElement.offsetLeft;
		y -= gCanvasElement.offsetTop;
	}

});