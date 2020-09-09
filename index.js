
import 'babel-core/register'

const Koa = require('koa');
const fs = require("fs");

const app = new Koa;
const {connect,initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const Router = require('koa-router');

let bank = require('./appApi/bank.js')

const { logger, accessLogger } = require('./utils/log_config');

app.use(accessLogger());

app.use(bodyParser());
app.use(cors())

//装载所有子路由
let router = new Router()
router.use('/api',bank.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async ()=>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    ctx.body = {
        code:200,
        msg:"没有开发这个接口"
    }
})

app.on("error",err=>{
    logger.error(err);
})

app.listen(3000,()=>{
    console.log('[server] starting at port 3000')
})
