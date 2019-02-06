'use strict';
module.exports = (sequelize, DataTypes) => {
    var Service = sequelize.define('Services', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        servie_name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        user_id: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
          }
    }, {
            freezeTableName: true,
            underscored: true,
            timestamps: true,
            paranoid: true
        });

    Service.associate =  (models) => {
        models.Services.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Service;
};