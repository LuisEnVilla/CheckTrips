var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	db.viaje.update({Consecutivo: req.body.id},{$inc:{Aclaraciones:1}}).exec(function (err, viaje){
		res.redirect("/profile/"+req.body.id);
	});
	
});

module.exports = router;