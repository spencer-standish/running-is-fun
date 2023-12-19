const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const runSchema = new Schema({
  username: { type: String, required: true },
  distance: { type: Number, required: true },
  distanceUnit: { type: String, required: true },
  hours: { type: Number, default: 0 },      
  minutes: { type: Number, default: 0 },    
  seconds: { type: Number, default: 0 },    
  date: { type: Date, required: true },
  time: { type: String },
  pace: { type: Number },
  weather: {
    temperature: { type: Number },
    conditions: { type: String },
  },
  notes: { type: String },
}, {
  timestamps: true,
});

const Run = mongoose.model('Run', runSchema);

module.exports = Run;
