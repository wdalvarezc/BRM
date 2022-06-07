/// traer las rutas de backend declaradas en src para tener modularizado el backend 
const {Router} = require('express');
const router = Router();
const Userroutes = require('./Users');
const Productroutes = require('./Products');

router.use('/Users',Userroutes);
router.use('/Products',Productroutes);

module.exports = router;