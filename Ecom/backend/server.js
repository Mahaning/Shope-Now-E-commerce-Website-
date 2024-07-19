
    import express from 'express';
    import colors from 'colors'
    import dotenv from 'dotenv';
    import morgan from 'morgan';
    import connectDB from './config/db.js';
    import authRoute from './routes/authRoute.js'; 

    import categoryRoute from './routes/categoryRoutes.js';
    import productRoute from './routes/productsRoute.js';
    import couponRoute from './routes/couponRoute.js';
    import FeedbackRoute from './routes/feedbackRoute.js';
    import CartRoute from './routes/cartRoutes.js';
    import reportRoute from './routes/reportRoute.js';
    import cors from 'cors';
    import formidable from 'express-formidable';
    import bodyParser from 'body-parser';
    import banner from './routes/bannerRoute.js';
    dotenv.config();

    connectDB();

    const app=express();

    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    //middleware
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    
    // app.use(formidable({
    //     maxFileSize: 10 * 1024 * 1024, // 10MB
    // }));


    // routes
    app.use('/api/v1/auth',authRoute);
    app.use('/api/v1/category',categoryRoute)
    app.use('/api/v1/product',productRoute)
    app.use('/api/v1/coupon', couponRoute);
    app.use('/api/v1/feedback', FeedbackRoute);
    app.use('/api/v1/cart', CartRoute);
    app.use('/api/v1/report', reportRoute); 
    app.use('/api/v1/banner',banner);
    // rest api
    app.get('/',(req,res)=>{
        res.send(
            "<h1>Welcome</h1>"
        );
    });


    const PORT=process.env.PORT || 8080;

    app.listen(8080,()=>{
        console.log(`server started at port ${PORT}`.bgCyan.white);
    })