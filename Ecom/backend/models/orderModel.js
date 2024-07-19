import mongoose from "mongoose";
// import

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    address:{
      type: String,
      required: true
    },
    Pincode:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    country:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);