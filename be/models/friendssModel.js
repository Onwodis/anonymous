const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const Friends = new Schema({
  iam:String,
  andmyfriendis:String,
  common: String,
  username:String,
  chatIndex:Number
});

module.exports = Mongoose.model('Friends', Friends);
