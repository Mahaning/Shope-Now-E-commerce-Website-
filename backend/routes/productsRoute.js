import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, brainTreeTokenController, categoryProductController, createProductController, deleteProductController, fetchAllProductController, fetchProductImageController, fetchSingleProductController, productCountController, productFilterController, productListController, relatedProductController, searchProductControler, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';


const router = express.Router();



router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);
router.get('/fetch-all-product', fetchAllProductController);
router.get('/fetch-single-product/:id', fetchSingleProductController); // Modified route definition
router.get('/get-product-image/:pid', fetchProductImageController);
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);
router.get('/product-filters', productFilterController);
router.get('/product-count',productCountController);
router.get('/product-List/:page',productListController);
router.get('/search/:keyword',searchProductControler);
router.get('/related-products/:pid/:cid',relatedProductController);
router.get('/product-category/:slug',categoryProductController);

router.get('/braintree/token',requireSignIn,brainTreeTokenController);
router.post('/braintree/payment',requireSignIn,brainTreePaymentController);

export default router;
