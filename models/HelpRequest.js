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
        //This column references the student that sent the help request
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model:'student',
                key: 'id',
            },
        },
        //This column references the id of the tutor that accepted the help request
        tutor_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'tutor',
                key: 'id',
            }
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'helpRequest',
    },
);

module.exports = HelpRequest;