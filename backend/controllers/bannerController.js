import multer from 'multer';
import { Buffer } from 'buffer';
import Banner from '../models/bannerModel.js';

// Set up multer storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload Banner
export const uploadBanner = async (req, res) => {
  const { description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const newBanner = new Banner({
    bannerImage: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    bannerDescription: description,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  try {
    await newBanner.save();
    res.status(201).json({ message: 'Banner uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Banner Status
export const updateBannerStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    banner.active = !banner.active;
    banner.updatedBy = req.user._id;
    banner.updatedAt = Date.now();

    await banner.save();
    res.status(200).json({ message: 'Banner status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Fetch Banners
export const getAllBanners = async (req, res) => {
    try {
      const banners = await Banner.find({});
      const formattedBanners = banners.map(banner => {
        return {
          ...banner._doc,
          bannerImage: {
            data: banner.bannerImage.data.toString('base64'),
            contentType: banner.bannerImage.contentType
          }
        };
      });
      res.json(formattedBanners);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch banners' });
    }
  };

  export const deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await Banner.findByIdAndDelete(id);
    
        // if (banner) {
        //   return res.status(404).send({
        //     success: false,
        //     message: "banners not found",
        //   });
        // } else {
        //   return res.status(200).send({
        //     success: true,
        //     message: "banner  deleted",
        //     product,
        //   });
        // }
      } catch (error) {
        console.log(error);
        res.status(400).send({
          error,
          success: false,
          message: "Somthing went wrong",
        });
      }
  };


  export const getAllActiveBanners = async (req, res) => {
    try {
      const banners = await Banner.find({ active: true });
      const formattedBanners = banners.map(banner => {
        return {
          ...banner._doc,
          bannerImage: {
            data: banner.bannerImage.data.toString('base64'),
            contentType: banner.bannerImage.contentType
          }
        };
      });
      res.json(formattedBanners);
    } catch (error) {
      console.error('Error fetching active banners:', error);
      res.status(500).json({ message: 'Failed to fetch banners' });
    }
  };
  