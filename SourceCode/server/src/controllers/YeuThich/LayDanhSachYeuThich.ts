import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const LayDanhSachYeuThich = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung } = req.query;
                let array = [] as any;
                const DvsItems = await knex('YEUTHICH')
                    .select('YEUTHICH.THOIGIANYEUTHICH', 'YEUTHICH.MADV', 'YEUTHICH.MAPHCN', 'YEUTHICH.MACHUCNANG', 'YEUTHICH.MAHDSD', 'YEUTHICH.MAPHIENBAN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'YEUTHICH.MADV')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                const PhItems = await knex('YEUTHICH')
                    .select('YEUTHICH.THOIGIANYEUTHICH', 'YEUTHICH.MADV', 'YEUTHICH.MAPHCN', 'YEUTHICH.MACHUCNANG', 'YEUTHICH.MAHDSD', 'YEUTHICH.MAPHIENBAN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'YEUTHICH.MAPHCN')
                    .join('CHUCNANG', 'CHUCNANG.MAPHCN', '=', 'PHANHECHUCNANG.MAPHCN')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                const CnItems = await knex('YEUTHICH')
                    .select('YEUTHICH.THOIGIANYEUTHICH', 'YEUTHICH.MADV', 'YEUTHICH.MAPHCN', 'YEUTHICH.MACHUCNANG', 'YEUTHICH.MAHDSD', 'YEUTHICH.MAPHIENBAN', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'YEUTHICH.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                const HdsdItems = await knex('YEUTHICH')
                    .select('YEUTHICH.THOIGIANYEUTHICH', 'YEUTHICH.MADV', 'YEUTHICH.MAPHCN', 'YEUTHICH.MACHUCNANG', 'YEUTHICH.MAHDSD', 'YEUTHICH.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'YEUTHICH.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                const PbHdsdItems = await knex('YEUTHICH')
                    .select('YEUTHICH.THOIGIANYEUTHICH', 'YEUTHICH.MADV', 'YEUTHICH.MAPHCN', 'YEUTHICH.MACHUCNANG', 'YEUTHICH.MAHDSD', 'YEUTHICH.MAPHIENBAN', 'PHIENBANHDSD.MAPHIENBAN', 'PHIENBANHDSD.TIEUDEPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'YEUTHICH.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                const HdsdcItems = await knex('YEUTHICH')
                    .select('YEUTHICH.THOIGIANYEUTHICH', 'YEUTHICH.MADV', 'YEUTHICH.MAPHCN', 'YEUTHICH.MACHUCNANG', 'YEUTHICH.MAHDSD', 'YEUTHICH.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'YEUTHICH.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                const PbHdsdcItems = await knex('YEUTHICH')
                    .select(
                        'YEUTHICH.THOIGIANYEUTHICH',
                        'YEUTHICH.MADV',
                        'YEUTHICH.MAPHCN',
                        'YEUTHICH.MACHUCNANG',
                        'YEUTHICH.MAHDSD',
                        'YEUTHICH.MAPHIENBAN',
                        'PHIENBANHDSD.MAPHIENBAN',
                        'PHIENBANHDSD.TIEUDEPHIENBAN',
                        'HUONGDANSUDUNG.MAHDSD',
                        'HUONGDANSUDUNG.TIEUDEHDSD',
                        'HUONGDANSUDUNG.MALOAI',
                        'DICHVUSO.MADV',
                        'DICHVUSO.TENDV'
                    )
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'YEUTHICH.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .where('YEUTHICH.MANGUOIDUNG', MaNguoiDung);
                array.push(...DvsItems, ...PhItems, ...CnItems, ...HdsdItems, ...PbHdsdItems, ...HdsdcItems, ...PbHdsdcItems);
                array.forEach((element: any) => {
                    element.THOIGIANYEUTHICH = new Date(element.THOIGIANYEUTHICH);
                });

                // Sort the array by THOIGIANYEUTHICH in descending order
                array.sort((a: any, b: any) => {
                    return b.THOIGIANYEUTHICH - a.THOIGIANYEUTHICH;
                });

                // Convert Date objects back to formatted strings
                array.forEach((element: any) => {
                    element.THOIGIANYEUTHICH = element.THOIGIANYEUTHICH.toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    });
                });


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
