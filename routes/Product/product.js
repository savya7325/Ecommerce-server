import { body, validationResult } from 'express-validator';
import { Router } from "express";
import {getAllProduct, viewProduct,deleteProduct,updateProduct} from "../../controller/product.js";
import { addProduct } from "../../controller/product.js";
import verifyToken from '../../middleware/verifyToken.js';
import isAdmin from '../../middleware/isAdmin.js';
import { checkProductOwner } from '../../MiddleWare/checkOwner.js';
import upload from "../../MiddleWare/uploadMiddleware.js";

const product = Router()

product.get('/all', getAllProduct)

product.get('/view/:id', viewProduct)   

product.post('/add', verifyToken, upload.single('image'),
   [ body('title').notEmpty().withMessage('Title is required'),
     body('price').isNumeric().withMessage('Price must be a number'),
     body('description').notEmpty().withMessage('Description is required'),
     body('category').notEmpty().withMessage('Category is required'),
    // body('image').isURL().withMessage('Image must be a valid URL')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation failed:", errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    next(); 
  }, addProduct);

product.delete('/:id', verifyToken, isAdmin, deleteProduct);

product.put('/update/:id', verifyToken, checkProductOwner, upload.single("image"),updateProduct);

export default product



