import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const KiemTraTonTaiDichVuSo = () => {
  return router.get(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenDV } = req.query;
        const results = await knex("DICHVUSO")
          .select("*")
          .whereRaw("REPLACE(LOWER(TENDV), ' ', '') LIKE REPLACE(LOWER(?), ' ', '')", TenDV)
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
