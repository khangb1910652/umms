import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const ThemHuongDanSuDungChung = () => {
    return router.post(
        "/",

        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { TieuDePhienBan, MoTa, DuongDanFile, MaDV, MaNguoiDung } = req.body;
                const currentdate = new Date();
                const [MAHDSD] = await knex.raw(`
                    SELECT MAHDSD
                    FROM HUONGDANSUDUNG
                    WHERE MADV = ${MaDV}
                `);
                const [MAPHIENBAN] = await knex("PHIENBANHDSD").insert(
                    {
                        TIEUDEPHIENBAN: TieuDePhienBan,
                    }).returning("MAPHIENBAN");
                if (MAPHIENBAN) {
                    await knex("CHITIETPHIENBANHDSD").insert(
                        {
                            MOTA: MoTa,
                            DUONGDANFILE: DuongDanFile,
                            MANGUOIDUNG: MaNguoiDung,
                            MAHDSD: MAHDSD.MAHDSD,
                            MAPHIENBAN: MAPHIENBAN.MAPHIENBAN,
                            THOIGIANTAO: currentdate,
                            TENTIEUDEPB: TieuDePhienBan,
                        })
                    await knex("HASHTAG").insert([
                        {
                            TAGNAME: generateHashtags(TieuDePhienBan).join(' '),
                            MAPHIENBAN: MAPHIENBAN.MAPHIENBAN,
                        },
                    ]);
                    res.send({
                        statusCode: 200,
                        massage: "Success",
                    });
                };
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "False"));
            }
        }
    );
};
