const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: { type: String, unique: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports.User= UserModel