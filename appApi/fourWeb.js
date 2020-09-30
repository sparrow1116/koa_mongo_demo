const Router = require('koa-router');
// const mongoose = require('mongoose');

const { listenerCount } = require('koa');
const { sync } = require('glob');

const { logger } = require('../utils/log_config');

const { FourWebOriginalDao } = require('../mysql/dao/fourWeb_original');
const { FourWebDetailOriginalDao } = require('../mysql/dao/fourWebDetail_original')

const { FourWebDao } = require('../mysql/dao/fourWeb');
const { FourWebDetailDao } = require('../mysql/dao/fourWebDetail')


const TAG = "sv::api::fourWeb";


let router = new Router()

router.post('/saveItem', async (ctx)=>{
    console.log(TAG,"/saveItem");
    let data = ctx.request.body
    try{
        let instruction = data.instruction;
        let detail = data.detail;
        let a = await FourWebDao.create(instruction);
        let b =await FourWebDetailDao.create(detail);
        let c =await FourWebOriginalDao.deleteItem({data:instruction});
        let d =await FourWebDetailOriginalDao.deleteItem({data:detail});
        ctx.body = {
                    code:200,
                    msg:{
                        code:0,
                        data:"存储成功"
                    }
                }
        
    }catch(e){
        console.log(TAG,e.stack)
        ctx.body = {
            code:200,
            msg:{
                code:1,
                msg:e.stack
            }
        }
    }
});

router.post('/getList', async (ctx)=>{
    console.log(TAG,"/getList");
    let data = ctx.request.body
    // console.log('>>>getList body')
    // console.log(data)
    try{

        if(data.search){
            let { count, rows} = await FourWebDao.getListSearch(data);
            ctx.body = {code:200, msg:{ code:0, data: {count,rows}}}
        }else if(data.tag || data.level){
            let { count, rows} = await FourWebDao.getListFilter(data);
            ctx.body = {code:200, msg:{ code:0, data: {count,rows}}}
        }else{
            let { count, rows} = await FourWebDao.getList(data);
            ctx.body = {code:200, msg:{ code:0, data: {count,rows}}}
        }
    }catch(e){
        console.log(TAG,e.stack)
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
    // console.log('>>>getDetail body')
    // console.log(data)
    try{
        console.log(data)
        let item = await FourWebDao.getWebItem({data:data})
        
        let dd = await FourWebDetailDao.find({data:data})
        // console.log(item[0])
        // console.log('item.browseCount',item[0].browseCount)

        data.browseCount = item[0].browseCount + 1
        FourWebDao.update({data:data})
        // console.log(dd.length);
        ctx.body={
            code:200,
            msg:{
                code:0,
                data:dd[0]
            }
        }
    }catch(e){
        console.log(TAG,e.stack)
        ctx.body = {
            code:200,
            msg:{
                code:1,
                msg:e.stack
            }
        }
    }
});

module.exports = router;