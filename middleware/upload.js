import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Correct path to the 'uploads' folder
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname; //gives the new name to the files uploading in the device
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: diskStorage });

export default upload;
