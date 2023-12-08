import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();
import crypto from "crypto";
import jwt from "jsonwebtoken";

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
          token: ""
        };
        const hashedPassword = crypto
          .createHash("sha256")
          .update(String(MatKhau))
          .digest("hex");
          const results = await knex("NGUOIDUNG")
          .select("*")
          .whereRaw("LOWER(TENDANGNHAP) = LOWER(?)", TenDangNhap)
          .andWhere("MATKHAU", hashedPassword)
          .first();
        if (results) {
          TaiKhoan.MaNguoiDung = results.MANGUOIDUNG;
          const tokenPayload = {
            MaNguoiDung: results.MANGUOIDUNG,
            Quyen: results.QUYEN,
          };
          const token = jwt.sign(tokenPayload, "ThucTap2023_UMMS", {
            expiresIn: "24h" // Thời gian hết hạn của token, ví dụ: 1 giờ
          });
          TaiKhoan.token = token;
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
