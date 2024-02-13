const Korisnik = require('../models/Korisnik');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerKorisnik = async (req, res) => {
    try {
      const { korisnickoIme, email, lozinka } = req.body;
  
      
      let korisnik = await Korisnik.findOne({ email });
      if (korisnik) {
        return res.status(400).json({ message: 'Korisnik već postoji' });
      }
  
     
      korisnik = new Korisnik({ korisnickoIme, email, lozinka });
      await korisnik.save();
  
      
      const token = jwt.sign({ korisnikId: korisnik._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
  
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.loginKorisnik = async (req, res) => {
    try {
      
      const { email, lozinka } = req.body;
      
      const korisnik = await Korisnik.findOne({ email });
      if (!korisnik) {
        return res.status(400).json({ message: 'Korisnik s ovim mailon ne postji' });
      }
      
      if (!korisnik.aktivan) {
        return res.status(403).json({ message: 'Račun deaktiviran!' });
      }
      const isMatch = await bcrypt.compare(lozinka, korisnik.lozinka);
      if (!isMatch) {
        return res.status(400).json({ message: 'Pogrešna lozinka' });
      }
  
      const token = jwt.sign({ korisnikId: korisnik._id, uloga: korisnik.uloga }, process.env.JWT_SECRET, { expiresIn: '2d' });
  
      res.json({ token, uloga: korisnik.uloga });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.vratiSveKorisnike = async (req, res) => {
    try {
      const korisnici = await Korisnik.find({});
      res.json(korisnici);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.azurirajKorisnika = async (req, res) => {
    try {
      const { korisnickoIme, email, uloga, aktivan } = req.body;
      const korisnik = await Korisnik.findByIdAndUpdate(req.params.id, { korisnickoIme, email, uloga, aktivan }, { new: true });
      
      if (!korisnik) {
        return res.status(404).json({ message: 'Korisnik nije pronađen' });
      }
  
      res.json(korisnik);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deaktivirajKorisnika = async (req, res) => {
    try {
      const korisnik = await Korisnik.findByIdAndUpdate(req.params.id, { aktivan: req.body.aktivan }, { new: true });
      
      if (!korisnik) {
        return res.status(404).json({ message: 'Korisnik nije pronađen' });
      }
  
      res.json(korisnik);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 