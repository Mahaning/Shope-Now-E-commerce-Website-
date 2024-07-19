import Feedback from "../models/feedbackModel.js";

export const createFeedback = async (req, res) => {
    try {
        const { ProductId, feedbackText, rating } = req.body;

        if (!ProductId || !feedbackText || rating < 0 || rating > 5) {
            return res.status(400).send({ message: "All fields are required and rating should be between 0 and 5" });
        }

        const feedback = new Feedback({
            userId: req.user._id,
            ProductId,
            feedbackText,
            rating,
            createdBy: req.user._id
        });
        await feedback.save();
        res.status(201).send({
            message: "Feedback created",
            success: true,
            feedback
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
            success: false,
            message: "Something went wrong",
        });
    }
};

export const fetchAllFeedBackController = async (req, res) => {
    try {
        const feedback = await Feedback.find({}).populate("userId").populate("ProductId").sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            total: feedback.length,
            message: "Feedback found",
            feedback,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error,
            success: false,
            message: "Something went wrong"
        });
    }
};

export const deleteFeedbackController = async (req, res) => {
    try {
        const id = req.params.id;
        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) {
            return res.status(404).send({
                success: false,
                message: "Feedback not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Feedback deleted",
            feedback,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error,
            success: false,
            message: "Something went wrong"
        });
    }
};
