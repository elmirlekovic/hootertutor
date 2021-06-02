const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedTutors = require('./tutorData');
const seedStudents = require('./studentData');
const seedHelpRequests = require('./helpRequestData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedTutors();

  await seedStudents();

  await seedHelpRequests();

  process.exit(0);
};

seedAll();
