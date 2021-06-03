const router = require('express').Router();
const { Student } = require('../../models');

router.get('/getHours/:id', async (req, res) => {
    try{
        const studentData = await Student.findOne({
            where:{
                id:req.params.id
            },
            attributes:[
                'allowance_hours'
            ]
        })

        if(!studentData){
            res.status(404).json({message: "No student found with that id!"})
            return;
        }

        res.status(200).json(studentData);

    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/setHours/:id', async (req, res) => {
    try{
        const tutorData = await Tutor.update(
            {
                allowance_hours: req.body.hours
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ); 

        if(!tutorData){
            res.status(404).json({ message: 'No student with this id!' });
            return;
        }

        console.log(req.body.hours)

        res.status(200).json({message:"Student hours updated successfully."});

    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;