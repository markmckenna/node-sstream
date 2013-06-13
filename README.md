node-sstream
============

String-to-stream adapter for Node v0.10+ streams

example
=======

loadstore.js
------------

	var sstream = require('node-sstream');
	var fs = require('fs');

	function loadJson(file, done) {
		var ifstream = fs.createReadStream(file);
		var ss = new sstream.StreamToString();
		ifstream.pipe(ss);
		ss.on('finish', function() { done(JSON.parse(ss.data)); });
	}

	function storeJson(json, file, done) {
		var ofstream = fs.createWriteStream(file);
		var ss = new sstream.StringToStream(JSON.stringify(json));
		ss.pipe(ofstream);
		ofstream.on('finish', done);
	}