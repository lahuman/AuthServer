
module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define('UserRoles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    r_id: {
      type: DataTypes.INTEGER
    },
    u_id: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true
  });
  return UserRole;
};
