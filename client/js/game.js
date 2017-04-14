var Game = Class.extend({
	
	init: function() {
		
		var self = this;

		this.canvasBackground = document.getElementById("background");
		this.canvasEntities = document.getElementById("entities");


		this.canvasEntities.addEventListener('click',this.click.bind(self),false);

		this.contextBackground = this.canvasBackground.getContext("2d");
		this.contextEntities = this.canvasEntities.getContext("2d");

		this._previousElapsed = 0;
		this.currentPath = [];

		this.drawBackground = true;

		this.transitionTo = null;

		this.currentState = GameStates.LOADING;

		// Adding JSON
		assetManager.queueDownload('map.json');

		// Adding Images
		assetManager.queueDownload('img/leatherarmor.png');

		assetManager.downloadAll(function(){self.setup();});
	},

	setup : function(){

		var self = this;

		// Created a Camera
		this.camera = new Camera(512, 512, assetManager.getAsset('map.json'), 512);

		// Create Tiled Map
		this.map = new Map(this.contextBackground,assetManager.getAsset('map.json'), this.camera);

		this.map.onLoad(function(){
			
			self.currentState = GameStates.PLAYING;

			// Run the Game
			self.run();
		
		})

		this.player = new Player(0,0,new Sprite(this.contextEntities,assetManager.getAsset('img/leatherarmor.png'),0,0,32,32,4),4);	

		this.player.onRequestPath(function(x,y){

			// Get Final tile
			var goal = this.requestTile(x,y);

			// Get Started tile
			var start = this.requestTile(this.x,this.y);

			return findPath(self.map.data,self.map.data.layers[1].data,start,goal);

		});

		this.player.onRequestTile(function(x,y){
			
			return xy2Tile(x,y,self.map.data.tilewidth);

		});

		this.player.onCheckCollisionWithCameraBorder(function(delta){

			if (this.x + this.sprite.frameWidth >= self.camera.width) {
				
				self.currentState = GameStates.TRANSITIONING;	
				
				self.transitionTo = {
					x : this.x,
					y : self.camera.y
				}

				this.setPosition(0,this.y);

				return;
			
			}

		});

		this.player.onRequestGridPositionByTile(function(tile){
			return tile2GridPosition(tile[0],tile[1],self.map.data.tilewidth);
		});

	},

	render: function(){

		this.contextEntities.clearRect(0,0,this.canvasEntities.width,this.canvasEntities.height);

		if(this.currentState == GameStates.PLAYING){

			if(this.drawBackground){
				this.map.renderLayers();
				this.drawBackground = false;
			}


		}else if(this.currentState == GameStates.TRANSITIONING){

			this.map.renderLayers();

		}

		this.player.render();

	},

	update : function(delta){
		
		// Check game state
		if(this.currentState == GameStates.PLAYING){
		
			this.player.update();
		
		}else if(this.currentState == GameStates.TRANSITIONING){

			// Move camera to target position
			if(this.transitionTo.x > this.camera.x || this.transitionTo.y > this.camera.y){
				this.camera.moveTo(delta,this.transitionTo.x,this.transitionTo.y);
			}else{
				this.currentState = GameStates.PLAYING;
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

	click : function(evt){
	
		var rect = this.canvasEntities.getBoundingClientRect();

		var x = evt.clientX - rect.left;
		var y = evt.clientY - rect.top;

		var gridPosition = xy2GridPosition(x,y,this.map.data.tilewidth);

		this.player.moveTo(gridPosition[0],gridPosition[1]);

	}

});