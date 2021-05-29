const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tutor extends Model {}

Tutor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
    }, 
    available_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'tutor',
  }
);

module.exports = Tutor;