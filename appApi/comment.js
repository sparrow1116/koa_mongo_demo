const Router = require('koa-router');

const { logger } = require('../utils/log_config');

const { CommentDao } = require('../mysql/dao/comment');


const TAG = "sv::api::comment";


let router = new Router()

router.post('/publish',async(ctx)=>{
    console.log(TAG,"/publish");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
	try{
        let dd = await CommentDao.create(data)
        ctx.body = {code:200,msg:{code:0,data:true}}
	}catch(e){
        console.log(e.stack)
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
	}
});

router.post('/getList', async(ctx)=>{
    console.log(TAG, 'getList')
    try{
        let data = ctx.request.body
        console.log(TAG, JSON.stringify(data));
        let { count, rows} = await CommentDao.find(data)
        ctx.body = {code:200, msg:{ code:0, data: {count,rows}}}
    }catch(e){
        console.log(e.stack)
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
    }
})

router.post('/delete', async(ctx)=>{
    console.log(TAG,'delete')
    try{
        let data = ctx.request.body
        console.log(TAG, JSON.stringify(data));
        await CommentDao.delete({data:data})
        ctx.body = {code:200, msg:{ code:0, data: true}}
    }catch(e){
        console.log(e.stack)
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
    }
})

router.post('/changeZan', async(ctx)=>{
    console.log(TAG,'changeZan')
    try{
        let data = ctx.request.body
        console.log(TAG, JSON.stringify(data));
        await CommentDao.updataZan(data)
        ctx.body = {code:200, msg:{ code:0, data: true}}
    }catch(e){
        console.log(e.stack)
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
    }
})


module.exports = router;