const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../utils/db_config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00'
})
// 创建模型
sequelize.sync({force: false})
module.exports = {
  sequelize
}
