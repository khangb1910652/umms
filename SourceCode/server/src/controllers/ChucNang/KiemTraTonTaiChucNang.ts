import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const KiemTraTonTaiChucNang = () => {
  return router.get(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenChucNang, MaDV, MaPHCN } = req.query;
        const results = await knex("CHUCNANG")
          .select("*")
          .where({ MADV: MaDV, MAPHCN: MaPHCN })
          .whereRaw("REPLACE(LOWER(TENCHUCNANG), ' ', '') LIKE REPLACE(LOWER(?), ' ', '')", TenChucNang)
          .first();
        if (results) {
          res.send(true);
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
