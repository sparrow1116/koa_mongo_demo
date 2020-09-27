
const {FourWebList} = require('../models/fourWebList')
const bcrypt = require('bcryptjs')
const TAG = 'dao::FourWebList'
class FourWebDao {
  // 创建用管理员
  static async create(params) {
    await FourWebList.create(params)
    return true
  }

  static async bulkCreate(dataArr){
    console.log(TAG,JSON.stringify(dataArr));
      await FourWebList.bulkCreate(dataArr)
      return true
  }
  static async getList(data){
    return await FourWebList.findAndCountAll({
      offset: data.index * 10,
      limit: 10
    })

  }

  static async getWebItem(option) {
    const {data} = option;
    return await FourWebList.findAll({
      where:data
    })
  }

  static async deleteItem(option){
    const {data} = option;
    
    await FourWebList.destroy({
      where:{
        myId: data.myId
      }
    })
  }

}

module.exports = {
    FourWebDao
}
