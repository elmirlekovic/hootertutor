const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
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
