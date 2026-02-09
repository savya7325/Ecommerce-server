import express, { json } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/Product/product.js';
import connect from './MongoDB/Connect.js';
import userRouter from './routes/User/user.js';
import cors from "cors";


dotenv.config()

const port = process.env.PORT ||2000;

connect()

const app = express()

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5000" ], 
  credentials: true
}));

app.use(json())

app.use('/uploads', express.static('uploads'));

app.use('/user', userRouter);

app.get('/' , (req,res) =>{
    res.end("node")
})

app.get('/sample-end-point' , (req,res) =>{
    console.log(req.body,"---------->");
    
    res.end("sample response")
})

app.use('/product', productRoutes)


app.listen(port,()=>{
    console.log("server listening on",port)
})  




// app.get('/product',(req,res)=>{

//     res.json({product,message:"fetched "})
// })


// app.get('/product/view/:id',(req,res)=>{

//     const {id} = req.params
//     console.log(req.params,"-----------??")

//       const productId = parseInt(id);

//       console.log(productId)

// const singleProduct = product.find((item) => item.id === productId);
//     if (singleProduct) {
//         res.status(200).json({data: singleProduct,message:"fetched "})
//     } else {
//         res.status(404).json({data: [],message:"Product not found "})
//     }
// })



// app.delete('/product/delete/:id',(req,res)=>{

//     res.json({product,message:"fetched "})
// })