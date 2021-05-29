const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model {}

Studen.init(
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
    allowance_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'student',
  }
);

module.exports = Student;