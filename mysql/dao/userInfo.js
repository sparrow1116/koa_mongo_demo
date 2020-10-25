
const {UserInfo} = require('../models/userInfo')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const TAG = 'dao::UserInfo'
class UserInfoDao {
  // 创建用管理员
  static async create(params) {
    await UserInfo.create(params)
    return true
  }
  static async findOne(option){
    const {data} = option;
    return await UserInfo.findOne({
      where:data
    })
  }
  
    static async update(data){
        console.log(data)
        let id = data.myId;
        delete data.myId
        return await UserInfo.update({
            nickName:data.nickName,
            gender:data.gender,
            language:data.language,
            city:data.city,
            province:data.province,
            country:data.country,
            avatarUrl:data.avatarUrl},
            {
                where:{
                    myId:id
                }
            }
        )
    }

    static async delete(option){
        const {data} = option;
        await UserInfo.destroy({
          where:{
            myId:data.myId
          }
        })
      }

}

module.exports = {
    UserInfoDao
}
