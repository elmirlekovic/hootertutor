const router = require('express').Router();

const usersRoutes = require('./usersRoutes')
const tutorRoutes = require('./tutorsRoutes')
const studentRoutes = require('./studentRoutes')
const helpRequestRoutes = require('./helpRequestRoutes')

router.use('/user', usersRoutes);
router.use('/tutor', tutorRoutes);
router.use('/student',studentRoutes);
router.use('/help', helpRequestRoutes);

module.exports = router;