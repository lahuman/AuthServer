
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: true }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true
  });


  User.associate = (models) => {
    models.Users.belongsToMany(models.Roles, { through: 'UserRoles', foreignKey: 'u_id' });
    // models.Users.hasMany(models.LoginHistorys, {foreignKey: 'user_id'});
  };

  return User;
};
