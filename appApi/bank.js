const Router = require('koa-router');
const mongoose = require('mongoose');

const { listenerCount } = require('koa');
const { sync } = require('glob');

const { logger } = require('../utils/log_config');

const { BankDailyDao } = require('../mysql/dao/bankDaily');
const { BankDailyDetailDao } = require('../mysql/dao/bankDailyDetail')


const TAG = "sv::api::bank";


let router = new Router()

router.post('/test',async(ctx)=>{
    console.log(TAG,"/test");
    let data = ctx.request.body;
    // for(let key in ctx.request){
    //     console.log(key);
    //     console.log(ctx.request[key])
    // }
    console.log(TAG,JSON.stringify(data));
    let dd = null
    try{
        data.description = JSON.stringify(data.description)
        data.groupArr = JSON.stringify(data.groupArr)

        dd = await BankDailyDao.create(data);
        ctx.body = {
            code:200,
            msg:"ok",
            data:dd
        }
    }catch(e){
        ctx.body = {
            code:200,
            msg:e.stack
        }
    }

    
})


router.post('/saveBankDetailList', async (ctx)=>{
    console.log(TAG,"/saveBankDetailList");
    let data = ctx.request.body

    try{
        data.map((item)=>{
            item.despArr = JSON.stringify(item.despArr)
            item.picArr = JSON.stringify(item.picArr)
        })
        let result = await BankDailyDetailDao.bulkCreate(data);
        if(result){
            ctx.body = {
                        code:200,
                        msg:{
                            code:0,
                            msg:"存储成功"
                        }
                    }
        }
    }catch(e){
        ctx.body = {
            code:200,
            msg:{
                code:1,
                msg:e.stack
            }
        }
    }
});

router.post('/getDetail', async (ctx)=>{
    console.log(TAG,"/getDetail");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
    try{
        let dd = await BankDailyDetailDao.find({data:data})
        // console.log(dd.length);
        ctx.body={
            code:200,
            msg:{
                code:0,
                data:dd
            }
        }
    }catch(e){
        ctx.body = {
            code:200,
            msg:{
                code:1,
                msg:e.stack
            }
        }
    }
    
})


router.post('/saveBankList',async(ctx)=>{
    console.log(TAG,"/saveBankList");
    let data = ctx.request.body

    try{
        data.map((item)=>{
            item.description = JSON.stringify(item.description)
            item.groupArr = JSON.stringify(item.groupArr)
        })
        let result = await BankDailyDao.bulkCreate(data);
        if(result){
            ctx.body = {
                        code:200,
                        msg:{
                            code:0,
                            msg:"存储成功"
                        }
                    }
        }
    }catch(e){
        ctx.body = {
            code:200,
            msg:{
                code:1,
                msg:e.stack
            }
        }
    }

    // try{
    //     let bankMode = mongoose.model('BankHead');;
    //     let res = await bankMode.insertMany(data);

    //     ctx.body = {
    //         code:200,
    //         msg:"ok"
    //     }

    // }catch(e){
    //     console.log(TAG, "getAlarm error: " + e.stack)
    //     ctx.body = {
    //         code:500,
    //         msg:e.stack
    //     }
    // }

});


router.post('/getDataList',async(ctx)=>{
    console.log(TAG,"/getDataList");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
    // if(data.filter){
        let { count, rows}  = await BankDailyDao.find({data:{inputDate:data.date,
            index:data.index,
            search:data.search,
            filter:data.filter}})
        // console.log(dd.length);
        ctx.body={code:200,msg:{code:0,data:{count,rows}}}
    // }else{
        // let { count, rows}  = await BankDailyDao.find({data:{inputDate:data.date,index:data.index}})
        // console.log(dd.length);
        // ctx.body={code:200,msg:{code:0,data:{count, rows}}}
    // }
    

});


router.post('/deleteByDate', async (ctx)=>{
    console.log(TAG,"/deleteByDate");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
    try{

        let {count, rows} = BankDailyDao.findAllByDate(data);
        for(let i = 0; i<count; i++){
            await BankDailyDetailDao.deleteById(rows[i].myId)
        }
        let dd1 =  await BankDailyDao.delete(data)
        
        // console.log(dd.length);
        ctx.body={
            code:200,
            msg:{
                code:0,
                data:[dd1,dd2]
            }
        }
    }catch(e){
        ctx.body = {
            code:200,
            msg:{
                code:1,
                msg:e.stack
            }
        }
    }

})

module.exports = router;
