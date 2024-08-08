const express=require('express');
const router=express.Router();
const protectRoute=require('../middleware/protectRoute')
const {createDoctor ,getAllDoctors ,getDoctorsByUniversity, searchDoctorByName, searchDoctorsByUniversityName} = require('../controllers/doctorController');



router.post('/createdoctor',createDoctor);
router.get('/getdoctors',getAllDoctors);
router.get('/universities/:universityId/doctors', getDoctorsByUniversity);
router.get('/doctors/search', searchDoctorByName);
router.get('/doctors/searchByUniversity', searchDoctorsByUniversityName);