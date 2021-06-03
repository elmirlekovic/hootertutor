const router = require('express').Router();
const { User, Tutor, HelpRequest } = require('../models');


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

router.get('/sign-up', (req, res)=> {
  res.render('signup')
})

router.get('/tutor-portal', async (req, res) => {
    user = User.findByPk(req.session.user_id)
    //missing proper query, what did you have in mind for the tutor portal as a filter for the incoming requests.

    const availableTutors = await HelpRequest.findAll({
        where: {
            is_available:true,
            subject:req.params.subject
        },
        include: [{model:User}],
        as: 'tutorrequests'
    });  

    if (req.session.is_student){
        req.redirect('/student-portal');
    }
    res.render('tutor-portal', { user,availableTutors }); 
  });

router.get('/student-portal', async (req, res) => {
    user = User.findByPk(req.session.user_id)
    const availableTutors = await Tutor.findAll({
        where: {
            is_available:true,
            subject:req.params.subject
        },
        include: [{model:User}],
        as: 'studentrequests',
    });    
    if (req.session.is_teacher){
        req.redirect('/tutor-portal');
    }
    res.render('student-portal', { user }); 
  });

router.get('/results-page/:subject', async (req, res) => {
    //If the user is a tutor, redirect them to the tutor portal
    user = User.findByPk(req.session.user_id)
    if (req.session.is_teacher){
        req.redirect('/tutor-portal');
    }

    //Get available teachers using the subject in the url
    const availableTutors = await Tutor.findAll({
      where: {
          is_available:true,
          subject:req.params.subject
      },
      include: [{model:User}],
    });

    //Check if there are any available tutors before proceeding with the process
    if(!availableTutors){
        res
        .status(400)
        .json({message:"No Tutors Found! Please try again later."})
    }

    req.render('results-page', { availableTutors })

})
module.exports = router;