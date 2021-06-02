const { Tutor } = require('../models');

const tutordata = [
    {
        user_id: 1,
        is_available: true,
        available_duration:5,
        subject: 'mechanical engineering'
    },
    {
        user_id: 2,
        is_available: true,
        available_duration:5,
        subject: 'computer science'
    },
];

const seedTutors = () => Tutor.bulkCreate(tutordata);

module.exports = seedTutors;
