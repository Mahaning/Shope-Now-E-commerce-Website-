import fs from "fs";
import Product from "../models/productsModel.js";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from 'dotenv';
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const {
      productName,
      categoryId,
      actualPrice,
      sellingPrice,
      totalQuantity,
      remainingQuantity,
      shortDescription,
      productDescription,
    } = req.fields;
    const { productImg } = req.files;

    switch (true) {
      case !productName:
        return res.status(500).send({
          message: "Product Name is required",
        });

      case !categoryId:
        return res.status(500).send({
          message: "Category Name is required",
        });
      case !actualPrice:
        return res.status(500).send({
          message: "actual Price  is required",
        });
      case !sellingPrice:
        return res.status(500).send({
          message: "selling Price  is required",
        });
      case !totalQuantity:
        return res.status(500).send({
          message: " totalQuantity is required",
        });
      case !remainingQuantity:
        return res.status(500).send({
          message: "remainingQuantity is required",
        });
      case !shortDescription:
        return res.status(500).send({
          message: "shortDescription   is required",
        });
      case !productDescription:
        return res.status(500).send({
          message: "productDescription   is required",
        });
      case productImg && productImg.size > 1000000:
        return res.status(500).send({
          message: "Photo  is required and size should be <1MB",
        });
    }

    const products = new Product({
      ...req.fields,
      slug: slugify(productName),
      createdBy: req.user._id,
    });
    if (productImg) {
      products.productImg.data = fs.readFileSync(productImg.path);
      products.contentType = productImg.type;
    }
    await products.save();
    res.status(201).send({
      message: "Product created",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Somthing went wrong",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const {
      productName,
      categoryId,
      actualPrice,
      sellingPrice,
      totalQuantity,
      remainingQuantity,
      shortDescription,
      productDescription,
    } = req.fields;
    const { productImg } = req.files;

    // Validate required fields
    switch (true) {
      case !productName:
        return res.status(400).send({ message: "Product Name is required" });
      case !categoryId:
        return res.status(400).send({ message: "Category ID is required" });
      case !actualPrice:
        return res.status(400).send({ message: "Actual Price is required" });
      case !sellingPrice:
        return res.status(400).send({ message: "Selling Price is required" });
      case !totalQuantity:
        return res.status(400).send({ message: "Total Quantity is required" });
      case !remainingQuantity:
        return res
          .status(400)
          .send({ message: "Remaining Quantity is required" });
      case !shortDescription:
        return res
          .status(400)
          .send({ message: "Short Description is required" });
      case !productDescription:
        return res
          .status(400)
          .send({ message: "Product Description is required" });
      case productImg && productImg.size > 1000000:
        return res
          .status(400)
          .send({ message: "Photo is required and size should be < 1MB" });
    }

    const id = req.params.id;
    const updateData = {
      ...req.fields,
      slug: slugify(productName),
      createdBy: req.user._id,
    };

    if (productImg) {
      updateData.productImg = {
        data: fs.readFileSync(productImg.path),
        contentType: productImg.type,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      products: updatedProduct,
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

export const fetchAllProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("categoryId")
      .sort({ createdAt: -1 });

    res.status(201).send({
      success: true,
      total: products.length,
      message: "Products founded",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Somthing went wrong",
    });
  }
};

export const fetchSingleProductController = async (req, res) => {
  try {
    const id = req.params.id; // Assuming params.id is the correct way to get the ID
    const product = await Product.findById(id).populate("categoryId");
    if (product) {
      res.status(200).send({
        message: "Product Found",
        success: true,
        product,
      });
    } else {
      res.status(404).send({
        message: "Product Not Found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
};

export const fetchProductImageController = async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await Product.findById(id).select("productImg");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (product.productImg && product.productImg.data) {
      res.set("Content-Type", product.productImg.contentType);
      return res.status(200).send(product.productImg.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Product image not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Product  deleted",
        product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Somthing went wrong",
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    let { checked, radio } = req.query;

    // Check if checked is an array, if so, join it into a string
    if (Array.isArray(checked)) {
      checked = checked.join(",");
    }

    let args = {};
    if (checked && checked.length > 0) {
      args.categoryId = checked.split(",");
    }
    if (Array.isArray(radio) && radio.length === 2) {
      // Convert elements of radio array to numbers
      const priceRange = radio.map(parseFloat);
      args.sellingPrice = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    const products = await Product.find(args);
    res.status(200).send({
      message: "Success",
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      message: "Sucess fully fetched count",
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-productImg")
      .populate("categoryId")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "Sucess fully fetched count",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
};

export const searchProductControler = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await Product.find({
      $or: [
        { productName: { $regex: keyword, $options: "i" } },
        { productDescription: { $regex: keyword, $options: "i" } },
        { shortDescription: { $regex: keyword, $options: "i" } },
        { shortDescription: { $regex: keyword, $options: "i" } },
      ],
    }).select("-productImg");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error In Search Product",
    });
  }
};


export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    console.log(pid);
    console.log(cid);
    const products = await Product.find({categoryId: cid,_id: { $ne: pid }}).select('-productImg').limit(4).populate("categoryId");
    res.status(200).send({
      message: "Successfully fetched Related products",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error in displaying Related Product",
    });
  }
};

export const categoryProductController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ categoryId: category.id }).populate('categoryId');
    res.status(200).send({
      message: "Successfully fetched related products",
      success: true,
      products,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error,
      success: false,
      message: "Error in displaying related products",
    });
  }
};


export const brainTreeTokenController=async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(response);
      }
    })
  } catch (error) {
    console.log(error)
  }
}



export const brainTreePaymentController = async (req, res) => {
  try {
      const { nonce, cart, address, Pincode, city, country } = req.body;
      let total = 0;
      cart.forEach(item => {
          total += item.sellingPrice * item.quantity;
      });

      let newTransaction = gateway.transaction.sale({
          amount: total,
          paymentMethodNonce: nonce,
          options: {
              submitForSettlement: true
          }
      }, async (error, result) => {
          if (result) {
              const order = new Order({
                  products: cart,
                  payment: result,
                  buyer: req.user._id,
                  address:address,
                  Pincode:Pincode,
                  city:city,
                  country:country,
              });
              await order.save();
              res.json({ ok: true });
          } else {
              res.status(500).send(error);
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error", error });
  }
};