import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/post-process";

declare global {
    var mongoose: any;
}
let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDB() {
    if (cached.conn) {
        console.log("MongoDB was already connected");
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        }
	
	mongoose.set("strictQuery", false);	
        cached.promise = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("MongoDB connected successfully");
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectToDB;
