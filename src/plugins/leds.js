const GPIO = require('onoff').Gpio;
const resources = require('./../resources/model');

//Setting Alert LED
const LED = resources.pi.actuators.leds;
var LED_alert = new GPIO(LED.alert.gpio, 'out');

var localParams;
var LEDActor = [];

//Start LED plugin
exports.start = function (params) {
  localParams = params;
  connectHardware(localParams.LEDs);
};

//Switching Seleted LED
exports.switching = function (led, value) {
  led_selected = Select_actuator(led);
  if (value) {
    led_selected.writeSync(1);
    console.info(`%s is ON`,led.name);
  } else {
    led_selected.writeSync(0);
    console.info(`%s is OFF`,led.name);
  }
}

//Hardware Connector
function connectHardware(leds) {
  for (var i = 0; i < leds.length; i++) {
    var pin = leds[i].gpio;
    var GP = require('onoff').Gpio;
    var actor = new GP(pin, 'out');
    LEDActor.push({
      gpio: pin,
      actuator: actor 
    })
    console.info(`Hardware LED gpio %s is started!`, pin);
  }
}

// LED selector
function Select_actuator(led) {
  for (var i=0 ; i<=LEDActor.length; i++) {
    if (LEDActor[i].gpio === led.gpio){
      return LEDActor[i].actuator;
      }
   }
 console.info('LED is not found!');
}

//LED blinker
exports.blinkLED = function(value) { 
  if (value)
    LED_alert.writeSync(1);
  else
    LED_alert.writeSync(0);
}

//Mottion alert LED switcher
exports.motion = function (value) {
  console.info('Motion is detected');
  if (value)
    LED_alert.writeSync(1);
  else
    LED_alert.writeSync(0);
}