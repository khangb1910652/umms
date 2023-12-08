import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const KiemTraTonTaiHDSD = () => {
    return router.get(
        "/",

        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { TieuDeHDSD, MaDV, MaPHCN, MaChucNang, MaLoai } = req.query;
                const results = await knex
                    .select()
                    .from("HUONGDANSUDUNG")
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('LOAIHDSD', 'LOAIHDSD.MALOAI', '=', 'HUONGDANSUDUNG.MALOAI')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .where('DICHVUSO.MADV', '=', MaDV)
                    .where('PHANHECHUCNANG.MAPHCN', '=', MaPHCN)
                    .where('CHUCNANG.MACHUCNANG', '=', MaChucNang)
                    .where('LOAIHDSD.MALOAI', '=', MaLoai)
                    .whereRaw("REPLACE(LOWER(TIEUDEHDSD), ' ', '') LIKE REPLACE(LOWER(?), ' ', '')", TieuDeHDSD)
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
