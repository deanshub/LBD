var express = require('express');
var http = require('http');
var path = require('path');

// New Code
// var mongo = require('mongodb').mongo;
// mongo.connect('localhost:27017/test');
//var monk = require('monk');
//var db= mongo.db( 'test', new mongo.Server( 'localhost', 27017, {}), {w:0});
//var db = mongo('mongodb://127.0.0.1:27017/test');
var db = require('mongoskin').db('localhost:27017/test');
// var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
// var dataSchema = mongoose.Schema({}, { collection: 'reports' });
// var modReport = mongoose.model('ReportModel'.dataSchema);
var app = express();

app.configure(function(){
  app.use('/lbd', express.static("..\\web"));
  // server.use(express.static(__dirname + '/public'));
});

app.set('port', process.env.PORT || 3000);

// app.get('/', routes.index);
// app.get('/users', user.list);
// app.get('/helloworld', routes.helloworld);
app.get('/reports', get_reports(db));
app.get('/diags', get_diags(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function get_reports(db) {
    return function(req, res) {
    	//console.log(db.collection('reports').distinct('diag.name'));
    	db.collection('reports').find({},{limit:100}).toArray(function(err, result) {
		    if (err) throw err;
		    res.send(result);
		})
    };
};

function get_diags(db) {
    return function(req, res) {
    	db.collection('reports').distinct("diag.name", {}, function(err,docs) {
    		res.send(docs);
    	});
    };
};