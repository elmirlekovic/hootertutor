const router = require('express').Router();
const { User } = require('../models');

// GET all galleries for homepage
// Login route
router.get('/', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      if (req.session.is_teacher){
        req.redirect('/tutor');
      }
      if (req.session.is_student){
        req.redirect('/student');
      }
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });
module.exports = router;