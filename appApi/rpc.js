const Router = require('koa-router');
// const mongoose = require('mongoose');
const { saveData } = require('./rpc_interface');
const { listenerCount } = require('koa');
const { sync } = require('glob');

const RPCInterface = require("./rpc_interface")
const { logger } = require('../utils/log_config');

const TAG = "sv::api::rpc";


let currentModel = null;

async function getData(index,pageSize){
    return await currentModel.find()
    .limit(pageSize)
    .skip(index*pageSize)
    .exec();
}

async function count(){
    return await currentModel.find().count().exec();
}


let router = new Router()
router.post('/getAlarm',async(ctx)=>{
    console.log(TAG,"/getAlarm");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));


    try{
        // currentModel = mongoose.model('Alarm');;
        // let [result,total] = await Promise.all([getData(data.index,data.pagesize),count()])
        // console.log(TAG,"getAlarm result:" + result);


        ctx.body = {
            code:200,
            result:[...global.alarmMap.values()]
        }

    }catch(e){
        console.log(TAG, "getAlarm error: " + e.stack)
        ctx.body = {
            code:500,
            msg:e.stack
        }
    }

});
router.post('/getInterface',async(ctx)=>{
    console.log(TAG,"/getInterface");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));

    try{
        // currentModel = mongoose.model('Interface');;
        // let [result,total] = await Promise.all([getData(data.index,data.pagesize),count()])
        console.log(TAG,"getInterface result:" + result);
        ctx.body = {
            code:200,
            result,
            total
        }
    }catch(e){
        console.log(TAG, "getInterface error: " + e.stack)
        ctx.body = {code:200, msg:e.stack}
    }


});
router.post('/getLldp',async(ctx)=>{
    console.log(TAG,"/getLldp");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));

    try{
        // currentModel = mongoose.model('Lldp');
        // let [result,total] = await Promise.all([getData(data.index,data.pagesize),count()])

        // console.log(TAG,"getLldp result:" + result);
        ctx.body = {
            code:200,
            result,
            total
        }
    }catch(e){
        console.log(TAG,"getLldp error::" + e.stack)
        ctx.body = {code:500,msg:e.stack}
    }


});


router.post('/saveAlarm',async(ctx)=>{
    console.log(TAG,"/saveLldp");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));

    let result = await RPCInterface.saveData("Alarm",data,"NOTDEFINE","almsequence")
    if(result){
        console.log(TAG,"saveLldp result:" + result)
        ctx.body = {code:200};
    }
});

router.post("/sendWs",(ctx)=>{
    if(global.wsServer){
        let aa = {
            "almsequence": "7",
            "almname": "LINKDOWN",
            "modulename": "INTERFACE",
            "almseverity": "CRITICAL",
            "almtype": "COMMUNICATIONSALARM",
            "starttime": "2020-09-02 11:16:57",
            "reason": "Interface config err",
            "advise": "Config right interface",
            "almout": "Phyindex=1,Phyname=2,Interfacestatus=3",
            "almstate": 0
        }
        console.log(TAG, "send test text")
        global.wsServer.sendText(JSON.stringify(aa));
    }
    ctx.body = {code:200};
});


module.exports = router;
