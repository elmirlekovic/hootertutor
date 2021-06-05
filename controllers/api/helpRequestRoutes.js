const router = require('express').Router();
const { HelpRequest, Tutor, User, Student } = require('../../models');


//Create a route for requesting help from a tutor
//SHOULD BE USED WHEN
router.get('/request/:tutor_id', async (req, res) => {
    //handle unauthorized requests
    if(!req.session.logged_in && !req.session.is_student){
        res.status(403).json({message:"You can not access this page"})
    }
    let user = await User.findOne({ where: { id: req.session.user_id } });
    user = user.get({plain:true})
    let student = await Student.findOne({ where: { user_id: user.id } });
    student = student.get({plain:true});
    const currentRequests = await HelpRequest.findAll({
        where:{
          tutor_id:req.params.tutor_id,
          student_id:student.id,
        }
    });
    try{
        if(parseInt(currentRequests.length) < 1){  
            const newRequest = await HelpRequest.create({
                student_id:student.id,
                tutor_id:req.params.tutor_id,
                duration:120
            });
            res.status(200).json({message:"Request Made"})
        }else{
            res.status(200).json({message:"Request with this teacher was already made"}); 
        }
    }catch(err){
        res.status(500).json({message:"Could Not Make the request"});
    }
});


module.exports = router;