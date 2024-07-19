import express from 'express';
import { registerController, loginController, testController, updateProfile, getOrdersController, getAllOrdersController, orderStatusController, getUsersController, sendOtp, verifyOtp, resetPassword } from '../controllers/authController.js';
import { isAdmin, isDiliveryPartner, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

// Adding the user-auth route
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Adding the admin-auth route
router.get('/admin-auth', requireSignIn, isAdmin,(req, res) => {
  res.status(200).send({ ok: true });
});
router.get('/all-users', requireSignIn, isAdmin, getUsersController);
router.get('/admin/login', requireSignIn, isAdmin, testController);
router.get('/deliverypartner/login', requireSignIn, isDiliveryPartner, testController);
router.put('/user-profile',requireSignIn,updateProfile);
router.get('/orders',requireSignIn,getOrdersController);
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.get("/delivery-orders", requireSignIn, isDiliveryPartner, getAllOrdersController);
router.put("/partner-order-status/:orderId",requireSignIn,isDiliveryPartner,orderStatusController);
export default router;
