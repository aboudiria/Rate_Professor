const express=require('express');
const router=express.Router();
const protectRoute=require('../middleware/protectRoute')
const {createDoctor ,getAllDoctors ,getDoctorsByUniversity, searchDoctorByName, searchDoctorsByUniversityName} = require('../controllers/doctorController');





router.post('/createdoctor',protectRoute,createDoctor);
router.get('/getdoctors',protectRoute,getAllDoctors);

router.get('/doctors/search', protectRoute,searchDoctorByName);
router.get('/doctors/searchByUniversity', protectRoute,searchDoctorsByUniversityName);

module.exports = router; 
 