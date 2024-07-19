// categoryRoutes.js

import express from 'express';
import { createCategoryController, deleteCategoryController, fetchAllCategoryController, fetchSingleCategoryController, updateCategoryController, fetchCategoryImageController } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/add-category', requireSignIn, isAdmin, formidable(), createCategoryController);
router.put('/update-category/:id', requireSignIn, isAdmin, formidable(), updateCategoryController);
router.get('/getall-category',fetchAllCategoryController);
router.get('/get-category-image/:id', fetchCategoryImageController);
router.get('/get-single-category/:slug',fetchSingleCategoryController);
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
