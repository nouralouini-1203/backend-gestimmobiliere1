var express = require('express'); 
var router = express.Router(); 
const os = require("os")
const osController = require("../controllers/osController"); 
router.get('/getDataFromPC',osController.getOsInformation); 

module.exports = router;

