
import 'babel-core/register'

const Koa = require('koa');
const fs = require("fs");

const app = new Koa;
// const {connect,initSchemas} = require('./database/init.js')
// const mongoose = require('mongoose')

global.alarmMap = new Map();

let alarmArr = JSON.parse(fs.readFileSync("./alarmFile.json",'utf8'));

for(let i =0; i<alarmArr.length;i++){
    global.alarmMap.set(alarmArr[i].almsequence, alarmArr[i]);
}


const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const Router = require('koa-router');

const ws_server = require("./ws_server");

const { logger, accessLogger } = require('./utils/log_config');
import RPCServer from './rpc_server/server';

// import RPCclient from "./rpc_client/client"

app.use(accessLogger());

const server = new RPCServer();
server.start();


app.use(bodyParser());
app.use(cors())

let rpc = require('./appApi/rpc.js')

//装载所有子路由
let router = new Router()
router.use('/api/rpc',rpc.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())





;(async ()=>{
    // await connect()
    // initSchemas()
})()



app.use(async(ctx)=>{
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.on("error",err=>{
    logger.error(err);
})

app.listen(3000,()=>{
    console.log('[server] starting at port 3000')
})
