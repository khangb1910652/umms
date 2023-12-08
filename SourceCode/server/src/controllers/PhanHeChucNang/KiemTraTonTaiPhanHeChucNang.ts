import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const KiemTraTonTaiPhanHeChucNang = () => {
  return router.get(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenPHCN } = req.query;
        const results = await knex("PHANHECHUCNANG")
          .select("*")
          .whereRaw("REPLACE(LOWER(TENPHCN), ' ', '') LIKE REPLACE(LOWER(?), ' ', '')", TenPHCN)
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
