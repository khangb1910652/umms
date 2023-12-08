import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const ThemDichVuSo = () => {
  return router.post(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { TenDV } = req.body;
        
        // Thực hiện câu lệnh insert và trả về MaDV vừa thêm
        const [MADV] = await knex("DICHVUSO").insert({
          TENDV: TenDV,
        }).returning("MADV");
        if (MADV) {
          const [MAHDSD] = await knex("HUONGDANSUDUNG").insert([
            {
              TIEUDEHDSD: "Hướng dẫn sử dụng chung của " + TenDV,
              MADV: MADV.MADV,
            },
          ]).returning("MAHDSD");
          await knex("HASHTAG").insert([
            {
              TAGNAME: generateHashtags(TenDV).join(' '),
              MADV: MADV.MADV,
            },
          ]);
          if (MAHDSD) {
            await knex("HASHTAG").insert([
              {
                TAGNAME: generateHashtags("Hướng dẫn sử dụng chung của " + TenDV).join(' '),
                MAHDSD: MAHDSD.MAHDSD,
              },
            ]);
            res.send({
              statusCode: 200,
              message: "Success",
            });
          }
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "False"));
      }
    }
  );
};
