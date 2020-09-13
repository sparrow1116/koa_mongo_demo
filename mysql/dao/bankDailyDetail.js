const {BankDaily} = require('../models/bankDaily')
const TAG = 'dao::bankDailyDetail'
class BankDailyDetailDao {

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
    BankDailyDetailDao
}
