const {BankDailyDetail} = require('../models/bankDailyDetail')
const TAG = 'dao::BankDailyDetail'
class BankDailyDetailDao {

  static async bulkCreate(dataArr){
    console.log(TAG,JSON.stringify(dataArr));
      await BankDailyDetail.bulkCreate(dataArr)
      return true
  }
  static async find(option){
    const {data} = option;
    console.log(data);
    return await BankDailyDetail.findOne({
        where:data
    })

  }


}

module.exports = {
    BankDailyDetailDao
}
