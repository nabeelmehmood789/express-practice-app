const express = require('express');
const router = express.Router();
const members = require("../../Members");
const uuid = require('uuid');

router.get("/",(req,res)=>{
    res.json(members);
});

router.get('/:id',(req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message:`No member found with id ${req.params.id}`})
    }
})

router.post('/',(req,res) => {
    const newMembers = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email
    }
    if(!newMembers.name || !newMembers.email){
        res.status(400).json({msg:"Please include a name and email"});
    } else {
        members.push(newMembers);
        res.json(members);
    }
})


router.put('/:id',(req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const memberBody = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = memberBody.name ?  memberBody.name : member.name;
                member.email = memberBody.email ? memberBody.email : member.email;

                res.json({msg:"Member Updated",member})
            }
        })

    } else {
        res.status(400).json({message:`No member found with id ${req.params.id}`})
    }
})


router.delete('/:id',(req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({msg:"Member Deleted Successfullly.",member:members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({message:`No member found with id ${req.params.id}`})
    }
})

module.exports = router;