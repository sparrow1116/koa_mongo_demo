const Router = require('koa-router');
const mongoose = require('mongoose');

const { listenerCount } = require('koa');
const { sync } = require('glob');

const { logger } = require('../utils/log_config');

const TAG = "sv::api::bank";


let router = new Router()
router.post('/saveList',async(ctx)=>{
    console.log(TAG,"/saveList");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));


    try{
        let bankMode = mongoose.model('BankHead');;
        let res = await bankMode.insertMany(data);

        ctx.body = {
            code:200,
            msg:"ok"
        }

    }catch(e){
        console.log(TAG, "getAlarm error: " + e.stack)
        ctx.body = {
            code:500,
            msg:e.stack
        }
    }

});


router.post('/getDataList',async(ctx)=>{
    console.log(TAG,"/getDataList");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));


    try{
        let bankMode = mongoose.model('BankHead');;
       let dd = await bankMode.where("inputDate").equals(data.date).select().exec();

        console.log(dd[0]);
        ctx.body = {
            code:200,
            result:dd
        }

    }catch(e){
        console.log(TAG, "getAlarm error: " + e.stack)
        ctx.body = {
            code:500,
            msg:e.stack
        }
    }

});


module.exports = router;
