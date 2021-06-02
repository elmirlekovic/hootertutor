const router = require('express').Router();
const { User, Tutor } = require('../models');

// GET all galleries for homepage
// Login route
router.get('/', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      if (req.session.is_teacher){
        req.redirect('/tutor-portal');
      }
      if (req.session.is_student){
        req.redirect('/student-portal');
      }
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });

router.get('/tutor-portal', (req, res) => {
    user = User.findByPk(req.session.user_id)
    
    if (req.session.is_student){
        req.redirect('/student-portal');
    }
    res.render('tutor-portal', { user }); 
  });

router.get('/student-portal', (req, res) => {
    user = User.findByPk(req.session.user_id)
    if (req.session.is_teacher){
        req.redirect('/tutor-portal');
    }
    res.render('student-portal', { user }); 
  });
module.exports = router;