const mongoose = require('mongoose');

const putovanjeSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true
  },
  slika: {
    type: String,
    required: true
  },
  opis: {
    type: String,
    required: true
  },
  kategorija: {
    type: String,
    enum: ['more', 'planine', 'gradovi', 'avantura'],
    required: true
  },
  polazak: {
    type: Date,
    required: true
  },
  povratak: {
    type: Date,
    required: true
  },
  ucesnici: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Korisnik'
  }]
});

module.exports = mongoose.model('Putovanje', putovanjeSchema);