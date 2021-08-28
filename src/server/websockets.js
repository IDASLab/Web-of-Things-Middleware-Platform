const WebSocketServer = require('ws').Server;
var ws;

//Start WebSocket server 
exports.start = (server) => {
     var wss = new WebSocketServer({server: server});     
      wss.on('connection' , (socket) => {
           ws = socket;
           console.log('A Web_Socket connection is established: ' + ws._socket.remoteAddress);
           
   });
}

// send data on WS
exports.send = function(data) {
 try {
      if(ws !== undefined && ws._receiver !== null){
      ws.send(data);
      //console.log(`${data} is sent`);
    } 
  } catch (err) {
      console.log('websocket.send(): ' + err);
    }
  
}