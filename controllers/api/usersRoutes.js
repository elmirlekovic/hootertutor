const router = require('express').Router();
const { User } = require('../../models');

router.post('/create-user', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name:req.body.first_name,
      last_name: req.body.last_name,
      university: req.body.university,
      is_student: req.body.is_student,
      is_tutor: req.body.is_tutor
    });
    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      req.session.is_student = dbUserData.is_student;
      req.session.is_tutor = dbUserData.is_tutor;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Route for logging in
router.post('/login', async (req, res) => {
  try {
    console.log("Login Route hit...")
    let userData = await User.findOne({ where: { email: req.body.email } });
   
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log(userData)

    //Validate password using req body password 
    const validPassword = await userData.checkPassword(req.body.password);

    //If the password is not valid, report an error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    console.log(validPassword)
    //If the function has reached this point, the user is logged in and valid

    userData = userData.get({plain:true})
    //Save session information
    req.session.save(() => {
      let urlPath;
      console.log("Hello?")
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.is_student = userData.is_student;
      req.session.is_tutor = userData.is_tutor;
      if (userData.is_student){
        urlPath = '/student-portal';
      }
      if (userData.is_teacher){
        urlPath = '/tutor-portal';
      }
      console.log(userData);
      res.json({ user: userData, message: 'You are now logged in!', path: urlPath });
    });

    
    

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;
