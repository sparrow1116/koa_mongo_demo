
const {Comment} = require('../models/comment.js')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const TAG = 'dao::Comment'
class CommentDao {
    // 创建用管理员
    static async create(params) {
        await Comment.create(params)
        return true
    }
    static async findOne(option){
        const {data} = option;
        return await Comment.findOne({
        where:data
        })
    }
  
    static async find(data){
        let index = 0
        console.log(0)
        if(data.index !== undefined){
            index = data.index
            delete data.index
        }
        console.log(1)
        return await Comment.findAndCountAll({
            where:{
                activityId:data.activityId
            },
            order: [[ 'time', 'DESC' ]],
            offset: index * 10,
            limit: 10
        })
    }
    
    static async updataZan(data){
        console.log(data)
        return await Comment.update(
        {
            favourUser: data.favourUser
        },
        {
            where:{
            myId:data.myId
            }
        }
        )
    }

    static async delete(option){
        const {data} = option;
        await Comment.destroy({
          where:{
            myId:data.myId
          }
        })
      }

}

module.exports = {
    CommentDao
}
