import User from "../models/users.js";
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'
import dbConnection from "lib/DB.js";

dbConnection();

//sendgrid's API Key
sgMail.setApiKey(process.env.NEXT_PUBLIC_SGMAIL_API);
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

//Token creation process function
const generateToken = (user, options) => {
  const data = {
    user: {
      id: user.id,
    },
  };
  const authtoken = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '7d'});
  return authtoken;
};

//sending email on new user creation to validate email address
const sendEmail = async (userFullName, subject, toEmail, msg) => {
  try {
    await sgMail.send({
      to: toEmail,
      from: 'gbhattarai55@gmail.com',
      subject: subject,
      html: `Dear ${userFullName},<br><br> ${msg} <br><br>Thank you.`
    })
  } catch (error) {
    console.log(error)
  }
  
}
  
//Signup new user & send email verification link on email
const registerUser = (async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    email,
    password,
    profile_pic,
    role,
    type,
    isVerified,
    isActive,
    ...rest
  } = req.body;
  try {
    const user = await User.create({
      fullName,
      email,
      password,
      profile_pic: 'null',
      role: 'user',
      type,
      isVerified: false,
      isActive: false,
      ...rest,
    });
    const authtoken = generateToken(user);
    //verification link send email
    const msg = `Click <a href=${SERVER_URL}/api/users/emailverificationLink?key=${authtoken}>here</a> to verify your email address. <br><br><br>or, copy paste this code <br><br>${authtoken}`;
    sendEmail(user.fullName, 'New Account Email Verificaton', user.email, msg);
    res.status(200).send({ status: "user created", authtoken, user });
    console.log(authtoken);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Email verification check on link with "key" parameter
const emailVerificationUser = (async (req,res)=>{
  const token = req.query.key;
  console.log(token);
  if(!token) {
    return res.status(401).json({Error: 'Access Denied on this resource, no token'}) 
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id).select("-password");
      user.isVerified = true;
      user.isActive = true;
      user.save();
      const authtoken = generateToken(user);
      res.status(200).json({ status: 'Login successful', authtoken, user})
      res.redirect(`${CLIENT_URL}`);
      // res.status(200).json({Success: `Your email is verified, Click <a href='http://localhost:3000/login'>here</a> to login`, email: user.email })
    } catch (error) {
        return res.status(401).json({Error: 'Access Denied on this resource, other'})
    }
  }
})

//Email verification check on link with "key" parameter when link is clicked
const emailVerificationUserLink = (async (req,res)=>{
  const token = req.query.key;
  if(!token) {
    return res.status(401).json({Error: 'Access Denied on this resource, no token'}) 
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id).select("-password");
      user.isVerified = true;
      user.isActive = true;
      user.save();
      res.redirect(CLIENT_URL);
      // res.status(200).json({Success: `Your email is verified, Click <a href='http://localhost:3000/login'>here</a> to login`, email: user.email })
    } catch (error) {
        return res.status(401).json({Error: 'Access Denied on this resource, internal error'})
    }
  }
})

//Checkig username & Passwords : Login Process
const loginUser = (async (req, res) => {

  try {
    const user = await User.findOne({email: req.body.email});
    console.log(req.body.email);
    if(!user) {
      return res.status(401).json ({status: "Invalid email"})
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(err) throw err;
      !isMatch ? res.status(401).json({status: 'Invalid Password'}) : void 0;
      if(isMatch){ 
        if(!user.isVerified) {
          return res.status(401).json ({status: "Email not verified"})
        }
        if(!user.isActive) {
          return res.status(401).json ({status: "User account is disabled, Contact IT personnel"})
        }
        const authtoken = generateToken(user);
        res.status(200).json ({ status: 'Login successful', authtoken, user})
      }
    })
  } catch (err) {
    console.log(err, ">>>>>>>>>>>> error");
    res.status(403).json({ error: err.message });
  }
});

//Forgot password
const forgotPassword = (async (req,res)=>{
  try {
  const email = req.body.email;
  //make sure user exists in DB
  const user = await User.findOne({ email });
  if(!user) {
    return res.status(404).json({status: 'Email is not registered'})
  }
  //password recovery one time link token gen & send link to email
  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user._id
  }
  const token = jwt.sign(payload, secret, {expiresIn: '10m'});
  const link = `${CLIENT_URL}/resetpassword?id=${user._id}&token=${token}&email=${user.email}`

    const msg = `Click <a href=${link}>here</a> to change your password.`;
    sendEmail(user.fullName, 'Password Recovery', user.email, msg);
    res.status(200).json({success: 'Please check your email for further action'})  
  } catch (error) {
    res.status(500).json(error)
  }
  
})

//Reset password - from forgot password with token checking
const resetPassword = (async (req,res)=>{
  const {id, email, password, token} = req.body;
  
  //make sure user exists in DB
  const user = await User.findOne({ _id: id });
  if(!user) {
    return res.status(404).json({status: 'Invalid'})
  }

  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    user.password = password;
    await user.save();
    res.status(200).json ({status: 'Password Reset Successfully'})
    
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message)
  }
})

//get User Profile
const getUser = (async (req, res) => {
  try {
    console.log(req.query.users);
    const email = req.query.users[1];
    const user = await User.findOne({email}).select('-password');
    res.status(200).json({ status: 'success', user:user });
  } catch (err) {
    console.log(err, ">>>>>>>>>>>> error");
    res.status(400).send({ status: "error getting user" });
  }
});

//user changing fullname & or password from profile page
const updateProfile = (async (req,res)=>{
  const {id, fullName, email, password} = req.body;
  console.log(req.body);
  //make sure user exists in DB
  const user = await User.findOne({ _id: id });
  if(!user) {
    return res.status(404).json({status: 'Invalid Data'})
  }

  try {
    user.fullName = fullName;
    user.password = password;
    await user.save();
    res.status(200).json ({status: 'Profile Updated Successfully', user})
    console.log(user);
    
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message)
  }
})

//update profile picture 
const updateProfilePicture = (async (req, res)=>{

  try {
    const fileName = req.newfilename
    const _id = req.id
    console.log('Avatar Updated:', fileName);
    const user = await User.findOne({ _id })
    console.log(user);
    user.profile_pic = `/avatar/${fileName}`;
    user.save()
    res.status(200).json({ status: 'Profile picture changed!', user})
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }
})

export { registerUser, getUser, loginUser, emailVerificationUser,emailVerificationUserLink, forgotPassword, resetPassword, updateProfile, updateProfilePicture };