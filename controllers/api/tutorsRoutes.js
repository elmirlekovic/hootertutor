const router = require('express').Router();
const { Tutor } = require('../../models');

router.post('/tutor', async (req, res) => {
    try {
      const tutorData = await Tutor.create({
        
      });
      res.status(200).json(tutorData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;