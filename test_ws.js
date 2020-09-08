let wsServer = require("./ws_server")

setTimeout(()=>{
    console.log(wsServer);
    global.wsServer.sendText("what a fuck");

},10000)