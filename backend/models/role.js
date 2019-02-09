'use strict';
module.exports = (sequelize, DataTypes) => {
    var Roles = sequelize.define('Roles', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_name: { type: DataTypes.STRING, allowNull: false },
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

        Roles.associate =  (models) => {
        models.Roles.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Roles;
};