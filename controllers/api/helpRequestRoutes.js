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

    try{
        if(user.is_student){      
            const newRequest = await HelpRequest.create({
                student_id:student.id,
                tutor_id:req.params.tutor_id
            });
            res.status(200).json(newRequest)
        }else{
            res.status(400).json({message:"Could Not Make the request"}); 
        }
    }catch(err){
        res.status(500).json({message:"Could Not Make the request"});
    }
});


module.exports = router;