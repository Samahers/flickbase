const httpStatus = require("http-status");
const { User } = require("../models/user");
const userService = require("./user.service")
const {ApiError} = require('../middleware/apiError')

const createUser = async (email, password) => {
  try {
    if (await User.emailTaken(email)) {
      // throw new Error("sorry email taken");
      throw new ApiError(httpStatus.BAD_REQUEST, 'sorry email taken')
    }

    const user = new User({
      email,
      password,
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;

}
const signInWithEmailandPassword = async(email,password)=>{
  try{
    const user = await userService.findUserByEmail(email);
    //check email exists
    if(!user){
      // throw new Error('email doesnt exist')
      throw new ApiError(httpStatus.BAD_REQUEST, 'email doesnt exist')
    }
    //validate password
    if(!(await user.comparePassword(password))){
      // throw new Error('bad password')
      throw new ApiError(httpStatus.BAD_REQUEST,'bad password')

    }
    return user;
  }
  catch(error){
    throw error
  }
}


module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailandPassword,
    
};
