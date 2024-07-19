import express from 'express';
import { createFeedback, deleteFeedbackController, fetchAllFeedBackController } from '../controllers/feedbackControllor.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-feedback', requireSignIn, createFeedback);
// router.put('/update-feedback/:id', requireSignIn, isAdmin, );
router.get('/fetch-all-feedback',fetchAllFeedBackController);
// router.get('/fetch-single-feedback/:id', requireSignIn, isAdmin, getSingleCouponController);
router.delete('/delete-feedback/:id', requireSignIn, isAdmin, deleteFeedbackController);

export default router;