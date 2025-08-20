import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
         description:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        isDeleted:{
          type: Boolean,
          default: false
        },
        auth:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;


