  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;    

  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

	
	var reps = db.collection('reports');
	
	// var lat = rand(-17, 50);
	// var longt = rand(4, 35);
	
	// console.log(format("lat = %d", lat));
	// console.log(format("longt = %d", longt));
	
	var x = rand(0, 200);
	var y = rand(0, 200);
	
	var blood_low = Math.min(x, y);
	var blood_high = Math.max(x, y);
	
	for(var i = 0; i < 10000; ++i)
	{
	reps.insert(
		{ "coords" : [ 
			{
				"type" : "rep",
				"lat": rand(-17, 50), 
				"longt": rand(4, 35)
			}, {
				"type" : "checkin",
				"lat": rand(-17, 50), 
				"longt": rand(4, 35)
			}, {
				"type" : "work",
				"lat": rand(-17, 50), 
				"longt": rand(4, 35)
			},{
				"type" : "home",
				"lat": rand(-17, 50), 
				"longt": rand(4, 35)
			}], 
			"sympts" : [ 
			{ 
				"type" : "temp",
				"value" : rand(35, 42),
			},
			{ 
				"type" : "blood-low",
				"value" :  blood_low,
			},
			{ 
				"type" : "blood-high",
				"value" : blood_high,
			},], 
			diag : [ 
			{ 
				"name": "flu",
				"grade":  rand(1,0),
			},
			{ 
				"name": "cancer",
				"grade":  rand(1,0),
			},
			{ 
				"name": "Ebola",
				"grade":  rand(1,0),
			}], 
			// "rep-by" : "aaa", 
			age: rand(10, 50), 
			id: randomString(9),
			date : new Date(new Date() - rand(0,90000000000))
		}, function(err, docs) { db.close(); });
	}
    // var collection = db.collection('blah');
    // collection.insert({a:2, b:5, c: "5"}, function(err, docs) {

      // collection.count(function(err, count) {
        // console.log(format("count = %s", count));
      // });

      // // Locate all the entries using find
      // collection.find().toArray(function(err, results) {
        // console.dir(results);
        // // Let's close the db
        // db.close();
      // });      
    // });
  })
  
  function rand(x, y)
  {
	return Math.random() * (y - x) + x;
  }
  
  function randomString(length) {
    var chars = '0123456789'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}