var cls = require('./lib/class');

var World = cls.Class.extend({
    
    init: function() {
        
        var self = this;
        
        this.map = null;

        this.players = {};

    },

    update : function(){

        var packs = [];

        for(id in this.players){
            
            var player = this.players[id];

            var socket = player.socket;

            var x = player.x + 1;
            var y = player.y + 1;

            player.setPosition(x,y);

            packs.push({
                x:player.x,
                y:player.y,
                number:player.id
            });

        }

        this.pushToWorld('newPosition',packs,null);

    },

    onPlayerConnect : function(player){
        
        var self = this;

    	this.players[player.id] = player; 

        player.onExit(function() {
            self.removePlayer(player);
        });

        player.onBroadcast(function(event, message){
            pushToWorld(event,message,player.id);
        });

    },

    removePlayer: function(player) {
        delete this.players[player.id];
    },

    pushToWorld : function(event, message, idToIgnore){
        for(id in this.players){
            if(id == idToIgnore){
                continue;
            }
            this.players[id].socket.emit(event,message,id);
        }
    }

});

module.exports = World;