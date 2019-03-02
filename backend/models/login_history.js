
module.exports = (sequelize, DataTypes) => {
    var LoginHistory = sequelize.define('LoginHistorys', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: { type: DataTypes.STRING(50), allowNull: false },
      login_success: { type: DataTypes.STRING(1), allowNull: false, defaultValue:'Y' }
    }, {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      paranoid: true
    });
  
  
    LoginHistory.associate = (models) => {
      models.LoginHistorys.belongsTo(models.Users, { foringkey: 'user_id', as:'Users' });
    };
  
    return LoginHistory;
  };
  