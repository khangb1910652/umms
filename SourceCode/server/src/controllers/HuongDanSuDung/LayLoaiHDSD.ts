import express from "express";
import { knex} from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayLoaiHDSD = () => {
  return router.get(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const results = await knex("LOAIHDSD").select("*");
        res.send(results)
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
