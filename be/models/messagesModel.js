const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const MessageSchema = new Schema({
  messagedate: String,
  time: String,
  message: String,
  messageid: String,
  memail: String,
  manonymous: String,
  from: String,
  to: String,
  messageindex: {
    type:Number,
  },
  common: String
});

module.exports = Mongoose.model('Messages', MessageSchema);
