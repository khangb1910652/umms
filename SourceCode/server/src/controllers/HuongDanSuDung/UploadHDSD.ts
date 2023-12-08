import express, { Request, Response, NextFunction } from "express";
import multer from 'multer';
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const upload = multer({ dest: 'src/HDSD/' });

export const UploadHDSD = () => {
  const router = express.Router();

  router.post(
    "/",
    upload.single('HDSD'),
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        if (req.file) {
          const hdsdFile = req.file;

          // Kiểm tra xem có tệp ảnh được tải lên hay không
          if (!hdsdFile) {
            return res.status(400).json({ message: 'Không tìm thấy tệp' });
          }

          // Đường dẫn thư mục lưu trữ ảnh
          const uploadPath = 'src/HDSD/';

          // Đảm bảo thư mục lưu trữ tồn tại
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }

          // Tạo đường dẫn mới cho tệp ảnh
          const fileName = Date.now() + '-' + hdsdFile.originalname;
          const filePath = path.join(uploadPath, fileName);

          // Di chuyển tệp ảnh tải lên vào đường dẫn mới
          fs.renameSync(hdsdFile.path, filePath);

          // Kiểm tra định dạng tệp tin
          const fileExtension = path.extname(fileName);
          if (fileExtension === '.doc' || fileExtension === '.docx' || fileExtension === '.xls' ||
            fileExtension === '.xlsx' || fileExtension === '.pptx' || fileExtension === '.ppt') {

            // Chuyển đổi tệp sang PDF bằng LibreOffice
            const command = `soffice --headless --convert-to pdf --outdir "${uploadPath}" "${filePath}"`;
            await exec(command);

            // Xoá tệp nguồn không cần thiết
            // fs.unlinkSync(filePath);
          }
          res.send({
            statusCode: 200,
            message: 'Success',
            hdsdUrl: fileName,
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

  return router;
};
