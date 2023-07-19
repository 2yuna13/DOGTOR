import multer from "multer";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("./imgs/vets")) {
        fs.mkdirSync("./imgs/vets");
      }
      cb(null, "./imgs/vets");
    },
    filename: function (req, file, cb) {
      const encodedFileName =
        Date.now() + "-" + encodeURIComponent(file.originalname);
      cb(null, encodedFileName);
    },
  }),
});

export default upload;
