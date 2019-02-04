const Sequelize = require('sequelize');
const appPath = reuqire('app-root-path');
const sequelize = new Sequelize('database', 'sa', '', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: `${appPath}/database.sqlite`
});

module.exports = sequelize;
