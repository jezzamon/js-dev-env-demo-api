'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arrayLimit = function arrayLimit(val) {
  return val.length <= 2;
};

var InvdividualSchema = new Schema({
  name: {
    first: { type: String, required: true },
    middle: String,
    last: { type: String, required: true },
    alias: [String]
  },
  parents: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Individual'
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
  },
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'Individual' }],
  relations: [{
    individual_id: { type: Schema.Types.ObjectId, ref: 'Individual' },
    relation: {
      type: String,
      enum: ["father", "mother", "brother", "sister", "son", "daugher"]
    },
    subtype: {
      type: String,
      enum: ["biological", "adopted", "step"]
    }
  }],
  events: {

    birth: {
      date: { type: Date, required: true },
      location: {
        city: String,
        state: String,
        country: String,
        coordinates: { type: [Number], index: '2dspehere' }
      },
      contributor: { type: Schema.Types.ObjectId, ref: 'contributor' },
      records: { type: Schema.Types.ObjectId, ref: 'records' }
    },

    death: {
      date: Date,
      location: {
        city: String,
        state: String,
        country: String,
        coordinates: { type: [Number], index: '2dspehere' }
      },
      contributor: { type: [Number], index: '2dspehere' }

    },

    marriage: [{
      date: Date,
      end_date: Date,
      location: {
        city: String,
        state: String,
        country: String,
        coordinates: { type: [Number], index: '2dspehere' }
      },
      partner: { type: Schema.Types.ObjectId, ref: 'Individual' }
    }]

  }
});

module.exports = mongoose.model('Individual', InvdividualSchema);