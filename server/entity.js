var cls = require('./lib/class');

var Entity = cls.Class.extend({
    
    init: function (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    },

    setPosition : function(x,y){
        this.x = x;
        this.y = y;
    }

});

module.exports = Entity;