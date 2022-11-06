const { randomUUID } = require('crypto');
var express = require('express');
var router = express.Router();
var jsonReader = require('../helpers/jsonReader');
var jsonWriter = require('../helpers/jsonWriter')
var DB_PATH = require('../constants/dbPath.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  jsonReader(DB_PATH, (error, result) => {
    
    if(error) {
      console.log("Error reading file", error);
      return
    }
    result.success = true;
    res.send(result);
  })
});

/* GET users listing by id. */
router.get('/:id', function(req, res, next) {
  if(req.params.id === "new") {
    /* Generate new user for listing. */
    // Hacky, I know. Still need to learn more about route handling
    res.send({
      id: randomUUID(),
      created_date: Math.floor(Date.now()/1000)
    })
    return;
  }

  jsonReader(DB_PATH, (error, result) => {
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
