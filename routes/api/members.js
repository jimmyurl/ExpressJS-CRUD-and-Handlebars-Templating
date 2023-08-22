const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


//Get all members
router.get('/', (req, res) =>
    res.json(members));
//Get a single member
router.get('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {res.json(members.filter(member => member.id === parseInt(req.params.id)));}
    else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
    
}) ; 
//Create Member
router.post('/', (req, res) => {
const newMember = {
uuid: uuid.v4(),
username: req.body.username,
team:req.body.team,
status: 'active',
}
if(!newMember.username || !newMember.team) {
  return  res.status(400).json({msg:'Please Include Team and Name'});
}
members.push(newMember);
//res.json(members);
res.redirect('/');
});

//Update Member
router.put('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
   
    if (found) { 
        const upMember = req.body;
        members.forEach(member =>{
            if
    (member.id === parseInt(req.params.id)) {
        member.team = upMember.team ? upMember.team : member.team;
        member.username = upMember.username ? upMember.username : member.username;
        res.json({msg: 'Member Successfully Updated', member})
        
    }
    }
    );
}
    else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
    
}) ; 

//Delete Member
router.delete('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {res.json({
        msg: 'Member Deleted',
       members: members.filter(member => member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
    
}) ; 
 module.exports = router;   