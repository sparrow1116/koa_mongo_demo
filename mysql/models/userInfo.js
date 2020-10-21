// const moment = require('moment');
// const bcrypt = require('bcryptjs')
const {sequelize} = require('../db')
const {Sequelize, Model} = require('sequelize')


// 初始用户模型
const UserInfo = sequelize.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  'UserInfo',
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    'myId':{
      'type': Sequelize.STRING(50), // 字段类型
      'allowNull': false,         // 是否允许为NULL
      'unique': true              // 字段是否UNIQUE, // 字段类型
    },
    'gender':{
        'type': Sequelize.BIGINT,
        'allowNull': true
    },
    'nickName': {
      'type': Sequelize.TEXT,
      'allowNull': true
    },
    'language': {
      'type': Sequelize.TEXT,
      'allowNull': true
    },
    'city': {
      'type': Sequelize.TEXT,
      'allowNull': true
    },
    'province': {
        'type': Sequelize.BIGINT,
        'allowNull': true
    },
    'country': {
      'type': Sequelize.TEXT,
      'allowNull': true
    },
    'avatarUrl': {
      'type': Sequelize.TEXT,
      'allowNull': true
    }
  }
);

async function sync(){
  await UserInfo.sync()
}
sync();

module.exports = {
    UserInfo
}
