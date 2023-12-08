import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const ThemChucNang = () => {
  return router.post(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { MaDV, MaPHCN, TenChucNang } = req.body;
        const [MACHUCNANG] = await knex("CHUCNANG").insert({
          MADV: MaDV,
          MAPHCN: MaPHCN,
          TENCHUCNANG: TenChucNang,
        }).returning("MACHUCNANG");
        if (MACHUCNANG) {
          await knex("HASHTAG").insert([
            {
              TAGNAME: generateHashtags(TenChucNang).join(' '),
              MACHUCNANG: MACHUCNANG.MACHUCNANG,
            },
          ]);
          res.send({
            statusCode: 200,
            message: "Success",
          });
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "False"));
      }
    }
  );
};
