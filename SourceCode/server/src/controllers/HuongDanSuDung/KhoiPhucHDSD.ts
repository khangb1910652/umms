import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();
const moment = require('moment');
require('moment-timezone');

export const KhoiPhucHDSD = () => {
    return router.post(
        "/",

        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaPhienBan, TieuDePhienBan, MaHDSD, ThoiGianTao} = req.body;         
                const formattedDate = moment.utc(ThoiGianTao).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS');
                const results = await knex("PHIENBANHDSD")
                    .update({ TIEUDEPHIENBAN: TieuDePhienBan, })
                    .where({ MAPHIENBAN: MaPhienBan });
                if (results) {
                    await knex("CHITIETPHIENBANHDSD").update(
                        {
                            REVERT: 'false'
                        }).where({ MAPHIENBAN: MaPhienBan , MAHDSD: MaHDSD});
                    await knex('CHITIETPHIENBANHDSD')
                        .update({ REVERT: 'true' })
                        .where({
                          MAPHIENBAN: MaPhienBan,
                          MAHDSD: MaHDSD,
                          THOIGIANTAO: knex.raw(`TIMESTAMP '${formattedDate}'`),
                        });
                };
                res.send({
                    statusCode: 200,
                    massage: "Success",
                });
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "False"));
            }
        }
    );
};
