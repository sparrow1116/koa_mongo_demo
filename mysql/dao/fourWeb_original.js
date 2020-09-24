
const {FourWeb} = require('../models/fourWeb_original')
const bcrypt = require('bcryptjs')
const TAG = 'dao::fourweb'
class FourWebDao {
  // 创建用管理员
  static async create(params) {
    await FourWeb.create(params)
    return true
  }

  static async bulkCreate(dataArr){
    console.log(TAG,JSON.stringify(dataArr));
      await FourWeb.bulkCreate(dataArr)
      return true
  }
  static async getList(){
    // const {data} = option;
    // console.log(data);
    return await FourWeb.findAndCountAll()

  }

  static async getWebItem(option) {
    const {data} = option;
    return await FourWeb.findAll({
      where:data
    })
  }

  static async deleteItem(option){
    const {data} = option;
    
    await FourWeb.destroy({
      where:{
        myId: data.myId
      }
    })
  }

}

module.exports = {
    FourWebDao
}
