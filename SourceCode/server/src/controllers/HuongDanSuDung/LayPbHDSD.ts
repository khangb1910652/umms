import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayPbHDSD = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaHDSD } = req.query;
                const results = await knex.raw(`
                    SELECT *
                    FROM PHIENBANHDSD
                    JOIN CHITIETPHIENBANHDSD ON CHITIETPHIENBANHDSD.MAPHIENBAN = PHIENBANHDSD.MAPHIENBAN
                    JOIN HUONGDANSUDUNG ON CHITIETPHIENBANHDSD.MAHDSD = HUONGDANSUDUNG.MAHDSD
                    WHERE HUONGDANSUDUNG.MAHDSD = ${MaHDSD}
                    AND CHITIETPHIENBANHDSD.THOIGIANTAO = (
                        SELECT MAX(CHITIETPHIENBANHDSD.THOIGIANTAO)
                        FROM CHITIETPHIENBANHDSD
                        WHERE CHITIETPHIENBANHDSD.MAPHIENBAN = PHIENBANHDSD.MAPHIENBAN
                        AND CHITIETPHIENBANHDSD.MAHDSD = HUONGDANSUDUNG.MAHDSD
                    )

                    ORDER BY CHITIETPHIENBANHDSD.THOIGIANTAO DESC
                `);
                res.send(results)
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
