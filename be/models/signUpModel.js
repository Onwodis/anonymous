const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  logintimes: {
    type: Number,
  },
  anonymous: {
    type: String,
  },
  messagelist: {
    type: String,
  },
  friends: {
    femail: String,
    fanonymous: String,
  },
  newlogin: {
    type: String,
  },
  regDate: {
    type: String,
  },
  lastlogin: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'This email is already in use'],
  },
  img: String,
  pwrd: {
    type: String,
    minLength: [6, 'Password is too short'],
  },
  phone: Number,
  birth: {
    type: String,
    required: [true, 'Date of birth can not be empty'],
  },
  username: {
    type: String,
    unique: [true, 'Username exists'],
    required: [true, 'Username can not be empty'],
    lowercase: true,
  },
  regdate: String,
  randno: String,
  newlogin: String,
  logintimes: Number,
  lastlogin: String,
  sn: String,
  userid: Number,
  activeStatus: {
    default: 'active',
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  admin: {
    type: Boolean,
    default: false,
  },

  products: {
    id: Number,
    name: String,
    price: Number,
    itempicture: String,
  },
});

module.exports = new mongoose.model('Signup', signupSchema);
