import mongoose from "mongoose";
import config from "./config.js";

(async() => {
    try {
        mongoose.set('strictQuery', false)
        const db = await mongoose.connect(config.mongodb_uri)
        console.log('DB conected to', db.connection.name)
    } catch (error) {       
        console.log(error)
    }
}
)()

