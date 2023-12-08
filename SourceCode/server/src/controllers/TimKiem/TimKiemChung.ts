import express from "express";
import { knex } from "database/knex";
import { generateHashtags } from "controllers/TimKiem/generateHashtags"

const ApiError = require("../../api-error");
const router = express.Router();
const nlp = require('compromise');

export const TimKiemChung = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { search } = req.query;

                let array = [] as any;
                const DvsItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HASHTAG.MADV')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                const PhItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'HASHTAG.MAPHCN')
                    .join('CHUCNANG', 'CHUCNANG.MAPHCN', '=', 'PHANHECHUCNANG.MAPHCN')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                const CnItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HASHTAG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                const HdsdItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'HASHTAG.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                const PbHdsdItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'PHIENBANHDSD.MAPHIENBAN', 'PHIENBANHDSD.TIEUDEPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN')
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'HASHTAG.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                const HdsdcItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'HASHTAG.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                const PbHdsdcItems = await knex('HASHTAG')
                    .select('HASHTAG.MADV', 'HASHTAG.MAPHCN', 'HASHTAG.MACHUCNANG', 'HASHTAG.MAHDSD', 'HASHTAG.MAPHIENBAN', 'PHIENBANHDSD.MAPHIENBAN', 'PHIENBANHDSD.TIEUDEPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'HASHTAG.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .whereRaw("LOWER(TAGNAME) like LOWER('%'||?||'%')", generateHashtags(search).join('%'));
                array.push(...DvsItems, ...PhItems, ...CnItems, ...HdsdItems, ...PbHdsdItems, ...HdsdcItems, ...PbHdsdcItems);
                if (array.length > 0) {
                    res.send(array);
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
