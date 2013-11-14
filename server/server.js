var express = require('express');
var http = require('http');
var path = require('path');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://127.0.0.1:27017/test');
var app = express();

app.set('port', process.env.PORT || 3000);

// app.get('/', routes.index);
// app.get('/users', user.list);
// app.get('/helloworld', routes.helloworld);
app.get('/get_repors', get_repors(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function get_repors(db) {
    return function(req, res) {
		var collection = db.get("reports");	  
	    collection.find({},{limit:20},function(e,docs){
	    	res.json(docs);
	    })
    };
};