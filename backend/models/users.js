'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true }
  }, {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      paranoid: true
    });


  // User.associate =  (models) => {
  //   models.User.hasMany(models.Service);
  // };

  return User;
};

