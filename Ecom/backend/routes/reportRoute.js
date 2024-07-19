// routes/reportRoute.js
import express from 'express';
import { getCustomerReport, getSalesReport, getStatistics } from '../controllers/reportController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/customer-report', getCustomerReport);
router.get('/statics',requireSignIn,isAdmin,getStatistics);
router.get('/sales-report',requireSignIn,getSalesReport)

export default router;
