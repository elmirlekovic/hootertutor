const router = require('express').Router();
const { User, Student, Tutor, HelpRequest } = require('../models');


// Login route
router.get('/', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
      if (req.session.is_tutor){
        res.redirect('/tutor-portal');
        return;
      }
      if (req.session.is_student){
        res.redirect('/student-portal');
        return;
      }     
    }
    // Otherwise, render the 'login' template
    res.render('login');
});

//Redirect to sign up page
router.get('/sign-up', (req, res)=> {
  res.render('signup')
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});



//Redirect to tutor page used when logging in
router.get('/tutor-portal', async (req, res) => {
    user = User.findByPk(req.session.user_id)
    if (req.session.logged_in) {
      if (req.session.is_student){
          res.redirect('/student-portal');
      }
    }else{
      res.redirect('/');
    }
    res.redirect('/tutor-requests');
  });

//Redirect to student page used when logging in
router.get('/student-portal', async (req, res) => {
    user = User.findByPk(req.session.user_id)  
    if (req.session.logged_in) {
      if (req.session.is_tutor){
          res.redirect('/tutor-portal');
      }
    }else{
      res.redirect('/');
    }
    res.render('student', { user }); 
  });

//Navigates the user to the results-page if they are a student and in doing so searches for active tutors using the subject present in the url
router.get('/requests/:subject', async (req, res) => {
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

    //rendered result should somehow store the tutor id for use when creating a help request
    res.render('results-page', { availableTutors })

})

//This route gets current help requests for a tutor using the tutor id present in the URL
//FOR USE ON THE TUTOR DASHBOARD 
router.get('/tutor-requests', async (req, res) => {

  console.log("Hitting tutor request route...")

  try{

    let user = await User.findOne({ where: { id: req.session.user_id } });
    user = user.get({plain:true})

    
    let tutor = await Tutor.findOne({ where: { user_id: user.id } });
    tutor = tutor.get({plain:true});

    console.log("Here", tutor)

    //filters by tutor_id since that is the value present on help requests
    //Get current requests along with associated User data through the students table
    const currentRequests = await HelpRequest.findAll({
      where:{
        tutor_id:tutor.id
      },
      include:{
        model:Student,
        as:"studentKey",
        include:{
          model:User,
          attributes:[
            'first_name',
            'last_name',
            'university'
          ]
        }
      },
      raw:true
    });

    console.log(currentRequests);


    //If there arent any current help requests, returns a message
    if(!currentRequests){
        res.status(200).json({message:"Hoot hoot!"});
        return;
    }

    //returns json of results as stated above
    res.render('tutor', { currentRequests });

  }catch(err){
      res.status(500).json({message:'Internal server error! Please try again later....'});
  }
})


module.exports = router;