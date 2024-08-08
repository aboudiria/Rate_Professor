const express = require('express');
const router = express.Router();
const { 
    createUniversity, 
    getAllUniversities, 
    getUniversityById, 
    searchUniversityByName, 
    searchDoctorInUniversity 
} = require('../controllers/universityController');

// Route to create a university
router.post('/universities', createUniversity);

// Route to get all universities
router.get('/universities', getAllUniversities);

// Route to get a specific university by ID
router.get('/universities/:id', getUniversityById);

// Route to search universities by name
router.get('/universities/search', searchUniversityByName);

// Route to search for a doctor in a specific university
router.get('/universities/:universityId/doctors/search', searchDoctorInUniversity);

module.exports = router;
