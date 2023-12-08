import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayQuyenDichVuSo = () => {
  return router.get(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenDangNhap } = req.query;
        const results = await knex("PHANQUYEN")
          .select("DICHVUSO.MADV", "DICHVUSO.TENDV")
          .join("DICHVUSO", "PHANQUYEN.MADV", "DICHVUSO.MADV")
          .join("NGUOIDUNG", "NGUOIDUNG.MANGUOIDUNG", "PHANQUYEN.MANGUOIDUNG")
          .where({ TENDANGNHAP: TenDangNhap });
        res.send(results)
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
