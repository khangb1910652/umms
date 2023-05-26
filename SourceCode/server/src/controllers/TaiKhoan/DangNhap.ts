import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();
import crypto from "crypto";

export const DangNhap = () => {
  return router.get(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenDangNhap, MatKhau } = req.query;
        let TaiKhoan = {
          MaNguoiDung: Number,
          TenDangNhap: "",
          TenHienThi: "",
          SoDienThoai: "",
          Email: Number,
          Quyen: ""
        };
        const hashedPassword = crypto
          .createHash("sha256")
          .update(String(MatKhau))
          .digest("hex");
        const results = await knex("NGUOIDUNG")
          .select("*")
          .where({ TENDANGNHAP: TenDangNhap, MATKHAU: hashedPassword })
          .first();
        if (results) {
          TaiKhoan.MaNguoiDung = results.MANGUOIDUNG;
          TaiKhoan.TenDangNhap = results.TENDANGNHAP;
          TaiKhoan.TenHienThi = results.TENHIENTHI;
          TaiKhoan.SoDienThoai = results.SODIENTHOAI;
          TaiKhoan.Email = results.EMAIL;
          TaiKhoan.Quyen = results.QUYEN;
          res.send(TaiKhoan);
        } else {
          res.send(false);
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
