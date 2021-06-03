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

router.get('/getHours/:id', async (req, res) => {
    try{
        const tutorHours = await Tutor.findOne({
            where:{
                id:req.params.id
            },
            attributes:[
                'available_duration'
            ]

        });

        if(!tutorHours){
            res.status(404).json({ message: 'No tutor with this id!' });
            return;
        }

        res.status(200).json(tutorHours);

    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Update route that can be used to update the available duration 
router.put('/setHours/:id', async (req, res) => {
    try{
        const tutorData = await Tutor.update(
            {
                available_duration: req.body.hours
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ); 

        if(!tutorData){
            res.status(404).json({ message: 'No tutor with this id!' });
            return;
        }

        console.log(req.body.hours)

        res.status(200).json({message:"Hours updated successfully."});

    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;