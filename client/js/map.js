var Map = Class.extend({

	init : function (context, data, camera) {
		this.layers = [];
		this.context = context;
		this.loadTileset(data);
		this.camera = camera;
		this.matrix = [];
	},

	loadTileset: function(json) {
		var self = this;

		this.data = json;

		this.tileset = new Image();

		this.tileset.onload = function(){
			self.renderLayers();
			self.load_callback();
		};

		this.tileset.src = json.tilesets[0].image;
  	},

  	renderLayers: function() {
	    for(var i in this.data.layers){
	    	this.renderLayer(this.data.layers[i]);
	    }
  	},

  	renderLayer: function(layer){
  		
  		var self = this;
		
		if (layer.type !== "tilelayer" || !layer.opacity) { 
			return; 
		}
		
		var s = this.context.canvas.cloneNode();
		
		var tileSize = this.data.tilewidth;
		
		s = s.getContext("2d");

		
		var startCol = Math.floor(this.camera.x / tileSize);
	    var endCol = startCol + (this.camera.width / tileSize);
	    var startRow = Math.floor(this.camera.y / tileSize);
	    var endRow = startRow + (this.camera.height / tileSize);
	    var offsetX = -this.camera.x + startCol * tileSize;
	    var offsetY = -this.camera.y + startRow * tileSize;
			
		// Iterate over layer's tiles
		for (var col = startCol; col <= endCol; col++) {
        	
        	for (var row = startRow; row <= endRow; row++) {

				var tile_idx = layer.data[row * layer.width + col];

				// Draw a tile
				if (tile_idx == 0) { // Empty tile (0) 
					continue; 
				}

				var img_x, img_y;
			
				tile = this.data.tilesets[0];
				
				tile_idx--;
				
				img_x = (tile_idx % (tile.imagewidth / tileSize)) * tileSize;
				
				img_y = ~~(tile_idx / (tile.imagewidth / tileSize)) * tileSize;

				var x = (col - startCol) * tileSize + offsetX;
            	
            	var y = (row - startRow) * tileSize + offsetY;

				// Draw a tile
				s.drawImage(this.tileset, img_x, img_y, tileSize, tileSize, Math.round(x), Math.round(y), tileSize, tileSize);
			
			}

		}

		this.context.drawImage(s.canvas, 0, 0);
  	},

  	onLoad : function(callback){
  		this.load_callback = callback;
  	}

});