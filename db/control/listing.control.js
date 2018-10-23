const listings = require('../models/listing.schema.js');

exports.create = function(req, res) {
  let listing = new listings(req.body);

  listing.save((err) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
}

exports.find = function(req, res) {
  let listing = req.params.listingId;

  listings.findOne({'_id': listing}, (err, entry) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(entry);
    }
  });
}

exports.update = function(req, res) {
  let listing = req.listing;

  listings.findOneByIdAndUpdate(listing._id, req.body,
                                {'new': true}, (err, entry) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(entry);
    }
  });
}

exports.delete = function(req, res) {
  let listing = req.listing;

  listings.deleteOne(listing, (err, entry) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(entry);
    }
  });
}

exports.list = function(req, res) {
  listings.find({}).sort('time.start').exec((err, entries) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(entries);
    }
  });
}

exports.recentRange = function(req, res) {
  let from = parseInt(req.params.from),
    to = parseInt(req.params.to);

  listings.find({})
    .sort({ created_at: -1 })
    .where('created_at')
    .lte(Date.now())
    .skip(from)
    .limit(to - from)
    .exec((err, entries) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(entries);
      }
    });
}

exports.recent = function(req, res) {
  listings.find({})
    .sort({ created_at: -1 })
    .where('created_at')
    .lte(Date.now())
    .exec((err, entries) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(entries);
      }
    });
}

exports.upcomingRange = function(req, res) {
  let from = parseInt(req.params.from),
    to = parseInt(req.params.to);

  listings.find({})
    .sort('time.start')
    .where('time.start')
    .gte(Date.now())
    .skip(from)
    .limit(to - from)
    .exec((err, entries) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(entries);
      }
    });
}

exports.upcoming = function(req, res) {
  listings.find({})
    .sort('time.start')
    .where('time.start')
    .gte(Date.now())
    .exec((err, entries) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(entries);
      }
    });
}
