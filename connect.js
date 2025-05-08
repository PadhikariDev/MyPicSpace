
import mongoose from "mongoose";



function conenctMD(url) {
    return mongoose.connect(url);
}