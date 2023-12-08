import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayHDSDTheoChucNang = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaChucNang, MaLoai } = req.query;
                let results : any;
                if(MaChucNang === '-1') {
                    results = await knex.raw(`
                        SELECT *
                        FROM HUONGDANSUDUNG
                        JOIN CHUCNANG ON CHUCNANG.MACHUCNANG = HUONGDANSUDUNG.MACHUCNANG
                        JOIN PHANHECHUCNANG ON CHUCNANG.MAPHCN = PHANHECHUCNANG.MAPHCN
                        JOIN DICHVUSO ON CHUCNANG.MADV = DICHVUSO.MADV
                        WHERE HUONGDANSUDUNG.MALOAI = ${MaLoai}
                    `)
                } else if(MaLoai === '-1') {
                    results = await knex.raw(`
                        SELECT *
                        FROM HUONGDANSUDUNG
                        JOIN CHUCNANG ON CHUCNANG.MACHUCNANG = HUONGDANSUDUNG.MACHUCNANG
                        JOIN PHANHECHUCNANG ON CHUCNANG.MAPHCN = PHANHECHUCNANG.MAPHCN
                        JOIN DICHVUSO ON CHUCNANG.MADV = DICHVUSO.MADV
                        WHERE CHUCNANG.MACHUCNANG = ${MaChucNang}
                    `)
                } else {
                    results = await knex.raw(`
                        SELECT *
                        FROM HUONGDANSUDUNG
                        JOIN CHUCNANG ON CHUCNANG.MACHUCNANG = HUONGDANSUDUNG.MACHUCNANG
                        JOIN PHANHECHUCNANG ON CHUCNANG.MAPHCN = PHANHECHUCNANG.MAPHCN
                        JOIN DICHVUSO ON CHUCNANG.MADV = DICHVUSO.MADV
                        WHERE CHUCNANG.MACHUCNANG = ${MaChucNang} AND HUONGDANSUDUNG.MALOAI = ${MaLoai}
                    `)
                }
                
                res.send(results)
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
