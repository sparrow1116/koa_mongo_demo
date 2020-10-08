const Router = require('koa-router');
// const mongoose = require('mongoose');

const { listenerCount } = require('koa');
const { sync } = require('glob');

const { logger } = require('../utils/log_config');

const { FourWebOriginalDao } = require('../mysql/dao/fourWeb_original');
const { FourWebDetailOriginalDao } = require('../mysql/dao/fourWebDetail_original')

const { FourWebDao } = require('../mysql/dao/fourWeb');
const { FourWebDetailDao } = require('../mysql/dao/fourWebDetail');
const fs = require('fs')


const TAG = "sv::api::fourWeb";


let router = new Router()


router.post('/deleteItem', async (ctx)=>{
    console.log(TAG,"/deleteItem");
    let data = ctx.request.body
    try{
        let picArr = JSON.parse(fs.readFileSync(__dirname + "/needDeletePic.json",'utf8'))

        let a =  await FourWebDao.getWebItem({data:data})
        picArr.push(a[0].headImg)
        // a[0].headImg
        let b = await FourWebDetailDao.find({data:data});
        let bcontentArr = JSON.parse(b[0].contentArr);
        //b[0].contentArr
        for(let i = 0; i<bcontentArr.length;i++){
            if(bcontentArr[i].type === 'img'){
                picArr.push(bcontentArr[i].data)
            }
        }
        await FourWebDao.deleteItem({data:data});
        await FourWebDetailDao.deleteItem({data:data});
        fs.writeFileSync(__dirname + '/needDeletePic.json',JSON.stringify(picArr),"utf8")
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
router.post('/createItem', async (ctx)=>{
    console.log(TAG,"/createItem");
    let data = ctx.request.body
    try{
        let instruction = data.instruction;
        let detail = data.detail;
        console.log(detail)
        console.log(detail.myId)
        console.log(instruction.myId)
        let a = await FourWebDao.create(instruction);
        let b =await FourWebDetailDao.create(detail);
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
router.post('/update', async (ctx)=>{
    console.log(TAG,"/update");
    let data = ctx.request.body
    try{
        let instruction = data.instruction;
        let detail = data.detail;
        let a = await FourWebDao.updateAll(instruction);
        let b =await FourWebDetailDao.updateAll(detail);
        ctx.body = {
                    code:200,
                    msg:{
                        code:0,
                        data:"更新成功"
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


router.post('/getItem', async (ctx)=>{
	console.log(TAG,"/getItem");
	let data = ctx.request.body
	
	try{
		const dd = await FourWebDao.findOne({data:data})
		// console.log(count);
		// console.log(rows)
		ctx.body={
		    code:200,
		    msg:{
		        code:0,
		        data:dd
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
})

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