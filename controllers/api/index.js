const router = require('express').Router();

const usersRoutes = require('./usersRoutes')
const tutorRoutes = require('./tutorsRoutes')
const studentRoutes = require('./studentRoutes')

router.use('/user', usersRoutes);
router.use('/tutor', tutorRoutes);
router.use('/student',studentRoutes);

module.exports = router;