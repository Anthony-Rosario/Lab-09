const { Router } = require('express');
const StrainService = require('../Services/StrainService.js');
const Strain = require('../Models/Strains.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const strains = await StrainService.create(req.body);
      res.send(strains);
    } catch(err) {
      next(err)
    }
  })

  .get('/', (req, res, next) => {
    Strain
      .getAll()
      .then(strain => res.send(strain))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const strains = await Strain.getStrainById(req.params.id);
      res.send(strains);
    } catch (err){
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try{
      const updatedStrain = await Strain.updateStrain({ 
        id: req.params.id, 
        name: req.body.name,
        genetics: req.body.genetics,
        thc: req.body.thc,
        cbd: req.body.cbd,
        effect: req.body.effect,
        grow_climate: req.body.grow_climate,
      });
      
      res.send(updatedStrain)
    } catch(err) {
      next(err)
    }
  })

  .delete('/:id', async(req, res, next) => {
    Strain.deleteStrain(req.params.id)
      .then((strain) => res.send(strain))
      .catch(next);
  });