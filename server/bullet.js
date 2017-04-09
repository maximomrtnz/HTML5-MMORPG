var Entity = require('./lib/entity');

var Bullet = Entity.extend({
    
    init: function (parent,angle) {
        this._super(Math.random(), x, y, Math.cos(angle/180*Math.PI) * 10,  Math.sin(angle/180*Math.PI) * 10);

        this.parent = parent;
        this.timer = 0;
        this.toRemove = false;
    },
    update : function(){
        if(this.timer++ > 100)
            this.toRemove = true;
        this._super.update();
       
        for(var i in Player.list){
            var p = Player.list[i];
            if(this.getDistance(p) < 32 && this.parent !== p.id){
                //handle collision. ex: hp--;
                this.toRemove = true;
            }
        }
    }

}

module.exports = Bullet;