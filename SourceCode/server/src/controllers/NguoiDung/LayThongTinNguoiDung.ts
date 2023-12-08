import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();
import { authenticateToken } from "./middleware";

export const LayThongTinNguoiDung = () => {
  return router.get(
    "/",
    authenticateToken,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { MaNguoiDung } = req.query;
        let TaiKhoan = {
          TenDangNhap: "",
          TenHienThi: "",
          SoDienThoai: "",
          Email: "",
          HinhAnh: "",
          Quyen: "",
        };
        const results = await knex("NGUOIDUNG")
          .select("*")
          .where({ MANGUOIDUNG: MaNguoiDung })
          .first();
        if (results) {
          TaiKhoan.TenDangNhap = results.TENDANGNHAP;
          TaiKhoan.TenHienThi = results.TENHIENTHI;
          TaiKhoan.SoDienThoai = results.SODIENTHOAI;
          TaiKhoan.Email = results.EMAIL;
          TaiKhoan.HinhAnh = results.HINHANH;
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
