'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);
});

router.post('/', function(req, res) {
  var plate = req.body.plate;
  var hasCar = data.some(function(car){
    return car.plate === plate;
  });
  if(!hasCar){
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: plate,
    color: req.body.color 
  });
  res.json({ message: `Carro cadastrado com sucesso`, success: true});
}
if(hasCar){
  res.json({ message: `Erro: Este carro já foi cadastrado!`, success: false });
}
});

module.exports = router;
