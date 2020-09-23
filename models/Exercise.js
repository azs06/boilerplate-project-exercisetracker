const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  description: String,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  duration: Number,
  date: Date,
});

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);

module.exports.Exercise = ExerciseModel