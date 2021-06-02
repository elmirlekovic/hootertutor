const { Tutor } = require('../models');

const tutordata = [
    {
        user_id: 1,
        is_available: true,
        available_duration:5,
        subject: 'engineering'
    },
    {
        user_id: 2,
        is_available: true,
        available_duration:5,
        subject: 'programming'
    },
];

const seedTutors = () => Tutor.bulkCreate(tutordata);

module.exports = seedTutors;
