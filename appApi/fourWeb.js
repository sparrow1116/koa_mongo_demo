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
                        msg:"存储成功"
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