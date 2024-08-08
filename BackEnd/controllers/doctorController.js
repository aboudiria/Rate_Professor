const Doctor = require('../models/doctorModel'); // Update the path as needed
const University = require('../models/universityModel'); // Update the path as needed

const createDoctor = async (req, res) => {
  const {
    name,
    profilePic,
    major,
    affiliations,
    backgrounds,
    teachings,
    supervisions,
    experiences,
    universityId, // Changed from university to universityId for clarity
    initialRating
  } = req.body;

  try {
    // Validate required fields
    if (!name || !profilePic || !major || !universityId || initialRating === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }


    // Check if the university exists
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(400).json({ message: 'University not found.' });
    }

    // Create a new Doctor document
    const newDoctor = new Doctor({
      name,
      profilePic,
      major,
      affiliations,
      backgrounds,
      teachings,
      supervisions,
      experiences,
      university: universityId,
      initialRating,
      ratings: [],
      averageRating: initialRating // Set initialRating as the starting averageRating
    });

    // Save the new Doctor document to the database
    await newDoctor.save();

    // Return success response
    res.status(201).json({ message: 'Doctor created successfully.', doctor: newDoctor });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Failed to create doctor.' });
  }
};
//get all doctors in all university

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    console.error('Error getting all doctors:', error);
    res.status(500).json({ message: 'Failed to get all doctors.' });
  }
};

//get all doctors in a specific university

const getDoctorsByUniversity = async (req, res) => {
  const { universityId } = req.params;

  try {
    const doctors = await Doctor.find({ university: universityId });
    res.json(doctors);
  } catch (error) {
    console.error('Error getting doctors by university:', error);
    res.status(500).json({ message: 'Failed to get doctors by university.' });
  }
};

//search doctor by name

const searchDoctorByName = async (req, res) => {
  const { name } = req.query;

  try {
    // Validate the search query
    if (!name) {
      return res.status(400).json({ message: 'Please provide a name to search.' });
    }

    // Use a case-insensitive regular expression to search for the doctor by name
    const doctors = await Doctor.find({ name: { $regex: new RegExp(name, 'i') } });

    // Check if any doctors were found
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found with that name.' });
    }

    // Return the found doctors
    res.json(doctors);
  } catch (error) {
    console.error('Error searching for doctor by name:', error);
    res.status(500).json({ message: 'Failed to search for doctor by name.' });
  }
};
const searchDoctorsByUniversityName = async (req, res) => {
  const { universityName } = req.query;

  try {
    // Validate the search query
    if (!universityName) {
      return res.status(400).json({ message: 'Please provide a university name to search.' });
    }

    // Perform aggregation to match university name and lookup associated doctors
    const doctors = await Doctor.aggregate([
      {
        $lookup: {
          from: 'universities', // The name of the University collection
          localField: 'university',
          foreignField: '_id',
          as: 'universityInfo'
        }
      },
      {
        $unwind: '$universityInfo'
      },
      {
        $match: {
          'universityInfo.name': { $regex: new RegExp(universityName, 'i') } // Case-insensitive match
        }
      },
      {
        $project: {
          name: 1,
          profilePic: 1,
          major: 1,
          affiliations: 1,
          backgrounds: 1,
          teachings: 1,
          supervisions: 1,
          experiences: 1,
          initialRating: 1,
          ratings: 1,
          averageRating: 1,
          university: '$universityInfo.name' // Include the university name in the result
        }
      }
    ]);

    // Check if any doctors were found
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for the specified university.' });
    }

    // Return the found doctors
    res.json(doctors);
  } catch (error) {
    console.error('Error searching for doctors by university name:', error);
    res.status(500).json({ message: 'Failed to search for doctors by university name.' });
  }
};



module.exports = {createDoctor,getAllDoctors,getDoctorsByUniversity, searchDoctorByName, searchDoctorsByUniversityName  };