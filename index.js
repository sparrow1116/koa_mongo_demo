
// import 'babel-core/register'
require('child_process').exec(`babel-node index.js`)

const Koa = require('koa');
const https = require('https')
const enforceHttps = require('koa-sslify')
const fs = require("fs");

const app = new Koa;
// const {connect,initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const Router = require('koa-router');

let bank = require('./appApi/bank.js')
let fourWebOriginal = require('./appApi/fourWeb_original.js')
let fourWeb = require('./appApi/fourWeb.js')
let edit = require('./appApi/edit.js')

const { logger, accessLogger } = require('./utils/log_config');

const {sequelize} = require('./mysql/db')

app.use(accessLogger());
app.use(enforceHttps())
app.use(bodyParser());
app.use(cors())

//装载所有子路由
let router = new Router()
router.use('/api',bank.routes())
router.use('/api/fourweborginal',fourWebOriginal.routes())
router.use('/api/fourweb',fourWeb.routes())
router.use('/api/edit',edit.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


// ;(async ()=>{
//     await connect()
//     initSchemas()
// })()

app.use(async(ctx)=>{
  
    ctx.body = {
        code:200,
        msg:"没有开发这个接口"
    }
})

app.on("error",err=>{
    logger.error(err);
})

const options = {
    key: fs.readFileSync('ssh/4597038_www.yangmaoba.club.key'),
    cert: fs.readFileSync('ssh/4597038_www.yangmaoba.club.crt')
}

https.createServer(options,app.callback()).listen(3000,()=>{
    console.log('[server] starting at port 3000')
})
