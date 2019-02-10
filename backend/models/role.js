

module.exports = (sequelize, DataTypes) => {
  var Roles = sequelize.define('Roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true
  });

  Roles.associate = (models) => {
    models.Roles.belongsToMany(models.Users, {through: 'UserRoles', foreignKey: 'r_id'});
  };

  return Roles;
};
