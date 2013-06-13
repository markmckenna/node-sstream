/*
function storeJson(json, file) {
	var ofstream = fs.createWriteStream(file);
	var ss = new sstream.StringToStream(JSON.stringify(json));
	ss.pipe(ofstream);
} */

var fs = require('fs');

describe('node-sstream', function() {
	var sstream = require('../index.js');

	it('should pipe from a stream into a string without distortion', function(done) {
		var ifstream = fs.createReadStream('test/test.json');
		var ss = new sstream.StreamToString();
		ifstream.pipe(ss);

		ss.on('finish', function() {
			// err should be undefined
			var data = JSON.parse(ss.data);
			data.should.have.property('name', 'test file');
			data.should.have.property('value', 12345);
			done();
		});
	});

	it('should pipe from a string into a stream without distortion');
	it('should be able to pipe large strings without flooding the writer');
	it('should perform well');
});