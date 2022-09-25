var express = require('express');
var router = express.Router();
import { NextFunction,Response,Request } from "express";
/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
