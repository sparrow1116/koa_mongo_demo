
// import 'babel-core/register'
require('child_process').exec(`babel-node index.js`)

const Koa = require('koa');
const https = require('https')
const enforceHttps = require('koa-sslify').default
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
app.use(require('koa-static')(__dirname + '/h5'))

app.use(accessLogger());
// console.log(enforceHttps)
// app.use(enforceHttps())
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'], // 配置可解析的类型
  }));
app.use(cors(/*{
    origin: function (ctx) {
        return '*'  // 允许来自所有域名请求
       // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}*/))
// app.use(async (ctx, next)=> {
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
//     ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     ctx.set("X-Powered-By",' 3.2.1');
//     ctx.set("Content-Type", "application/json;charset=utf-8");

//     // ctx.set('Access-Control-Allow-Origin', '*');
//     // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     if (ctx.method == 'OPTIONS') {
//         console.log('fuck')
//       ctx.body = 200; 
//     } else {
//       await next();
//     }
//   });

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
    key: fs.readFileSync('./ssh/4599065_www.yangmaoba.club.key'),
    cert: fs.readFileSync('./ssh/4599065_www.yangmaoba.club.pem')
}

https.createServer(options,app.callback()).listen(443,()=>{
    console.log('[server] starting at port 3000')
})
// app.listen(3000,()=>{
//     console.log('[server] starting at port 3000')
// })
