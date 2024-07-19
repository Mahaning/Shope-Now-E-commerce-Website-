import Coupon from "../models/coupanModel.js";

export const createCouponController = async (req, res) => {
    try {
        const { coupon, couponCode, discountPercentage, maxDiscountPrice, expires } = req.body;

        // Validation
        if (!coupon) {
            return res.status(400).send({ success: false, message: "Coupon Name is required" });
        }
        if (!couponCode) {
            return res.status(400).send({ success: false, message: "Coupon Code is required" });
        }
        if (!discountPercentage) {
            return res.status(400).send({ success: false, message: "Discount Percentage is required" });
        }
        if (!maxDiscountPrice) {
            return res.status(400).send({ success: false, message: "Max Discount Price is required" });
        }
        if (!expires) {
            return res.status(400).send({ success: false, message: "Expires date is required" });
        }

        const existingCoupon = await Coupon.findOne({ couponCode });
        if (existingCoupon) {
            return res.status(200).send({ success: false, message: "Coupon already exists" });
        }

        const newCoupon = await new Coupon({
            coupon,
            couponCode,
            discountPercentage,
            maxDiscountPrice,
            expires,
            createdBy: req.user._id
        }).save();

        res.status(201).send({
            success: true,
            message: "Coupon created successfully",
            coupon: newCoupon
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

export const updateCouponController = async (req, res) => {
    try {
        const id = req.params.id;
        const { coupon, couponCode, discountPercentage, maxDiscountPrice, expires } = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            { coupon, couponCode, discountPercentage, maxDiscountPrice, expires, updatedBy: req.user._id },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Coupon updated successfully",
            coupon: updatedCoupon
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

export const getAllCouponController = async (req, res) => {
    try {
        const allCoupons = await Coupon.find({}).populate('createdBy').sort({"createdAt":-1});
        res.status(200).send({
            success: true,
            message: "Coupon List:",
            allCoupons
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

export const getAllUserCouponController = async (req, res) => {
    try {
        const currentDate = new Date();
        const allCoupons = await Coupon.find({
            active: { $in: [0] }, // Active or Deactive
            expires: { $gte: currentDate } // Expires in the future
        }).populate('createdBy');

        res.status(200).send({
            success: true,
            message: "Coupon List:",
            allCoupons
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};




export const getSingleCouponController = async (req, res) => {
    try {
        const id = req.params.id;
        const couponData = await Coupon.findById(id);

        if (couponData) {
            res.status(200).send({
                success: true,
                message: "Coupon Found:",
                couponData
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Coupon Not Found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

export const deleteCouponController = async (req, res) => {
    try {
        const id = req.params.id;
        const coupon = await Coupon.findByIdAndDelete(id);

        if (coupon) {
            res.status(200).send({
                success: true,
                message: "Coupon deleted",
                coupon
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Coupon not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};
