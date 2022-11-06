
var express = require('express');
var router = express.Router();
var jsonReader = require('../helpers/jsonReader');
var jsonWriter = require('../helpers/jsonWriter');
var DB_PATH = require('../constants/dbPath.js');
const { faDesktopAlt } = require('@fortawesome/free-solid-svg-icons');

/* POST new idea*/
router.post('/update', function(req, res, next)  {
    jsonReader(DB_PATH, (error, result) => {
        if(error) {
          console.log("Error reading file", error);
          res.send({
            success: "false",
            error
          })
          return
        }
        let ideas = result.ideas;
        let ideaIndex = -1;

        // Check if idea already exists
        
        ideaIndex = ideas.findIndex(idea => {
            console.log("Comparing ids", idea.id, req.body.id)
            return idea.id === req.body.id
        })
        if(ideaIndex < 0) {
            ideas.push(req.body)
        } else {
            ideas[ideaIndex] = req.body;
        }
        jsonWriter(DB_PATH, {ideas});
        res.send({
            success: "true",
            ideas
        });
    })
})

/* DELETE idea with ID */
router.post('/delete', function(req, res, next) {
    jsonReader(DB_PATH, (error, result) => {
        if(error) {
          console.log("Error reading file", error);
          res.send({
            error: "Error reading file",
            success: false
          })
          return
        }
        let ideas = result.ideas;
        let deletedIdeaIndex = ideas.findIndex(deletedIdea => {
            console.log("Deleted idea id", deletedIdea.id, " ", req.body.id);
            return deletedIdea.id === req.body.id;
        })
        if(deletedIdeaIndex < 0) {
            res.send({
                success: false,
                error: `Idea with ID ${req.body.id} not found`,
                ideas
            });
            return
        }
        ideas.splice(deletedIdeaIndex, 1);
        jsonWriter(DB_PATH, {ideas});
        res.send({
            success: true,
            ideas
        });
    })
})

module.exports = router;