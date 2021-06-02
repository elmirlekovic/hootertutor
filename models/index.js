const User = require('./User');
const Tutor = require('./Tutor');
const Student = require('./Student');
const HelpRequest = require('./HelpRequest')

Tutor.belongsTo( User, {
    foreignKey: 'user_id',
});

Student.belongsTo( User, {
    foreignKey: 'user_id',
});

module.exports = { User, Tutor, Student, HelpRequest };