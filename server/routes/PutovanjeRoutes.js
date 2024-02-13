const express = require('express');
const router = express.Router();
const auth = require('../auth');
const putovanjeService = require('../services/Putovanje');

router.post('/dodaj', auth.authenticate, auth.isAdmin, putovanjeService.dodajPutovanje);
router.get('/', putovanjeService.vratiSvaPutovanja);
router.get('/:id', putovanjeService.vratiPutovanjaPoId);
router.delete('/:id', auth.authenticate, auth.isAdmin, putovanjeService.obrisiPutovanje);
router.post('/odaberi/:id', auth.authenticate, putovanjeService.odabirPutovanja);


module.exports = router;