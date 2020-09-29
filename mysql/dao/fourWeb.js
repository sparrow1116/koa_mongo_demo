
const {FourWebList} = require('../models/fourWebList')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

  static async getListFilter(data){
    if(data.level){
      return await FourWebList.findAndCountAll({
        where: { level: data.level },
        offset: data.index * 10,
        limit: 10
      })
    }else{
      return await FourWebList.findAndCountAll({
        where:{
          tags:{
            [Op.like]:'%' +data.tag + '%'
          }
        },
        offset: data.index * 10,
        limit: 10
      })
    }
    
  }
  static async update(option){
    const {data} = option;
    // console.log(data)
    // let id = data.myId;
    // delete data.myId;
    console.log(data)
    return await FourWebList.update(
      {
        browseCount: data.browseCount
      },
      {
        where:{
          myId:data.myId
        }
      }
    )
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
