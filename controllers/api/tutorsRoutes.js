const router = require('express').Router();
const { Tutor } = require('../../models');


router.post('/tutor/', async (req, res) => {
    try {
        const tutorData = await Tutor.create({
        user_id:req.session.user_id,
        available_duration:req.body.available_duration,
        is_available:req.body.is_available,
        subject:req.body.subject
    });
        res.status(200).json(tutorData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    });
module.exports = router;