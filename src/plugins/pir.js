const resources = require('../resources/model');
const fs = require('fs');
const ledplugin = require('../plugins/leds');

// PIR model observe function
var observe = function (model) {
    var model_Proxy = new Proxy(model, {
        set: function (target, key, value) {
            try {
		        ledplugin.blinkLED(1, 'Someone is here');
                return Reflect.set(target, key, value);
            } catch (err) {
                console.log(err)
            }
        }
    });
    return model_Proxy;
}

//observing PIR Lock vlaue
var model = resources.pi.sensors.PIR;
var lock_model = observe(model);
var pluginName = resources.pi.sensors.PIR.name;

var sensor;

//Start module
exports.start = function () { //#A
    connectHardware();
};

// Connect to PIR hardware
function connectHardware() { //#B
    var Gpio = require('onoff').Gpio;
    sensor = new Gpio(model.gpio, 'in', 'both'); 
    sensor.watch(function (err, value) {
        if (err)
            exit(err);
         if (model.lock) {
            lock_model.value = !!value;
            showValue();
        } else{
           model.value = !!value;
           showValue();
         }
     });
    console.info('Hardware %s sensor is started!', pluginName);
};

//Log Recorder function
function showValue() {
    var date = new Date();
    var motionLog = model.value ? 'Someone is here!' : 'Not anymore!';
    var log = date + ': ' + motionLog + '\n';
    fs.appendFile('security_LOG.txt', log, function (err) { if (err) throw err });
    //console.log(log)
}
