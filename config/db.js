var mongoose = require('mongoose');

var url = 'mongodb://localhost/fixhop';
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('connecting', function() {
    console.log('Connecting to ', url);
});

db.on('connected', function() {
    console.log('Connected to ', url);
});

db.on('disconnecting', function() {
    console.log('Disconnecting from ', url);
});

db.on('disconnected', function() {
    console.log('Disconnected from ', url);
});

db.on('error', function(err) {
    console.error('Error ', err.message);
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(function(err) {
        console.error('Error ', err.message);
    });

module.export = mongoose.connection;