var Sprite = Class.extend({

	init : function (context,image,x,y,frameWidth,frameHeight,numberOfFrames) {
		this.context = context;
	    this.frameWidth = frameWidth;
	    this.frameHeight = frameHeight;
	    this.image  = image ;
	    this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 0;
        this.numberOfFrames = numberOfFrames;
        this.ticksPerFrame = 4;
        this.x = x;
        this.y = y;
	},

	render : function () {
		
		var row = this.requestSpriteSheetRow();
      	
        var col = Math.floor(this.frameIndex % this.numberOfFrames);

        this.context.drawImage(this.image,col * this.frameWidth, row * this.frameHeight,this.frameWidth,this.frameHeight,this.x,this.y,this.frameWidth,this.frameHeight);

    },

    update : function (x,y) {

        this.x = x;
        this.y = y;

        this.tickCount += 1;
            
        if (this.tickCount > this.ticksPerFrame) {
        
            this.tickCount = 0;

            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
            }else{
                this.frameIndex = 0;
            }

        }
        
    },

    requestSpriteSheetRow(){
        if(this.request_row_callback){
            return this.request_row_callback();
        }else{
            return 0;
        }
    },

    onRequestSpriteSheetRow(callback){
        this.request_row_callback = callback;
    }



})