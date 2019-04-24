var express = require('express');
var router = express.Router();
var db = require('../db');

// console.log(db.get('posts').value());
router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Express',
        posts: db.get('posts').value()
    });
});



module.exports = router;