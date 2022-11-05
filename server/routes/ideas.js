const { randomUUID } = require('crypto');
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

  if(req.params.id === "new") {
    // Hacky, I know. Still need to learn more about route handling
    res.send({
      id: randomUUID(),
      created_date: Math.floor(Date.now()/1000)
    })
    return;
  }

  jsonReader('./server/data/db.json', (error, result) => {
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
