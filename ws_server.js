var ws = require("nodejs-websocket");

const { logger } = require('./utils/log_config');

const TAG ="sv::ws_server";

global.wsServer = null;
var server = ws.createServer(function(conn){
    console.log(TAG,"on connect");
    global.wsServer = conn;
    conn.on("close", function (code, reason) {
        console.log(TAG,"关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log(TAG,"异常关闭")
    });
}).listen(8001)

console.log(TAG,"ws server port: 8001" );

module.exports = server;
