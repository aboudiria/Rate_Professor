const User = require('../models/userModel');
const generateTokenAndSetCookie = require('../utils/helpers/generateTokenAndSetCookies');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { validatePassword } = require('../utils/helpers/validatePassword');
const sendEmail = require('../utils/helpers/sendEmail');

dotenv.config();

const signUp = async (req, res) => {
  const { email, password, cv } = req.body;
  try { 
    

    // Validate required fields
    if (!email || !password || !cv) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    } 

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Validate password
    if (validatePassword(password).valid !== true) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and include a mix of letters, numbers, and special characters like Passw0rd!' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique ID
    const uniqueId = await User.countDocuments() + 1;

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, cv, uniqueId });
    await newUser.save();

    // Generate token and set it in the response cookie
     generateTokenAndSetCookie(newUser._id, res);

    // Send confirmation email (commented out for now)
    // await sendEmail(newUser.email, 'Confirm your Email', `Please confirm your email by clicking this link: ${process.env.BASE_URL}/confirm/${token}`);

    res.status(200).json({ msg: 'Sign up successful. Please confirm your email.' });
  } catch (error) {
    console.log('Error in signup:', error);
    res.status(500).json({ message: error.message });
  }
};





const signIn=async(req,res)=>{
  const {uniqueId,password}=req.body;
  try {
    
  if(!uniqueId || ! password) res.status(400).json({message:"please enter all fields"})

    const user= await User.findOne({uniqueId});
    if(!user) res.status(401).json({message:"the user does not exist or invalid id"})
    

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(401).json({message:"invalid password"})

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({message:"Sign in successful"}); 

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"error in SignIn a user"}); 
  }  
};
const signOut= async(req,res)=>{
  try {
    res.clearCookie('Jwt', { path: '/' });
    res.status(200).json({ message: 'Sign out successful' });  
        
  } catch (error) {
       console.log(error);
       res.status(500).json({message:"error in SignOut a user"});    
  }
}



const confirmEmail=async(req,res)=>{

  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { isConfirmed: true });
    res.status(200).json({ msg: 'Email confirmed' });
  } catch (error) {
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
};



module.exports = { signUp,signIn, signOut, confirmEmail};
 
  