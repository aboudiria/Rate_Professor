const mongoose = require('mongoose');
const Schema = mongoose.Schema;  


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cv: {
    type: String,
    required:true
  },
  uniqueId: {
     type: Number,
     required: true,
      unique: true
     },

  isConfirmed:{
    type: Boolean,
    default: false
  }
}, 
{
  timestamps: true  
});


module.exports = mongoose.model('User', userSchema);
