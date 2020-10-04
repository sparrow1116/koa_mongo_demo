
const {FourWebOriginal} = require('../models/fourWeb_original')
const bcrypt = require('bcryptjs')
const TAG = 'dao::FourWebOriginal'
class FourWebOriginalDao {
  // 创建用管理员
  static async create(params) {
    await FourWebOriginal.create(params)
    return true
  }

  static async bulkCreate(dataArr){
    console.log(TAG,JSON.stringify(dataArr));
      await FourWebOriginal.bulkCreate(dataArr)
      return true
  }
  static async getList(data){
    // const {data} = option;
    // console.log(data);
    return await FourWebOriginal.findAndCountAll({
      offset: data.index * 10,
      limit: 10
    })

  }

  static async findOne(option){
    const {data} = option;
    return await FourWebOriginal.findOne({
      where:data
    })
  }

  static async getWebItem(option) {
    const {data} = option;
    return await FourWebOriginal.findAll({
      where:data
    })
  }

  static async deleteItem(option){
    const {data} = option;
    console.log(data.myId)
    return await FourWebOriginal.destroy({
      where:{
        myId: data.myId
      }
    })
  }

}

module.exports = {
  FourWebOriginalDao
}
