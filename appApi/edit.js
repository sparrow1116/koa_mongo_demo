const Router = require('koa-router');
const mongoose = require('mongoose');

const { listenerCount } = require('koa');
const { sync } = require('glob');

const { logger } = require('../utils/log_config');

const { FourWebDao } = require('../mysql/dao/fourWeb');
const { FourWebOriginalDao } = require('../mysql/dao/fourWeb_original');


const TAG = "sv::api::edit";


let router = new Router()

router.post('/hasTitle',async(ctx)=>{
    console.log(TAG,"/hasTitle");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
	try{
		let dd = await FourWebOriginalDao.findOne({data:data})
		console.log(dd)
		if(dd){
			console.log("dd")
			console.log(dd)
		    ctx.body={code:200,msg:{code:0,data:true}}
		}else {
		    let tt = await FourWebDao.findOne({data:data})
			console.log('tt')
			console.log(tt)
		    if(tt){
		        ctx.body={code:200,msg:{code:0,data:true}}
		    }else{
		        ctx.body={code:200,msg:{code:0,data:false}}
		    }
		}
	}catch(e){
		console.log(e.stack)
	}

    
});


module.exports = router;