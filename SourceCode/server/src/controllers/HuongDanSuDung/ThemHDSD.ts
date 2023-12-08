import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const ThemHDSD = () => {
    return router.post(
        "/",

        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaChucNang, MaLoai, TieuDeHDSD } = req.body;
                const [MAHDSD] = await knex("HUONGDANSUDUNG").insert({
                        MACHUCNANG: MaChucNang,
                        MALOAI: MaLoai,
                        TIEUDEHDSD: TieuDeHDSD,
                  }).returning("MAHDSD");
                  if (MAHDSD) {
                    await knex("HASHTAG").insert([
                      {
                        TAGNAME: generateHashtags(TieuDeHDSD).join(' '),
                        MAHDSD: MAHDSD.MAHDSD,
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
