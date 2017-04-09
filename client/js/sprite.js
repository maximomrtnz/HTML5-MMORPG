var Sprite = Class.extend({

	init : function (context,image,frameWidth,frameHeight,numberOfFrames) {
		this.context = context;
	    this.frameWidth = frameWidth;
	    this.frameHeight = frameHeight;
	    this.image  = image ;
	    this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 0;
        this.numberOfFrames = numberOfFrames;
	},

	render : function (x,y) {
		
		var row = Math.floor(this.frameIndex / this.numberOfFrames);
      	var col = Math.floor(this.frameIndex % this.numberOfFrames);

        // Draw the animation
        this.context.drawImage(
         this.image,
         col * this.frameWidth, row * this.frameHeight,
         this.frameWidth, 
         this.frameHeight,
         x, 
         y,
         this.frameWidth, 
         this.frameHeight);
    },

    update : function () {

        this.tickCount += 1;
			
        if (this.tickCount > this.ticksPerFrame) {
        
        	this.tickCount = 0;
        	
            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
            }else if (this.loop) {
                frameIndex = 0;
            }

        }
    }



})