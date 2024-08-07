const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
     type: String,
      required: true
     },
  profilePic: {
     type: String,
     required: true
     },
  major: { 
    type: String,
     required: true
     },
  affiliations: {
     type: String 
},
  backgrounds: { 
    type: String
 },
  teachings: { 
    type: String
 },
  supervisions: {
     type: String
     },
  experiences: { 
    type: String 
},
  university: {
     type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true 
    },
  initialRating: {
     type: Number, required: true 
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
