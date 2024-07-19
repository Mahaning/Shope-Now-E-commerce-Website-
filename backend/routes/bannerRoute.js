import express from 'express';
import { uploadBanner, updateBannerStatus, upload, getAllBanners, deleteBanner, getAllActiveBanners } from '../controllers/bannerController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/get-all-banners', getAllBanners);
router.post('/upload-banner', requireSignIn,isAdmin, upload.single('bannerImage'), uploadBanner);
router.get('/get-all-active-banners', getAllActiveBanners);
router.patch('/update-banner-status/:id', requireSignIn,isAdmin, updateBannerStatus);
router.delete('/delete-banner/:id', requireSignIn,isAdmin, deleteBanner);

export default router;
