import Product from '../models/Product.js';

export const checkProductOwner = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.auth.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to edit this product' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};