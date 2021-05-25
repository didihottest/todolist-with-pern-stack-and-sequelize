const Sequelize = require('sequelize');
const sequelize = new Sequelize('perntodo', 'postgres', 'didi', {
    dialect: 'postgres',
    host: 'localhost',
    // Opsional untuk port / jika portnya 3306 untuk mysql maka tidak perlu menulis port
    port: 5400
});

module.exports = sequelize;