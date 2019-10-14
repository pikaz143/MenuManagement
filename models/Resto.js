const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// shape of data

// sub document
const MenuSchema = new Schema({
  item: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const RestoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    minlength: 6
  },
  email: {
    type: String
    // unique: true
  },
  veg: [MenuSchema],
  nonVeg: [MenuSchema],
  desserts: [MenuSchema]
});

module.exports = mongoose.model('Resto', RestoSchema);
