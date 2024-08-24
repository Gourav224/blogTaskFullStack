import multer from "multer";
import path from "path";

// Set storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/pic")); // Use path.join for cross-platform compatibility
    },
    filename: (req, file, cb) => {
        // Use a unique filename for each upload
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

// Create multer instance with storage configuration
export const upload = multer({ storage });
