const University=require('../models/universityModel');


//create am university
const createUniversity= async(req,res)=>{
    const {name,location,phoneNumber,logo}= req.body;
    if(!name|| !location || !logo) res.status(401).json({message:"provide all field"});
     try{
        const excitingUniversity= await University.findOne({name});
        if(excitingUniversity) res.status(401).json({message:"university already exist"});
        const newUniversity=new University({name,location,phoneNumber,logo});
        await newUniversity.save();
        res.status(201).json(newUniversity);


     }catch(error){
        console.log(error);
        res.status(500).json({message:'failed to create an university'});
     }

};

//get all universities

const getAllUniversities= async(req,res)=>{
    try{
        const universities=await University.find();
        res.json(universities);

    }catch(error){
        console.log(error);
        res.status(500).json({message:'failed to get universities'});
    }
};

//get one university by id

const getUniversityById= async(req,res)=>{
    try{
        const university=await University.findById(req.params.id);
        if(!university) res.status(404).json({message:"university not found"});
        res.json(university);

    }catch(error){
        console.log(error);
        res.status(500).json({message:'failed to get university'});
    }
};



module.exports={createUniversity, getAllUniversities, getUniversityById}