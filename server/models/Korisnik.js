const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const korisnikSchema = new mongoose.Schema({
  korisnickoIme: {
    type: String,
    required: true,
    unique: true
  },
  lozinka: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  uloga: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  aktivan: {
    type: Boolean,
    default: true
  }
});

korisnikSchema.pre('save', async function(next) {
  if (!this.isModified('lozinka')) return next();
  this.lozinka = await bcrypt.hash(this.lozinka, 10);
  next();
});

module.exports = mongoose.model('Korisnik', korisnikSchema);