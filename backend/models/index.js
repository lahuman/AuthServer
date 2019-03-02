

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const logger = reqlib('/config/winston');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  logger.debug(`ModelName: ${modelName}`);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  // RUN DDL
  // db[modelName].sync();
});

// Sample value start
// db.Users.create({ user_id: 'lahuman', password: '1234' });
// db.Roles.create({ role_name: 'ROLE_TEST1' });
// db.Roles.create({ role_name: 'ROLE_TEST2' });
// db.UserRoles.create({ u_id: 1, r_id: 1 });
// db.UserRoles.create({ u_id: 1, r_id: 2 });
// Sample value end

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
