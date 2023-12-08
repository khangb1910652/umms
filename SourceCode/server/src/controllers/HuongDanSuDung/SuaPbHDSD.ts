import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const SuaPbHDSD = () => {
    return router.post(
        "/",

        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaPhienBan, TieuDePhienBan, MoTa, DuongDanFile, MaHDSD, MaNguoiDung } = req.body;
                const currentdate = new Date();
                const results = await knex("PHIENBANHDSD")
                    .update({ TIEUDEPHIENBAN: TieuDePhienBan, })
                    .where({ MAPHIENBAN: MaPhienBan });
                if (results) {
                    await knex("CHITIETPHIENBANHDSD").insert(
                        {
                            MOTA: MoTa,
                            DUONGDANFILE: DuongDanFile,
                            MANGUOIDUNG: MaNguoiDung,
                            MAHDSD: MaHDSD,
                            MAPHIENBAN: MaPhienBan,
                            THOIGIANTAO: currentdate,
                            TENTIEUDEPB: TieuDePhienBan,
                        });
                    await knex("HASHTAG")
                        .update({ TAGNAME: generateHashtags(TieuDePhienBan).join(' ') })
                        .where({ MAPHIENBAN: MaPhienBan, });
                    res.send({
                        statusCode: 200,
                        massage: "Success",
                    });
                } else {
                    res.send({
                        statusCode: 501,
                        massage: "False",
                    });
                };
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "False"));
            }
        }
    );
};
