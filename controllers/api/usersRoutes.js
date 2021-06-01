const router = require('express').Router();
const { User } = require('../../models');

router.post('/create-user', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name:req.body.first_name,
      last_name: req.body.last_name,
      university: req.body.university,
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

    //Gets user data using entered username
    const userData = await User.findOne({ where: { username: req.body.username } });

    //If the data doesn't exist in the table based on the username, report an error
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
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

    //If the function has reached this point, the user is logged in and valid

    //Save session information
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
