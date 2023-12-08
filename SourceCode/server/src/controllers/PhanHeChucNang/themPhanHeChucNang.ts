import express from "express";
import { knex} from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const ThemPhanHeChucNang = () => {
  return router.post(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenPHCN } = req.body;

        const [MAPHCN] = await knex("PHANHECHUCNANG").insert({
          TENPHCN: TenPHCN,
        }).returning("MAPHCN");
        if (MAPHCN) {
          await knex("HASHTAG").insert([
            {
              TAGNAME: generateHashtags(TenPHCN).join(' '),
              MAPHCN: MAPHCN.MAPHCN,
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
