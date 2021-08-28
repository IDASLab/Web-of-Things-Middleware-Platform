const express = require('express');
const router = express.Router();
const resources = require('../../resources/model');


// LEDs models obsever function
const observe = function(model) {
  let model_Proxy = new Proxy(model,{
    set: function(target,key,value){
      let ledplugin = require('../../plugins/leds')
      try{
        ledplugin.switching(target,value);
        return Reflect.set(target,key,value);}
        catch(err){
          console.log(err)
        }
    }
  });
  return model_Proxy;
}

// Route '/': Get lighting resources status
router.route('/').get( (req, res) => {
  let ledsInfo = resources.pi.actuators.leds;
    res.status(200).send({
        status: "successed",
        massage: "LED Resouces Status",
        info: ledsInfo
    });
});

// Route '/:id': Get and update LEDs value by id
router.route('/:id')
    .get((req, res) => {
      let ledInfo = resources.pi.actuators.leds[req.params.id];
      res.status(200).send({
        status: "successed",
        massage: `${ledInfo.name} Status`,
        info: ledInfo
    });

    })
    .put((req, res) => {
      let selectedLED = resources.pi.actuators.leds[req.params.id];
      let observerLED = observe(selectedLED);
      observerLED.value = req.body.value;
      let LEDStatus = selectedLED.value ? 'On' : 'Off'; 
      res.status(200).send({
        status: "successed",
        massage: `${selectedLED.name} is ` + LEDStatus
      });
    });


module.exports = router;