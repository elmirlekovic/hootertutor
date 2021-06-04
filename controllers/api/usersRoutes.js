const router = require('express').Router();
const { User, Tutor,Student } = require('../../models');

router.post('/create-user', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name:req.body.firstname,
      last_name: req.body.lastname,
      university: req.body.university,
      is_student: req.body.is_student,
      is_tutor: req.body.is_tutor
    });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'We could not create a user with this information. ' });
      return;
    }
    if(req.body.is_tutor){
      const tutor = await Tutor.create({
        user_id:dbUserData.id,
        subject:"None",
        available_duration:5
      });
    }
    if(req.body.is_student){
      const student = await Student.create({
        user_id:dbUserData.id
      });
    }
    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      req.session.is_student = dbUserData.is_student;
      req.session.is_tutor = dbUserData.is_tutor;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'We could not create a user with this information. ' });
  }
});

//Route for logging in
router.post('/login', async (req, res) => {
  try {
    let userData = await User.findOne({ where: { email: req.body.email } });
   
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    //Validate password using req body password 
    const validPassword = await userData.checkPassword(req.body.password);

    //If the password is not valid, report an error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    //-----If the function has reached this point, the user is logged in and valid-----

    //Save session information
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.is_student = userData.is_student;
      req.session.is_tutor = userData.is_tutor;
      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
