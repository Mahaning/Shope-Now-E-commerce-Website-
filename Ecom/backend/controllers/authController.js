
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from "../models/usersModel.js";
import Order from "../models/orderModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const registerController = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        const { email, firstName, lastName, password, phoneNumber, address, active, role } = req.body;
        
        if (!email) return res.send({ message: "Email is required" });
        if (!lastName) return res.send({ message: "Last name is required" });
        if (!firstName) return res.send({ message: "First name is required" });
        if (!password) return res.send({ message: "Password is required" });
        if (!phoneNumber) return res.send({ message: "Contact number is required" });
        if (!address) return res.send({ message: "Address is required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send({
                success: false,
                message: "User already exists, please try to login"
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new User({ email, firstName, lastName, password: hashedPassword, phoneNumber, address, active, role });
        
        await user.save();

        res.send({
            success: true,
            message: "User registration successful",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            });
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                active: user.active,
                role: user.role
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Login Failed",
            error
        });
    }
}

export const updateProfile = async(req, res) => {
    try {
        console.log(req.body);
        const { email, firstName, lastName, phoneNumber, address } = req.body;
        const user=await  User.findById(req.user._id);
        
            
            
            const updateUser= await User.findByIdAndUpdate(req.user._id,{
                firstName:firstName || user.firstName,
                lastName:lastName || user.lastName,
                email:email || user.email,
                phoneNumber:phoneNumber || user.phoneNumber,
                address:address || user.address,
            },{new:true})
            res.status(200).send({
                success: true,
                message: "Update Successful",
               updateUser,
            });
            

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Update Failed",
            error
        });
    }
}

export const testController = (req, res) => {
    console.log("Test Controller");
    res.send("Protected route");
}
export const getUsersController=async(req,res)=>{
    try {
        const allUsers= await User.find({}).sort({"createdAt":-1})
        res.json(allUsers)
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Getting Orders list failed",
            error
        });
    }
}

export const getOrdersController=async(req,res)=>{
    try {
        const orders= await Order.find({buyer:req.user._id}).populate("products","-productImg").populate("buyer").sort({"createdAt":-1})
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Getting Orders list failed",
            error
        });
    }
}



export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await Order
        .find({})
        .populate("products", "-productImg")
        .populate("buyer").sort({"createdAt":-1})
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

  
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };


//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
  



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in sendOtp:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.otp = '';
    await user.save();
    res.json({ success: true, message: 'OTP verified' });
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Reset Password
// export const resetPassword = async (req, res) => {
//   const { email, newPassword } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'User not found' });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ success: true, message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Error in resetPassword:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

export const resetPassword=async(req,res)=>{
  try {
    const { email,newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await User.findOne({ email});
    //validation
    if (!user) {
      // return res.status(404).send({
      //   success: false,
      //   message: "Wrong Email ",
      // });
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    // res.status(200).send({
    //   success: true,
    //   message: "Password Reset Successfully",
    // });
    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}