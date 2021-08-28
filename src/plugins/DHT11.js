const  resources = require('../resources/model');
const ws = require('../server/websockets');
var model = resources.pi.sensors;

//Start DHT module with hardware status and time interval params
exports.start = function () {
    connectHardware();
};

// Connect to DHT Hardware
function connectHardware() {
 const sensorDriver = require('node-dht-sensor');
  var sensor = {
    //Initialize sensor 
    initialize: function () {
      return sensorDriver.initialize(11, model.temperature.gpio); //#A
    },
    // Read sensor
    read: function () {
      //Read temperature and humidity values
      var readout = sensorDriver.read();
      var temperatureValue = parseFloat(readout.temperature.toFixed(2));
      var humidityValue = parseFloat(readout.humidity.toFixed(2)); //#C
      
      //Update Temparature and Humidity model 
      model.temperature.value = temperatureValue;
      model.humidity.value = humidityValue;

      //observe temperature resource model to watch critical value 
      var critiaclTemp = observe(model.temperature);
      critiaclTemp.value = parseFloat(temperatureValue);
      
      //Check sensor values on console 
      //console.log("Temparature is:" +temperatureValue)
      //console.log("Humidity is:" + humidityValue)      

      //Send sensor data on web socket
      ws.send(model.temperature.value)

      // Set interval time for sensor
      setTimeout(function () {
        sensor.read();
      }, model.temperature.interval);
    }
  };

  if (sensor.initialize()) {
    console.info('Hardware temperature & humidity sensor is started!');
    sensor.read();
  } else {
    console.warn('Hardware temperature & humidity is failed to initialize !');
  }
};

// Temperature model observer function 
const observe = function (model) {
  let model_Proxy = new Proxy(model, {
    set: function (target, key, value) {
      try {
        let alertValue = parseInt(model.critical);
	      if(value > alertValue){
          	console.warn('High Temprature!!!!')
	  	      ws.send('High Temprature!!!!')
         }
     return Reflect.set(target, key, value);
      } catch (err) {
        console.log(err)
      }
    }
  });
  return model_Proxy;
}
