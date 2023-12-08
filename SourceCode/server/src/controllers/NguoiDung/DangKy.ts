import express from "express";
import { knex} from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();
import crypto from "crypto";

export const DangKy = () => {
  return router.post(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenDangNhap, TenHienThi, MatKhau, SoDienThoai, Email, HinhAnh } =
          req.body;
        const hashedPassword = crypto
          .createHash("sha256")
          .update(MatKhau)
          .digest("hex");
        const results = await knex("NGUOIDUNG").insert([
          {
            TENDANGNHAP: TenDangNhap,
            TENHIENTHI: TenHienThi,
            MATKHAU: hashedPassword,
            EMAIL: Email,
            SODIENTHOAI: SoDienThoai,
            HINHANH: HinhAnh,
            QUYEN: "EndUser",
          },
        ]);
        if (results){}
        res.send({
          statusCode: 200,
          massage: "Success",
        });
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "False"));
      }
    }
  );
};
