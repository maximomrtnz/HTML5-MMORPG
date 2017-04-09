var cls = require("../lib/class");

var mongojs = require("mongojs");

var DatabaseHandler = cls.Class.extend({

	init: function(){
		this.db = mongojs('localhost:27017/myGame', ['account','progress']);
	},

	isValidPassword : function(data,cb){
	    this.db.account.find({username:data.username,password:data.password},function(err,res){
	        if(res.length > 0)
	            cb(true);
	        else
	            cb(false);
	    });
	},

	isUsernameTaken : function(data,cb){
	    this.db.account.find({username:data.username},function(err,res){
	        if(res.length > 0)
	            cb(true);
	        else
	            cb(false);
	    });
	},
	
	addUser : function(data,cb){
	    this.db.account.insert({username:data.username,password:data.password},function(err){
	        cb();
	    });
	}

});


module.exports = DatabaseHandler;