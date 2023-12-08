import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const SuaHDSD = () => {
    return router.post(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaHDSD, MaChucNang, MaLoai, TieuDeHDSD } = req.body;
                const results = await knex("HUONGDANSUDUNG")
                    .update({
                        MACHUCNANG: MaChucNang,
                        MALOAI: MaLoai,
                        TIEUDEHDSD: TieuDeHDSD,
                    })
                    .where({ MAHDSD: MaHDSD });;
                if (results) {
                    await knex("HASHTAG")
                        .update({ TAGNAME: generateHashtags(TieuDeHDSD).join(' ') })
                        .where({ MAHDSD: MaHDSD });
                    res.send({
                        statusCode: 200,
                        massage: "Success",
                    });
                } else {
                    res.send({
                        statusCode: 501,
                        massage: "False",
                    });
                }
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "False"));
            }
        }
    );
};
