
// import Product from "../Models/Product.js";


// export const getAllProduct = async (req, res) => {
//   try {
//     const products = await Product.find({ isDeleted: false }).populate('auth', 'username email role'); 
//     res.status(200).json({ data: products, message: "Fetched successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "Error fetching products", error: error.message });
//   }
// };

// export const viewProduct = async (req, res) => {
//   const { product_id } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(product_id)) {
//     return res.status(400).json({ message: "Invalid product ID format" });
//   }

//   try {
//     const product = await Product.findOne({ _id: product_id, isDeleted: false }); 
//     if (product) {
//       res.status(200).json({ data: product, message: "Product fetched successfully" });
//     } else {
//       res.status(404).json({ data: [], message: "Product not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: "Error fetching product", error: error.message });
//   }
// };


// export const addProduct = async (req, res) => {
//   const { title, price, description, category, image } = req.body;

//   if (!title || !price || !description || !category || !image) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const newProduct = await Product.create({
//       title,
//       price,
//       description,
//       category,
//       image,
//       auth: req.user.id
//     });

//     res.status(201).json({ data: newProduct, message: "Product added successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "Product not added", error: error.message });
//   }
// };



// // export const viewProduct = async (req, res) => {
// //   const { product_id } = req.body;
// //   try {
// //     const product = await Product.findById({ _id: product_id, delete: false }); 
// //     if (product) {
// //       res.status(200).json({ data: product, message: "Product fetched successfully" });
// //     } else {
// //       res.status(404).json({ data: [], message: "Product not found" });
// //     }
// //   } catch (error) {
// //     res.status(400).json({ message: "Invalid product ID", error: error.message });
// //   }
// // };

// // export const addProduct = async (req, res) => {
// //   const { title, price, description, category, image } = req.body;

// //   if (!title || !price || !description || !category || !image) {
// //     return res.status(400).json({ message: "All fields are required" });
// //   }

// //   try {
// //     const newProduct = await Product.create({ title, price, description, category, image,auth: req.user.id });
// //     res.status(201).json({ data: newProduct, message: "Product added successfully" });
// //   } catch (error) {
// //     res.status(400).json({ message: "Product add unsuccessfully", error: error.message });
// //   }
// // };

// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) return res.status(404).json({ error: 'Product not found' });

//     product.isDeleted = true;
//     await product.save();

//     res.json({ message: 'Product soft deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Delete failed' });
//   }
// };


// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const updateData = req.body;

//   try {
//     const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updated) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product updated", data: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating product", error: err.message });
//   }
// };

// // export const updateProduct = async (req, res) => {
// //   const { id } = req.params;
// //   const updateData = req.body;

// //   try {
// //     const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

// //     if (!updated) {
// //       return res.status(404).json({ message: "Product not found" });
// //     }

// //     res.status(200).json({ message: "Product updated", data: updated });
// //   } catch (err) {
// //     res.status(500).json({ message: "Error updating product", error: err.message });
// //   }
// // };


import mongoose from 'mongoose';
import Product from "../Models/Product.js";


export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate('auth', 'username email role');

    res.status(200).json({ data: products, message: "Fetched successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error fetching products", error: error.message });
  }
};


export const viewProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }


  try {
    const product = await Product.findOne({ _id: id, isDeleted: false }).populate("auth");
    if (product) {
      res.status(200).json({ data: product, message: "Product fetched successfully" });
    } else {
      res.status(404).json({ data: [], message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching product", error: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { title, price, description, category } = req.body;

  try {
    // const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
     const imagePath = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;
    console.log("User from middleware:", req.user);
console.log("File received:", req.file);
console.log("Body received:", req.body);


    const newProduct = await Product.create({
      title,
      price,
      description,
      category,
      image: imagePath,
      auth: req.user.id
    });

    await newProduct.populate("auth");

    res.status(201).json({ data: newProduct, message: "Product added successfully" });
  } catch (error) {
      console.error("Error adding product:", error);  
    res.status(400).json({ message: "Product not added", error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.isDeleted = true;
    await product.save();

    res.json({ message: 'Product soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', detail: err.message });
  }
};


// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const updateData = req.body;

//   try {
//     const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updated) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product updated", data: updated });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating product", error: err.message });
//   }
// };
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If a new file is uploaded, update image path
    let imagePath = product.image; // keep old image if no new one
    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // Update fields
    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.image = imagePath;

    const updated = await product.save();

    res.status(200).json({ message: "Product updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};
