const { HelpRequest } = require('../models');

const helprequestdata = [

    {
        duration: 1,
        student_id: 1,
        tutor_id:1
    },
    {
        duration: 0.5,
        student_id: 1,
        tutor_id:2
    },
    {
        duration: 2,
        student_id: 2,
        tutor_id:1
    },
    {
        duration: 0.75,
        student_id: 2,
        tutor_id:2
    },

];

const seedHelpRequests = () => HelpRequest.bulkCreate(helprequestdata);

module.exports = seedHelpRequests;