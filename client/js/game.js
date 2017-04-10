var Game = Class.extend({
	
	init: function() {
		
		var self = this;

		this.canvas = document.getElementById("ctx");

		this.canvas.addEventListener('click',this.click.bind(self),false);

		this.context = this.canvas.getContext("2d");
		this.canvas.scale = 1;
		this._previousElapsed = 0;
		this.currentPath = [];

		// Adding JSON
		assetManager.queueDownload('map.json');

		// Adding Images
		assetManager.queueDownload('img/leatherarmor.png');

		assetManager.downloadAll(function(){self.setup();});
	},

	setup : function(){

		var self = this;

		// Created a Camera
		this.camera = new Camera(512, 512, assetManager.getAsset('map.json'), 256);

		// Create Tiled Map
		this.map = new Map(this.context,assetManager.getAsset('map.json'), this.camera);

		this.map.onLoad(function(){
			
			// Run the Game
			self.run();
		
		})

		this.player = new Player(0,0,new Sprite(this.context,assetManager.getAsset('img/leatherarmor.png'),32,32,5),2);	

	},

	render: function(){
		this.map.renderLayers();
		this.player.render();
	},

	update : function(delta){

		this.camera.move(delta,0,0);
		
		if(this.pathEnd){

			var currentPath = findPath(this.map.data,this.map.data.layers[1].data,[Math.floor(this.player.x),Math.floor(this.player.y)],this.pathEnd);

			if(currentPath.length > 1){
			
				var dx = currentPath[1][0] - this.player.x, dy = currentPath[1][1] - this.player.y, moveX = dx*0.03, moveY = dy*0.03;
				
				if(moveX){
					moveX = Math.abs(moveX)/moveX * Math.max(moveX,0.05);
				}
				if(moveY){
					moveY = Math.abs(moveY)/moveY * Math.max(moveY,0.05);
				}

				console.log(moveX,moveY);

				this.player.move(moveX,moveY);

			}else{
				this.pathEnd = null;
			}

		}
	},

	run : function(elapsed){

		if(!elapsed){
			elapsed = this._previousElapsed;
		}

		window.requestAnimationFrame(this.run.bind(this));

		var self = this;	
		
		var delta = (elapsed - this._previousElapsed) / 1000.0;
	    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
	    this._previousElapsed = elapsed;

		this.update(delta);
		this.render();
	},

	click : function(e){
	
		var x;
		var y;

		// grab html page coords
		if (e.pageX != undefined && e.pageY != undefined){
			x = e.pageX;
			y = e.pageY;
		}else{
			x = e.clientX + document.body.scrollLeft +
			document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop +
			document.documentElement.scrollTop;
		}

		// make them relative to the canvas only
		x -= this.canvas.offsetLeft;
		y -= this.canvas.offsetTop;

		var tileSize = this.map.data.tilewidth;

		// return tile x,y that we clicked
		this.pathEnd = [Math.floor(x/tileSize),Math.floor(y/tileSize)];

		console.log([Math.floor(this.player.x),Math.floor(this.player.y)],this.pathEnd);
	}

});