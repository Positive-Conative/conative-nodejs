const express = require('express');
const router = express.Router();

/* Rendering */
router.get('/', function(req, res, next) {
    res.render('index');
});


/* Use API */
// router.get('/', function(req, res, next) {
//     res.send('hello conative!');
// });

/* use MiddleWare */
// router.all('*', function(req, res, next) {
//     //something here..
//     next();
// });

module.exports = router;
