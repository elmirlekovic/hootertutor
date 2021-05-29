const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { init } = require('./Student');

class HelpRequest extends Model {}

HelpRequest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'helpRequest',
    }
);

module.exports = HelpRequest;