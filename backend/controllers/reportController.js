// controllers/reportController.js
import User from '../models/usersModel.js';
import Order from '../models/orderModel.js';


export const getCustomerReport = async (req, res) => {
    try {
      // Example: Get total orders per customer
      const ordersPerCustomer = await Order.aggregate([
        {
          $group: {
            _id: '$buyer',
            totalOrders: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'users', // assuming 'users' is the name of your users collection
            localField: '_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $project: {
            _id: 1,
            totalOrders: 1,
            firstName: { $arrayElemAt: ['$user.firstName', 0] },
            lastName: { $arrayElemAt: ['$user.lastName', 0] }
          }
        }
      ]);
  
      // Return data as JSON
      res.status(200).json(ordersPerCustomer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
export const getStatistics = async (req, res) => {
    try {
        // Total users
        const totalUsers = await User.countDocuments();

        // Total orders
        const totalOrders = await Order.countDocuments();

        // Completed orders
        const completedOrders = await Order.countDocuments({ status: 'deliverd' });

        // Not completed orders
        const notCompletedOrders = await Order.countDocuments({ status: { $ne: 'deliverd' } });

        // Total products ordered per category
        const productsPerCategory = await Order.aggregate([
            {
                $unwind: '$products'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $group: {
                    _id: '$product.categoryId', // Group by categoryId
                    totalProductsSold: { $sum: 1 } // Count the number of products sold per category
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $project: {
                    categoryName: '$category.name',
                    totalProductsSold: 1
                }
            }
        ]);
        console.log(productsPerCategory)
        return res.status(200).json({
            totalUsers,
            totalOrders,
            completedOrders,
            notCompletedOrders,
            productsPerCategory
        });
    } catch (err) {
        console.error('Error fetching statistics:', err);
        return res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};


// export const getSalesReport = async (req, res) => {
//   try {
//     // Example: Get total sales per product
//     const salesPerProduct = await Order.aggregate([
//       {
//         $unwind: '$products'
//       },
//       {
//         $group: {
//           _id: '$products',
//           totalSales: { $sum: '$products.sellingPrice' },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $lookup: {
//           from: 'products',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'product'
//         }
//       },
//       {
//         $project: {
//           _id: 1,
//           totalSales: 1,
//           count: 1,
//           productName: { $arrayElemAt: ['$product.productName', 0] }
//         }
//       }
//     ]);

//     // Example: Get total sales per category
//     const salesPerCategory = await Order.aggregate([
//       {
//         $unwind: '$products'
//       },
//       {
//         $lookup: {
//           from: 'products',
//           localField: 'products',
//           foreignField: '_id',
//           as: 'product'
//         }
//       },
//       {
//         $unwind: '$product'
//       },
//       {
//         $lookup: {
//           from: 'categories',
//           localField: 'product.categoryId',
//           foreignField: '_id',
//           as: 'category'
//         }
//       },
//       {
//         $unwind: '$category'
//       },
//       {
//         $group: {
//           _id: '$category._id',
//           categoryName: { $first: '$category.name' },
//           totalSales: { $sum: '$products.sellingPrice' },
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.status(200).json({ salesPerProduct, salesPerCategory });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };


export const getSalesReport = async (req, res) => {
  try {
    const salesPerProduct = await Order.aggregate([
      // Aggregate for sales per product
      { $unwind: '$products' },
      { $lookup: { from: 'products', localField: 'products', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $group: { _id: '$product._id', productName: { $first: '$product.productName' }, totalSales: { $sum: '$product.sellingPrice' } } }
    ]);

    const salesPerCategory = await Order.aggregate([
      // Aggregate for sales per category
      { $unwind: '$products' },
      { $lookup: { from: 'products', localField: 'products', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $lookup: { from: 'categories', localField: 'product.categoryId', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $group: { _id: '$category._id', categoryName: { $first: '$category.name' }, totalSales: { $sum: '$product.sellingPrice' } } }
    ]);

    const monthlySales = await Order.aggregate([
      // Aggregate for monthly sales
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          totalSales: { $sum: '$totalPrice' }
        }
      }
    ]);

    res.status(200).json({ salesPerProduct, salesPerCategory, monthlySales });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};