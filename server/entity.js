var cls = require('./lib/class');

var Entity = cls.Class.extend({
    
    init: function (x, y, sprite, speed) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
    },

    setPosition : function(x,y){
        this.x = x;
        this.y = y;
    }

});

module.exports = Entity;