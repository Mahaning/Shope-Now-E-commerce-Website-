import slugify from "slugify";
import Category from "../models/categoryModel.js";
import fs from 'fs'


export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.fields;
    const { image } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({
          message: "Category Name is required"
        });
      case !description:
        return res.status(500).send({
          message: "Category Description is required"
        });
    }

    const newCategory = new Category({
      ...req.fields,
      slug: slugify(name),
      createdBy: req.user._id
    });

    if (image) {
      newCategory.image.data = fs.readFileSync(image.path);
      newCategory.image.contentType = image.type;
    }

    await newCategory.save();
    res.status(201).send({
      message: "Category created",
      success: true,
      newCategory
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

export const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.fields;
    const { image } = req.files;

    const updatedCategory = {
      name,
      description,
      slug: slugify(name),
      updatedBy: req.user._id
    };

    if (image) {
      updatedCategory.image = {
        data: fs.readFileSync(image.path),
        contentType: image.type
      };
    }

    const newCategory = await Category.findByIdAndUpdate(
      id,
      updatedCategory,
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Category updated successfully",
      category: newCategory,
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

export const fetchAllCategoryController = async (req,res) => {
    try {
        const allData=await Category.find({}).populate('createdBy').sort("name");
        res.status(201).send({
            success: true,
            message: "Category Lis :",
            allData
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

export const fetchSingleCategoryController = async (req,res) => {
    try {
        
        const category=await Category.findOne({slug:req.params.slug});
        if(category){
            res.status(201).send({
                success: true,
                message: "Category Found :",
                category
              });
        }
        else{
            res.status(401).send({
                success: true,
                message: "Category Not Found :",})
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

export const deleteCategoryController = async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from req.params

        const category = await Category.findByIdAndDelete(id);

        // Check if category with given ID exists
        if (category) {
            res.status(200).send({
                success: true,
                message: "Category deleted",
                category
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Category not found"
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

export const fetchCategoryImageController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).select('image');
    if (!category || !category.image || !category.image.data) {
      return res.status(404).send({
        success: false,
        message: "Category image not found"
      });
    }
    
    res.set('Content-Type', category.image.contentType);
    res.status(200).send(category.image.data);
    } catch (error) {
    console.error(error);
    res.status(500).send({
    error,
    success: false,
    message: "Something went wrong"
    });
    }
    };

export const searchCategoryController = async () => {};
