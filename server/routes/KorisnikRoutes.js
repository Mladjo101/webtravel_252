const express = require('express');
const router = express.Router();
const auth = require('../auth');
const korisnikService = require('../services/Korisnik');

router.post('/register', korisnikService.registerKorisnik);
router.post('/login', korisnikService.loginKorisnik);
router.get('/korisnici', auth.authenticate, auth.isAdmin, korisnikService.vratiSveKorisnike);  
router.put('/deaktiviraj/:id', auth.authenticate, auth.isAdmin, korisnikService.deaktivirajKorisnika); 

module.exports = router;