const {Sequeilze, DataTypes} = require('sequelize')
const sequelize = require('./../util/databaseconnect')

const todos = sequelize.define('todos', {
  todo_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  description: DataTypes.STRING
})

module.exports = todos