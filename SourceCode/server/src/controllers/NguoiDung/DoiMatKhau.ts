import express from "express";
import { knex } from "database/knex";
import { authenticateToken } from "./middleware";
import crypto from "crypto";

const ApiError = require("../../api-error");
const router = express.Router();

export const DoiMatKhau = () => {
  return router.post(
    "/",
    authenticateToken,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { MatKhauHienTai, MatKhauMoi, MaNguoiDung} = req.body;
        const hashedPasswordHienTai = crypto
          .createHash("sha256")
          .update(String(MatKhauHienTai))
          .digest("hex");
          const hashedPasswordMoi = crypto
          .createHash("sha256")
          .update(String(MatKhauMoi))
          .digest("hex");
        const results = await knex("NGUOIDUNG")
          .update({ MATKHAU: hashedPasswordMoi })
          .where({ MANGUOIDUNG: MaNguoiDung, MATKHAU: hashedPasswordHienTai });
        if(results){
            res.send({
                statusCode: 200,
                massage: "Success",
              });
        }else{
            res.send({
                statusCode: 501,
                massage: "False",
              });
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
