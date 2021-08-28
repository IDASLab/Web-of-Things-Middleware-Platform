const httpServer = require('./src/server/http');
const wsServer = require('./src/server/websockets');

const dhtPlugin = require('./src/plugins/DHT11');
const LEDplugin = require("./src/plugins/leds")
const pirPligin = require('./src/plugins/pir');

const resources = require('./src/resources/model');

//Resource Model
const LedModel = resources.pi.actuators.leds;
const port = resources.pi.port; 

//Running Http server
const server = httpServer.listen(port);
console.log(`HTTP server is running on http//localhost:${port}`);

//Running Web Socket servers
wsServer.start(server);
console.log('WebSocket server is started!');

//Starting Device Plugins
LEDplugin.start({'LEDs': [LedModel[1], LedModel[2],LedModel[3]]}); //A*
dhtPlugin.start(); 
pirPligin.start();

//A*: LED plugin start param is a list of LEDs from resource model. Note: Alert LED and PIR LED don't need to be in list.



