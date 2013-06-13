var Stream = require('stream').Stream;
var util = require('util');

var Readable = Stream.Readable;
var Writable = Stream.Writable;


util.inherits(StringToStream, Readable);
exports.StringToStream = StringToStream;
function StringToStream(str, options) {
	if (!(this instanceof StringToStream))
		return new StringToStream(str, options);

	options = options || {};

	Readable.call(this, options);

	// Ignore the high water mark, since this is a free data source

	this.data = str;
	this.start = options.hasOwnProperty('start') ? Math.max(options.start, 0) : 0;
	this.end = options.hasOwnProperty('end') ? Math.min(options.end, str.length) : str.length; // TODO: Check overrun

	this.readPos = this.start;
}

StringToStream.prototype._read = function(n) {
	var toRead = Math.min(this.end-this.readPos, n);
	if (toRead <= 0) return this.push(null);

	var buf = new Buffer(toRead); // TODO: encoding?
	buf.write(this.data.slice(this.readPos, this.readPos+toRead)); // TODO: encoding?

	this.push(buf);
	this.readPos += toRead;
}


util.inherits(StreamToString, Writable);
exports.StreamToString = StreamToString;
function StreamToString(options) {
	if (!(this instanceof StreamToString))
		return new StreamToString(options);

	options = options || {};

	Writable.call(this, options);

	// Ignore the high water mark, since this is a free data source

	this.data = "";
}

StreamToString.prototype._write = function(chunk, encoding, cb) {
	this.data += chunk; // TODO: Encoding?
	cb();
}