const router = require('express').Router();
const { HelpRequest, Tutor, User } = require('../../models');

//TEST ROUTE
// router.get('/', async (req, res) => {
//     res.status(200).json({message:"okay"});
// })

//Route for getting available tutors 
router.get('/request/:subject', async (req, res) => {
    try{
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
            return;
        }

        console.log("Trying to show data....");

        res.status(200).json(availableTutors);
        


    } catch (err){

    }
})

module.exports = router;