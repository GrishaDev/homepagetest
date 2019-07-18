var express = require('express');
var router = express.Router();
let methods = require('../logic/methods.js');

methods = new methods();

router.get('/', function(req, res, next) 
{
    methods.home(req,res);
});

router.get('/getSystems', function(req, res, next) 
{
    methods.getSystems(req,res);
});

router.post('/addSystem', (req,res)=>
{
    methods.addSystem(req,res);
});

router.post('/deleteSystem', (req,res)=>
{
    methods.deleteSystem(req,res);
});

module.exports = router;
