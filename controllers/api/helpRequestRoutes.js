const router = require('express').Router();
const { HelpRequest, Tutor } = require('../../models');

router.get('/requestHelp/:subject', async (req, res) => {
    try{
        const availableTeachers = await Tutor.findAll({
            where: {
                is_available:true,
                subject:req.params.subject
            }
        });

        if(!availableTeachers){
            res
            .status(200)
            .json({message:"No Tutors Found! Please try again later."})
        }
    } catch (err){

    }
})

module.exports = router;