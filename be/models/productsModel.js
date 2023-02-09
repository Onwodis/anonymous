const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = Mongoose;

const options = {
  separator: '_',
  lang: 'en',
  truncate: 120,
};

Mongoose.plugin(slug, options);

// Product Schema
const ProductSchema = new Schema({
  category: {
    type: String,
  },
  email: {
    type: String,
  },
  contactno: {
    type: String,
  },
  name: {
    type: String,
    // trim: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
  availability: {
    type: String,
  },
  imageKey: {
    type: String,
  },
  productIndex: Number,
  productSerial: String,
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  taxable: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: String,
    default: null,
  },
  condition: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Product', ProductSchema);
