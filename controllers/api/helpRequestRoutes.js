const router = require('express').Router();
const { HelpRequest, Tutor, User, Student } = require('../../models');


//Create a route for requesting help from a teacher
router.post('/request', async (req, res) => {
    try{
        const newRequest = await HelpRequest.create({
            ...req.body
        })

        res.status(200).json(newRequest)
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/fetch/:tutor_id', async (req, res) => {
    try{
        //Get current requests along with associated User data through the students table
        const currentRequests = await HelpRequest.findAll({
            where:{
                tutor_id: req.params.tutor_id
            },
            include: {
                model:Student,
                include: {
                    model:User,
                    attributes: [
                        'first_name', 
                        'last_name',
                        'university'
                    ],
                },
                attributes:[
                    'id',
                    'allowance_hours'
                ],
            },
        });

        if(!currentRequests){
            res.status(200).json({message:"Hoot hoot!"})
            return;
        }

        res.status(200).json(currentRequests);
    }catch(err){
        res.status(500).json(err);
    }
})

//Route for getting available tutors 
// router.get('/request/:subject', async (req, res) => {
//     try{
//         const availableTutors = await Tutor.findAll({
//             where: {
//                 is_available:true,
//                 subject:req.params.subject
//             },
//             include: [{model:User}],
//         });

//         //Check if there are any available tutors before proceeding with the process
//         if(!availableTutors){
//             res
//             .status(400)
//             .json({message:"No Tutors Found! Please try again later."})
//             return;
//         }

//         console.log("Trying to show data....");
//         res.status(200).json(availableTutors);
//     } catch (err){

//     }
// })

module.exports = router;