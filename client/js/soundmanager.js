var SoundManager = Class.extend({
	
	init : function(){

		this.context = null;
		this.sounds = {};
		this.volume = 2;
		this.mainNode = null;

		try {

	    	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	    	
	    	this.context = new AudioContext();

	    	this.mainNode = this.context.createGain();
			
			this.mainNode.gain.value = this.volume;

			this.mainNode.connect(this.context.destination);

	  	}catch(e) {
	  		
	  		console.log('Web Audio API is not supported in this browser');
	  	
	  	}

	},

	loadSound : function(path, callbackOnDone, callbackOnError) {
	
		var self = this;

		var request = new XMLHttpRequest();
	  	request.open('GET', path, true);
	  	request.responseType = 'arraybuffer';

	  	request.onload = function() {
	    	self.context.decodeAudioData(request.response, 
		    	function(buffer) { // on susses
		      		
		      		var sound = { buffer:buffer };

		      		self.sounds[path] = sound;
		    		
		    		callbackOnDone(buffer);

		    	}, function(error){ // on error

		    		callbackOnError(error);

		    		console.log(error);

		    	});
	  	};

	  	request.send();

	},

	playSound : function(path, loop){

		var sound = this.sounds[path];

		if(sound == null){
	    	return;
		}

		var source = this.context.createBufferSource();
	  	
	  	source.buffer = sound.buffer;

	  	// loop the audio?
	  	source.loop = loop;

	  	// connect the source to the main node
	  	source.connect(this.mainNode);

	  	// set the gain (volume)
	  	//source.gain.value = this.volume;

	  	// play sound
	  	source.start(0);

	},

	muteSound : function(path){

		var sound = this.sounds[path];

		if(sound == null){
	    	return;
		}

		sound.gainNode.gain.value = 0;

	},

	muteAll : function(){

		this.mainNode.gain.value = 0;

	},

	togglemute : function(){

		if(this.mainNode.gain.value > 0){
			this.muteAll();
		}else{
			this.mainNode.gain.value = this.volume;
		}

	}

});