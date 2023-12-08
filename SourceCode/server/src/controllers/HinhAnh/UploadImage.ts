import express, { Request, Response, NextFunction } from "express";
import { knex } from "database/knex";
import multer from 'multer';

const ApiError = require("../../api-error");
const router = express.Router();
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'src/images/' });

export const UploadImage = () => {
  return router.post(
    "/",
    upload.single('image'),
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        if (req.file) {
          const imageFile = req.file;

          // Kiểm tra xem có tệp ảnh được tải lên hay không
          if (!imageFile) {
            return res.status(400).json({ message: 'Không tìm thấy tệp ảnh' });
          }

          // Đường dẫn thư mục lưu trữ ảnh
          const uploadPath = 'src/images/';

          // Đảm bảo thư mục lưu trữ tồn tại
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }

          // Tạo đường dẫn mới cho tệp ảnh
          const fileName = Date.now() + '-' + imageFile.originalname;
          const filePath = path.join(uploadPath, fileName);

          // Di chuyển tệp ảnh tải lên vào đường dẫn mới
          fs.renameSync(imageFile.path, filePath);

          const imagePath = `${fileName}`;
          res.send({
            statusCode: 200,
            message: 'Success',
            imageUrl: imagePath,
          });
        } else {
          res.send({
            statusCode: 400,
            message: 'False',
          });
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
