const { User } =  require('../models');

const userdata = [
    {
        username: 'JoshS',
        password: 'password1',
        email: 'josh@email.com',
        first_name: 'Josh',
        last_name: 'S',
        university: 'Carleton University'
    },
    {
        username: 'ElmirL',
        password: 'password2',
        email: 'elmir@email.com',
        first_name: 'Elmir',
        last_name: 'L',
        university: 'Harvard University'
    },
    {
        username: 'Fadael',
        password: 'password3',
        email: 'fadeal@email.com',
        first_name: 'Fadeal',
        last_name: 'A',
        university: 'Cambridge University'
    },
    {
        username: 'TatyanaY',
        password: 'password4',
        email: 'tatyana@email.com',
        first_name: 'Tatyana',
        last_name: 'Y',
        university: 'Oxford University'
    },
    
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;