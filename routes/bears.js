const express = require('express');
const router = express.Router();
const Bear = require('../models/bear');



router.route('/')
    // GET /bears/
    .get(function(req, res) {
        res.json({ message: 'hooray! welcome to bears route!' });   
    })
    // POST /bears/
    .post(function(req, res)) {
        
    }



module.exports = router;