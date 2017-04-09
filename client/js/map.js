var Map = Class.extend({

	init : function (context, data) {
		this.layers = [];
		this.context = context;
		this.loadTileset(data);
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
		var s = this.context.canvas.cloneNode(),
		size = this.data.tilewidth;
		s = s.getContext("2d");
		if (this.layers.length < this.data.layers.length) {
			layer.data.forEach(function(tile_idx, i) {
				if (!tile_idx) { 
					return; 
				}
				var img_x, img_y, s_x, s_y,
				tile = self.data.tilesets[0];
				tile_idx--;
				img_x = (tile_idx % (tile.imagewidth / size)) * size;
				img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
				s_x = (i % layer.width) * size;
				s_y = ~~(i / layer.width) * size;
				s.drawImage(self.tileset, img_x, img_y, size, size,
				      s_x, s_y, size, size);
				});
				self.layers.push(s.canvas.toDataURL());
				self.context.drawImage(s.canvas, 0, 0);
		}
		else {
			this.layers.forEach(function(src) {
				var i = new Image();
				i.src = src;
				self.context.drawImage(i, 0, 0);
			});
		}
  	},

  	onLoad : function(callback){
  		this.load_callback = callback;
  	}

});