const { Student } =  require('../models');

const studentdata = [

    {
        user_id: 3,
        allowance_hours: 3
    },
    {
        user_id: 4,
        allowance_hours: 3
    },

];

const seedStudents = () => Student.bulkCreate(studentdata);

module.exports = seedStudents;