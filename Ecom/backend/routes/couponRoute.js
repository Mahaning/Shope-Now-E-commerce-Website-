import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCouponController, deleteCouponController, getAllCouponController, getAllUserCouponController, getSingleCouponController, updateCouponController } from '../controllers/couponController.js';

const router = express.Router();

router.post('/create-coupon', requireSignIn, isAdmin, createCouponController);
router.put('/update-coupon/:id', requireSignIn, isAdmin, updateCouponController);
router.get('/fetch-all-coupon', requireSignIn, isAdmin, getAllCouponController);
router.get('/fetch-all-coupon/user',getAllUserCouponController);
router.get('/fetch-single-coupon/:id', requireSignIn, isAdmin, getSingleCouponController);
router.delete('/delete-coupon/:id', requireSignIn, isAdmin, deleteCouponController);

export default router;
