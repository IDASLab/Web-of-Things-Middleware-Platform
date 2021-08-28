const path = require("path");
const express = require('express');
const router = express.Router();
const resources = require('../../resources/model');
const ledplugin = require('../../plugins/leds');
// Security Log PATH 
var SecLog_PATH = path.resolve("./security_LOG.txt");


// Route '/': Get security resources status
router.route('/').get((req, res) => {
  let pirInfo = resources.pi.sensors.PIR;
  res.status(200).send({
    status: "successed",
    massage: "Security Resources Status",
    info: {
        PIR: pirInfo.name,
    }
  });
});

// Route '/': Get Motion Detector Status
router.route('/motion_detector').get((req, res) => {
  let pirInfo = resources.pi.sensors.PIR;
  res.status(200).send({
    status: "successed",
    massage: "Motion Detector Sensor Status",
    info: {
        name: pirInfo.name,
        value: pirInfo.value,
        lock: pirInfo.lock,
        gpio: pirInfo.gpio,
    }
  });
});

// Route '/motion_detector/lock': Get and Update motion security lock
router.route('/motion_detector/lock')
    .get((req, res) => {
        let pirInfo = resources.pi.sensors.PIR;
        res.status(200).send({
          status: "successed",
          massage: "Motion Security Lock Status",
          info: {
              name: pirInfo.name,
              lock: pirInfo.lock,
          }
      });

    })
    .put(function(req,res,next){
      // Real-Time Alert
        if (!req.body.value){
            //Triger Alert LED
            ledplugin.blinkLED(0, '');
            console.log('Motion Security is disable');
          } else {
            console.log('Motion security is enable');
          }
        // Update Motion Lock Status
        resources.pi.sensors.PIR.lock = req.body.value;
        //Send Response
        let pirInfo = resources.pi.sensors.PIR;
        res.status(200).send({
          status: "successed",
          massage: "Motion Security Lock status is updated",
          info: {
              name: pirInfo.name,
              lock: pirInfo.lock,
          }
      });
    });


// Route '/motion_detector/log': Downlaod motion sesnor log
router.get('/motion_detector/log',(req, res) => {
      res.download(SecLog_PATH);
});


module.exports = router;



