var AssetManager = Class.extend({
	
	init : function () {
		this.successCount = 0;
	    this.errorCount = 0;
	    this.cache = {};
	  	this.downloadQueue = [];
	},

	queueDownload : function(path) {
    	this.downloadQueue.push(path);
	},

	downloadAll : function(downloadCallback) {

		var self = this;

		if (this.downloadQueue.length === 0) {
	    	downloadCallback();
	  	}

	    for (var i = 0; i < this.downloadQueue.length; i++) {
		    
		    var path = this.downloadQueue[i];

		    if(this.isImgFilename(path)){

			    var img = new Image();
			    
			    img.addEventListener("load", function() {
			    	self.successCount += 1;
			    	if (self.isDone()) {
			    		downloadCallback();
		    		}
			    }, false);
			    img.addEventListener("error", function() {
			    	self.errorCount += 1;
			    	if (self.isDone()) {
			    		downloadCallback();
		    		}
			    }, false);
			    img.src = path;
			    this.cache[path] = img;

			}else if(this.isSoundFilename(path)){

				// TODO: Load a sound
				soundManager.loadSound(path, function() {
			    	self.successCount += 1;
			    	if (self.isDone()) {
			    		downloadCallback();
		    		}
			    },
			    function(error) {
			    	self.errorCount += 1;
			    	if (self.isDone()) {
			    		downloadCallback();
		    		}
			    });

			}else if(this.isJSONFileName(path)){
				this.loadJSON(path, function(){
					self.successCount += 1;
			    	if (self.isDone()) {
			    		downloadCallback();
		    		}
				});
			}

	  	}
	},

	isDone : function() {
    	return (this.downloadQueue.length == this.successCount + this.errorCount);
	},

	getAsset : function(path) {
    	return this.cache[path];
	},

	getProcess : function() {
		return (this.successCount + this.errorCount)/this.downloadQueue.length;
	},

	isImgFilename : function(path){
		return  path.indexOf('.svg') != -1 || path.indexOf('.jpg') != -1 || path.indexOf('.png') != -1 || path.indexOf('.gif') != -1 || path.indexOf('.wp') != -1;
	},

	isSoundFilename : function(path){
		return  path.indexOf('.ogg') != -1 || path.indexOf('.wav') != -1 || path.indexOf('.mp3') != -1 || path.indexOf('.m4a') != -1;
	},

	isJSONFileName : function(path){
		return  path.indexOf('.json') != -1;
	},

	loadJSON : function(path,callback) {   
		var self = this;

	    var xobj = new XMLHttpRequest();
    
        xobj.overrideMimeType("application/json");
	    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
	    xobj.onreadystatechange = function () {
	          if (xobj.readyState == 4 && xobj.status == "200") {
	            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
	            self.cache[path] = JSON.parse(xobj.responseText);
	            callback();
	          }
	    };
	    xobj.send(null);  
	
	}

});