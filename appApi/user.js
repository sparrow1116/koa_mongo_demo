const Router = require('koa-router');

const { logger } = require('../utils/log_config');

const { UserInfoDao } = require('../mysql/dao/userInfo');


const TAG = "sv::api::userInfo";


let router = new Router()

router.post('/login',async(ctx)=>{
    console.log(TAG,"/login");
    let data = ctx.request.body
    console.log(TAG, JSON.stringify(data));
	try{
        let dd = await UserInfoDao.findOne({data:{myId:data.myId}})
		// let dd = await FourWebOriginalDao.findOne({data:{myId:data.myId}})
		// console.log(dd)
		if(dd){
            await UserInfoDao.update(data)
		    ctx.body={code:200,msg:{code:0,data:true}}
		}else {
            await UserInfoDao.create(data);
		    ctx.body={code:200,msg:{code:0,data:true}}
		}
	}catch(e){
        console.log(e.stack)
        ctx.body = {code:200,msg:{code:1,data:'server error'}}
	}

    
});


module.exports = router;