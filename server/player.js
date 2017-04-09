var Entity = require('./entity');

var Player = Entity.extend({
    
    init: function (socket, world) {
        
        var self = this;
        
        this._super(socket.id,socket.x,socket.y);

        this.socket = socket;

        this.socket.on('disconnect', function(){
            if(self.exit_callback) {
                self.exit_callback();
            }
        });

        this.socket.on('move', function(){
            self.broadcast('move',data,self.id);
        });

    },


    onExit: function(callback) {
        this.exit_callback = callback;
    },

    onBroadcast : function(callback){
        this.broadcast_callback = callback;
    },

    broadcast: function(event,data) {
        if(this.broadcast_callback) {
            this.broadcast_callback(event,data);
        }
    }

});

module.exports = Player;