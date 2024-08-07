const  validatePassword=(password)=> {
    // Define the regular expression for the password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    // Test the password against the regex
    if (passwordRegex.test(password)) {
      return { valid: true, message: 'Password is valid.' };
    } else {
      return { valid: false, message: 'Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.' };
    }
  }
  module.exports={validatePassword};