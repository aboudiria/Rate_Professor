const express= require('express');
const DB= require('./db/connectDB');
const dotenv= require('dotenv');
const userRoutes=require('./routes/userRoutes');
const profileRoutes=require('./routes/profileRoutes'); 
const universityRoutes=require('./routes/universityRoutes');
const doctorRoutes=require('./routes/doctorRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dotenv.config()

const app= express();
DB();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

//routes


app.use('/api/users',userRoutes);
app.use('/api/profile',profileRoutes);
app.use ('/api/university',universityRoutes);
app.use('/api/doctor',doctorRoutes);


const PORT= process.env.PORT;
 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});