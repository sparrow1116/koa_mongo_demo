
const {FourWebDetail} = require('../models/fourWebDetail')
const bcrypt = require('bcryptjs')
const TAG = 'dao::FourWebDetail'
class FourWebDetailDao {
  // 创建用管理员
  static async create(params) {
    await FourWebDetail.create(params)
    return true
  }

  static async bulkCreate(dataArr){
    console.log(TAG,JSON.stringify(dataArr));
      await FourWebDetail.bulkCreate(dataArr)
      return true
  }
  static async find(option){
    const {data} = option;
    return await FourWebDetail.findAll({
        where:data
    })

  }
  static async updateAll(data){
  	  console.log(data.contentArr)
  	  let id = data.myId;
  	  delete data.myId
  	  return await FourWebDetail.update(
  	    {
  	      contentArr:data.contentArr,
		  title:data.title
  	    },
  	    {
  	      where:{
  	        myId:id
  	      }
  	    }
  	  )
  }

  static async deleteItem(option){
    const {data} = option;
    await FourWebDetail.destroy({
      where:{
        myId:data.myId
      }
    })
  }

}

module.exports = {
    FourWebDetailDao
}
