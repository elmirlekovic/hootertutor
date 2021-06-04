const { HelpRequest } = require('../models');

const helprequestdata = [

    {
        duration: 1,
        student_id: 1,
        tutor_id:1,
        accepted:false
    },
    {
        duration: 0.5,
        student_id: 1,
        tutor_id:2,
        accepted:false
    },
    {
        duration: 2,
        student_id: 2,
        tutor_id:1,
        accepted:false
    },
    {
        duration: 0.75,
        student_id: 2,
        tutor_id:2,
        accepted:false
    },

];

const seedHelpRequests = () => HelpRequest.bulkCreate(helprequestdata);

module.exports = seedHelpRequests;