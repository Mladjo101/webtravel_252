const Putovanje = require('../models/Putovanje');



exports.dodajPutovanje = async (req, res) => {
    try {
      const { naziv, slika, opis, kategorija, polazak, povratak } = req.body;
      let putovanje = new Putovanje({ naziv, slika, opis, kategorija, polazak, povratak });
      await putovanje.save();
      res.status(201).json(putovanje);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.vratiSvaPutovanja = async (req, res) => {
    try {
      const putovanja = await Putovanje.find({})
      res.json(putovanja);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.vratiPutovanjaPoId = async (req, res) => {
    try {
      const putovanje = await Putovanje.findById(req.params.id)
  
      if (!putovanje) {
        return res.status(404).json({ message: 'NemaPutovanja' });
      }
  
      res.json(putovanje);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.obrisiPutovanje = async (req, res) => {
    try {
      const putovanje = await Putovanje.findById(req.params.id);
  
      if (!putovanje) {
        return res.status(404).json({ message: 'Nema putovanja' });
      }
      await Putovanje.deleteOne({ _id: req.params.id });
      res.json({ message: 'Putovanje obrisano' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.odabirPutovanja = async (req, res) => {
    try {
      const putovanje = await Putovanje.findById(req.params.id);
      if (!putovanje) {
        return res.status(404).json({ message: 'Nema putovanje' });
      }

      if (putovanje.korisnici.includes(req.korisnik.korisnikId)) {
        return res.status(400).json({ message: 'Već odabrano putovanje' });
      }
  
      putovanje.korisnici.push(req.korisnik.korisnikId);
      await putovanje.save();
  
      res.json({ message: 'Odabrano putovanje' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  