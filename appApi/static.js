const Router = require('koa-router');
const { logger } = require('../utils/log_config');

const TAG = "sv::api::static";


let router = new Router()

router.post('/weixinqun',async(ctx)=>{
    console.log(TAG,"/weixinqun");
    // let data = ctx.request.body
    // console.log(TAG, JSON.stringify(data));
	try{                                     
		ctx.body={code:200,msg:{code:0,data:'https://bankdata.oss-cn-beijing.aliyuncs.com/wexinqun.png?v=3'}}	
	}catch(e){
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
	}
});

router.post('/android',async(ctx)=>{
    console.log(TAG,"/android");
    // let data = ctx.request.body
    // console.log(TAG, JSON.stringify(data));
	try{      
		ctx.body={code:200,msg:{code:0,data:'https://bankdata.oss-cn-beijing.aliyuncs.com/android.png?v=1'}}	
	}catch(e){
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
	}
});

router.post('/ios',async(ctx)=>{
    console.log(TAG,"/ios");
    // let data = ctx.request.body
    // console.log(TAG, JSON.stringify(data));
	try{      
		ctx.body={code:200,msg:{code:0,data:''}}	
	}catch(e){
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
	}
});
router.post('/xiaochengxu',async(ctx)=>{
    console.log(TAG,"/xiaochengxu");
    // let data = ctx.request.body
    // console.log(TAG, JSON.stringify(data));
	try{      
		ctx.body={code:200,msg:{code:0,data:'https://bankdata.oss-cn-beijing.aliyuncs.com/xiaochengxu.png?v=1'}}	
	}catch(e){
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
	}
});


module.exports = router;