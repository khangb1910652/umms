import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const KiemTraTonTaiPbHDSD = () => {
    return router.get(
        "/",

        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { TieuDePhienBan, MaHDSD } = req.query;
                const results = await knex
                    .select()
                    .from("PHIENBANHDSD")
                    .join(
                        "CHITIETPHIENBANHDSD",
                        "CHITIETPHIENBANHDSD.MAPHIENBAN",
                        "=",
                        "PHIENBANHDSD.MAPHIENBAN"
                    )
                    .join(
                        "HUONGDANSUDUNG",
                        "CHITIETPHIENBANHDSD.MAHDSD",
                        "=",
                        "HUONGDANSUDUNG.MAHDSD"
                    )
                    .where("CHITIETPHIENBANHDSD.MAHDSD", MaHDSD)
                    .whereRaw("REPLACE(LOWER(PHIENBANHDSD.TIEUDEPHIENBAN), ' ', '') LIKE REPLACE(LOWER(?), ' ', '')", TieuDePhienBan)
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
