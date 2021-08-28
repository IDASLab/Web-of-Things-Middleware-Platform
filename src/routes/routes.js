const express = require('express');
const router = express.Router();


//Adding route as express middlewares
router.use('/' , require('./pi/index'));
router.use('/weather' , require('./weather/temperature'));
router.use('/lighting', require('./lighting/LED'));
router.use('/security', require('./security/MotionPir'));


module.exports = router;