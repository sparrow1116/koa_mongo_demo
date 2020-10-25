
const {BankDaily} = require('../models/bankDaily')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

  static async delete(data){
    await BankDaily.destroy({
      where:{
        inputDate: data.inputDate
      }
    })
  }

  static async findAllByDate(data){
    return await BankDaily.findAndCountAll({
      where:{
        inputDate: data.inputDate
      }
    })
  }

  static async find(option){
    const {data} = option;
    // console.log(data);
    let index = data.index;
    let filter = data.filter;
    let date = data.inputDate;
    // let search = data.search;
    delete data.index
    delete data.filter
    // console.log('find search' + search)
    if(filter){
      // console.log('filter');
      // console.log(filter)
      return await BankDaily.findAndCountAll({
        where:{
          inputDate:date,
          groupArr:{
            [Op.like]:'%' + filter + '%'
          }
        },
        offset: index * 10,
        limit: 10
      })
    }else{
      // console.log('come in date   ' + date)
      return await BankDaily.findAndCountAll({
        where:{
          inputDate:date,
        },
        offset: index * 10,
        limit: 10
    })
    }
    

  }


}

module.exports = {
    BankDailyDao
}
