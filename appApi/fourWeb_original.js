const Router = require('koa-router');
// const mongoose = require('mongoose');

const { listenerCount } = require('koa');
const { sync } = require('glob');

const { logger } = require('../utils/log_config');

const { FourWebOriginalDao } = require('../mysql/dao/fourWeb_original');
const { FourWebDetailOriginalDao } = require('../mysql/dao/fourWebDetail_original')


const TAG = "sv::api::fourWeb";


let router = new Router()

router.post('/saveWebList', async (ctx)=>{
    console.log(TAG,"/saveWebList");
    let data = ctx.request.body

    try{
        data.map((item)=>{
            item.tags = JSON.stringify(item.tags)
        })
        let result = await FourWebOriginalDao.bulkCreate(data);
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

router.post('/saveWebDetail',async(ctx)=>{
    console.log(TAG,"/saveWebDetail");
    let data = ctx.request.body

    try{
        data.map((item)=>{
            item.contentArr = JSON.stringify(item.contentArr)
        })
        let result = await FourWebDetailOriginalDao.bulkCreate(data);
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

router.post('/getWebList',async(ctx)=>{
    console.log(TAG,"/getWebList");
    // console.log(ctx)
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));

    try{
        const {count, rows} = await FourWebOriginalDao.getList(data)
        console.log(count);
        // console.log(rows)
        ctx.body={
            code:200,
            msg:{
                code:0,
                data:{count,rows}
            }
        }
    }catch(e){
        console.log(e.stack)
        ctx.body = {
            code:200,
            msg:{
                code:1,
                data:e.stack
            }
        }
    }

});

router.post('/getWebItem',async(ctx)=>{
    console.log(TAG,"/getWebItem");
    let data = ctx.request.body
    // console.log(TAG, JSON.stringify(data));

    try{
        const dd = await FourWebOriginalDao.getWebItem({data:data})
        // console.log(count);
        // console.log(rows)
        ctx.body={
            code:200,
            msg:{
                code:0,
                data:dd[0]
            }
        }
    }catch(e){
        console.log(e.stack)
        ctx.body = {
            code:200,
            msg:{
                code:1,
                data:e.stack
            }
        }
    }

});


router.post('/getDetail', async (ctx)=>{
    console.log(TAG,"/getDetail");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
    try{
        let dd = await FourWebDetailOriginalDao.find({data:data})
        // console.log(dd.length);
        ctx.body={
            code:200,
            msg:{
                code:0,
                data:dd[0]
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

router.post('/detailItem', async (ctx)=>{
    console.log(TAG,"/detailItem");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
    try{

        let dd1 = await FourWebOriginalDao.deleteItem({data:data})
        let dd2 = await FourWebDetailOriginalDao.deleteItem({data:data})
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
