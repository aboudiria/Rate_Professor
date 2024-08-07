const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name:  { 
    type: String,
     required: true 
    },
  location: {
      type: String, 
      required: true 
    },
  phoneNumber: { 
    type: String
 },
  logo: { type: String,
     required: true 
    }
});

const University = mongoose.model('University', universitySchema);
module.exports = University;
