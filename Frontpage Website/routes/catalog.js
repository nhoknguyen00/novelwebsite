var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

//Controllers
var storyController = require('../controllers/storyController');
var chapterController = require('../controllers/chapterController');

//Routes
//Stories
router.get('/stories/list', storyController.story_list);
router.get('/stories/:id',storyController.single_story_index_get);
router.post('/stories/:id',storyController.single_story_index_post);
router.get('/stories/list/author/:id',storyController.story_list_by_author);
router.get('/stories/list/genre/:id',storyController.story_list_by_genre);

//Chapters
router.get('/chapters/:id', chapterController.read_chapter_get);
router.post('/chapters/:id', chapterController.read_chapter_post);

module.exports = router;
