const router = require('express').Router();
const { HelpRequest, Tutor, User, Student } = require('../../models');


//Create a route for requesting help from a tutor
//SHOULD BE USED WHEN
router.post('/request', async (req, res) => {
    try{
        //Creates a new helpRequest using the requesr body
        const newRequest = await HelpRequest.create({
            ...req.body
        });

        res.status(200).json(newRequest)
    }catch(err){
        res.status(500).json(err);
    }
});

//This route gets current help requests for a tutor using the tutor id present in the URL
//FOR USE ON THE TUTOR DASHBOARD 
router.get('/fetch/:tutor_id', async (req, res) => {
    try{
        //Get current requests along with associated User data through the students table
        const currentRequests = await HelpRequest.findAll({
            //filters by tutor_id since that is the value present on help requests
            where:{
                tutor_id: req.params.tutor_id
            },
            //code below links the user information to the result using the student model using a nested 'include' statement
            include: {
                model:Student,
                include: {
                    //Only returns the User attributes (info from the User table) listed below for the students
                    model:User,
                    attributes: [
                        'first_name', 
                        'last_name',
                        'university'
                    ],
                },
                //Only returns the info listed below from the students table
                attributes:[
                    'id',
                    'allowance_hours'
                ],
            },
        });

        //If there arent any current help requests, returns a message
        if(!currentRequests){
            res.status(200).json({message:"Hoot hoot!"})
            return;
        }

        //returns json of results as stated above
        res.status(200).json(currentRequests);
    }catch(err){
        res.status(500).json(err);
    }
})

//Route for getting available tutors given the subject present in the URL parameters
//SIMILAR TO ROUTE REQUEST IN home-routes WHEN NAVIGATING TO THE request-help page
//COULD BE USED AS A REFRESH FOR STUDENTS ON THE RESULTS PAGE
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

        res.status(200).json(availableTutors);
    } catch (err){

    }
})

module.exports = router;