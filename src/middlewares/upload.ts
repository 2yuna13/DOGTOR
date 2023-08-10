import multer from "multer";
import fs from "fs";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const fieldName = file.fieldname; // 필드명 가져오기
      const folderPath = `./imgs/${fieldName}`;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

export default upload;
