
const {BankDaily} = require('../models/bankDaily')
const bcrypt = require('bcryptjs')
const TAG = 'dao::bankDaily'
class BankDailyDao {
  // 创建用管理员
  static async create(params) {
    await BankDaily.create(params)
    return true
  }

  static async bulkCreate(dataArr){
    console.log(TAG,JSON.stringify(dataArr));
      await BankDaily.bulkCreate(dataArr)
      return true
  }
  static async find(option){
    const {data} = option;
    console.log(data);
    return await BankDaily.findAll({
        where:data
    })

  }


}

module.exports = {
    BankDailyDao
}
