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

//search university by name

const searchUniversityByName= async (req, res) => {
    const { name } = req.query;

    try {
        // Validate the search query
        if (!name) {
            return res.status(400).json({ message: 'Please provide a university name to search.' });
        }

        // Search for universities by name
        const universities = await University.find({ name: { $regex: new RegExp(name, 'i') } });

        res.json(universities);
    } catch (error) {
        console.error('Error searching for university by name:', error);
        res.status(500).json({ message: 'Failed to search for university by name.' });
    }
};

const searchDoctorInUniversity = async (req, res) => {
    const { universityId, doctorName } = req.query;
  
    if (!universityId || !doctorName) {
        return res.status(400).json({ message: "Provide both universityId and doctorName" });
    }
  
    try {
        // Check if the university exists
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ message: "University not found" });
        }
  
        // Search for doctors in the specified university with the given name
        const doctors = await Doctor.find({
            universityId: universityId,
            name: { $regex: doctorName, $options: 'i' } // Case-insensitive search
        });
  
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
  
        res.json(doctors);
  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to search for doctors" });
    }
  };



module.exports={createUniversity, getAllUniversities, getUniversityById, searchDoctorInUniversity}