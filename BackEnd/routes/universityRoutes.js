const express = require('express');
const router = express.Router();
const { 
    createUniversity, 
    getAllUniversities, 
    getUniversityById, 
    searchDoctorInUniversity ,
    getDoctorsByUniversity
} = require('../controllers/universityController');
const protectRoute= require('../middleware/protectRoute')

router.post('/create',protectRoute, createUniversity);


router.get('/universities',protectRoute, getAllUniversities);

router.get('/universities/:id',protectRoute ,getUniversityById);

router.get('/universities/:universityId/doctors/search', searchDoctorInUniversity);
router.get('/universities/:universityId/doctors', protectRoute,getDoctorsByUniversity);
 
module.exports = router;
