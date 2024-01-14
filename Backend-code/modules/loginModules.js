// models.js
const mongoose = require('../db');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  description: String,
  token: String,
});

const User = mongoose.model("User", UserSchema);

//category modal
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});

const Category = mongoose.model('Category', categorySchema);

// product modal
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  packSize: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  MRP: { type: Number, required: true },
  image: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {
  User,
  Category,
  Product,
};
