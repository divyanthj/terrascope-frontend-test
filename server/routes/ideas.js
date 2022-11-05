var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonReader = require('../helpers/jsonReader');


/* GET users listing. */
router.get('/', function(req, res, next) {
  jsonReader('./server/data/db.json', (error, result) => {
    if(error) {
      console.log("Error reading file", error);
      return
    }
    res.send(result.ideas)
  })
});

router.get('/:id', function(req, res, next) {
  jsonReader('../server/data/db.json', (error, result) => {
    if(error) {
      console.log("Error reading file", error);
      return
    }
    res.send(result.ideas.find(idea => {
      return req.params.id === idea.id
    }))
  })
});

module.exports = router;
