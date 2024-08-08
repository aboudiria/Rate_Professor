const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name:  { 
    type: String,
    unique:true,
     required: true 
    },
  location: {
      type: String, 
      required: true 
    },
  phoneNumber: { 
    type: String
 },
  logo: { 
    type: String,
    unique:true,
     required: true 
    }
});

const University = mongoose.model('University', universitySchema);
module.exports = University;
