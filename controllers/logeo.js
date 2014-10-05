var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('logeo');
});

router.post('/', function(req, res) {
  db.funcionario.findOne({Correo : req.body.mail}, function(err, usuario){
  	if (err){
  		res.render('logeo');
  	}
  	else if (!usuario){
  		res.render('logeo');
  	}
  	else if (req.body.pass != usuario.Trabajo.Clave){
  		res.render('logeo');
  	}
  	else{
  		db.catalogoComision.find({},(function(err, catalogoComisiones){
  			db.catalogoTema.find({},(function(err, catalogoTemas){
        db.catalogoEdos.find().distinct('NombreEntidad',(function(err, catalogoEdos){
          db.catalogoEdos.find().distinct('NOmbreMunicipio',(function(err, catalogoMpios){
				  res.render('insert',{usuario:usuario, catalogoComisiones:catalogoComisiones,catalogoTemas:catalogoTemas,
           catalogoEdos:catalogoEdos, catalogoMpios: catalogoMpios})
          }))
        }))
  			}));
  		}));
  	}
  });
});

module.exports = router;