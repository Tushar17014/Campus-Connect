import multer from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/attendanceRequestImages')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
    }
});

const proofStorage = multer.memoryStorage();

const uploadImage = multer({storage: diskStorage});
const uploadProof = multer({storage: proofStorage});
export {uploadImage, uploadProof};