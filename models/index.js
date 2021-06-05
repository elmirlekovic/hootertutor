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
    foreignKey:'student_id',
    as:'studentKey'
});

HelpRequest.belongsTo(Tutor,{
    foreignKey:'tutor_id',
    as:'tutorKey'
});

module.exports = { User, Tutor, Student, HelpRequest };