'use strict';

/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var mongoose = require('mongoose'),
    Listing = require('./models/listing.schema.js'),
    config = require('./config.js'),
    listings = require('./listings.json').entries;

/* Connect to db */
mongoose.connect(config.db.uri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    /* 
        Instantiate a mongoose model for each listing object in the JSON file, 
        and then save it to your Mongo database 
    */
    for (var i = 0; i < listings.length; i++) {
        var listing = new Listing({
            name: listings[i].name,
            time: {
                start: listings[i].time.start,
                end: listings[i].time.end
            },
            location: listings[i].location,
            posted_by: listings[i].posted_by,
            food_type: listings[i].food_type,
            meta: {
                up: listings[i].meta.up,
                down: listings[i].meta.down,
                flagged: listings[i].meta.flagged
            }
        });

        listing.save(function (err) {
            if (err) return console.log(err);
        });
    }
});

// node.js needs to wait for mongoose to finish operations before closing connection, give it 1sec
setTimeout(function () {
    mongoose.connection.close();
}, 1000);