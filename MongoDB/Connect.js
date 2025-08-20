import mongoose from "mongoose"

const connect = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected")
    } catch (error) {
        console.log(error ,"error declared")
    }
}
export default connect