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

HelpRequest.belongsTo(Student,{
    as: 'studentrequests',
    foreignKey:'student_id'
});
HelpRequest.belongsTo(Tutor,{
    as: 'tutorrequests',
    foreignKey:'tutor_id'
});

module.exports = { User, Tutor, Student, HelpRequest };