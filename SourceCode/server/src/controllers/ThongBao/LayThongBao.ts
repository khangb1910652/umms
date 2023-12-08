import express from "express";
import { knex } from "database/knex";
import moment from "moment";

const ApiError = require("../../api-error");
const router = express.Router();

export const LayThongBao = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { Quyen, MaNguoiDung } = req.query;
                const fourWeeksAgo = new Date();
                fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
                const currentDateTime = new Date();
                let array = [] as any;
                const DvsItems = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'BINHLUAN.MADV')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const DvsItemsTraLoi = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'BINHLUAN.MADV')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);
                const PhItems = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'BINHLUAN.MAPHCN')
                    .join('CHUCNANG', 'CHUCNANG.MAPHCN', '=', 'PHANHECHUCNANG.MAPHCN')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const PhItemsTraLoi = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'BINHLUAN.MAPHCN')
                    .join('CHUCNANG', 'CHUCNANG.MAPHCN', '=', 'PHANHECHUCNANG.MAPHCN')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);
                const CnItems = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'BINHLUAN.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const CnItemsTraLoi = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'BINHLUAN.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);
                const HdsdItems = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'BINHLUAN.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const HdsdItemsTraLoi = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'BINHLUAN.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);
                const PbHdsdItems = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'PHIENBANHDSD.MAPHIENBAN', 'PHIENBANHDSD.TIEUDEPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'BINHLUAN.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const PbHdsdItemsTraLoi = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'PHIENBANHDSD.MAPHIENBAN', 'PHIENBANHDSD.TIEUDEPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'BINHLUAN.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
                    .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);
                const HdsdcItems = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'BINHLUAN.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const HdsdcItemsTraLoi = await knex('BINHLUAN')
                    .select('BINHLUAN.THONGBAO', 'BINHLUAN.TRALOI', 'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI', 'BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'DICHVUSO.MADV', 'DICHVUSO.TENDV')
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'BINHLUAN.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);
                const PbHdsdcItems = await knex('BINHLUAN')
                    .select(
                        'BINHLUAN.THONGBAO', 
                        'BINHLUAN.TRALOI',
                        'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI',
                        'BINHLUAN.THOIGIANBINHLUAN',
                        'BINHLUAN.MADV',
                        'BINHLUAN.MAPHCN',
                        'BINHLUAN.MACHUCNANG',
                        'BINHLUAN.MAHDSD',
                        'BINHLUAN.MAPHIENBAN',
                        'PHIENBANHDSD.MAPHIENBAN',
                        'PHIENBANHDSD.TIEUDEPHIENBAN',
                        'HUONGDANSUDUNG.MAHDSD',
                        'HUONGDANSUDUNG.TIEUDEHDSD',
                        'HUONGDANSUDUNG.MALOAI',
                        'DICHVUSO.MADV',
                        'DICHVUSO.TENDV'
                    )
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'BINHLUAN.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .whereNull('BINHLUAN.TRALOI')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                const PbHdsdcItemsTraLoi = await knex('BINHLUAN')
                    .select(
                        'BINHLUAN.THONGBAO', 
                        'BINHLUAN.TRALOI',
                        'BINHLUAN.MABL', 'BINHLUAN.MANGUOIDUNG', 'NGUOIDUNG.HINHANH', 'NGUOIDUNG.TENHIENTHI',
                        'BINHLUAN.THOIGIANBINHLUAN',
                        'BINHLUAN.MADV',
                        'BINHLUAN.MAPHCN',
                        'BINHLUAN.MACHUCNANG',
                        'BINHLUAN.MAHDSD',
                        'BINHLUAN.MAPHIENBAN',
                        'PHIENBANHDSD.MAPHIENBAN',
                        'PHIENBANHDSD.TIEUDEPHIENBAN',
                        'HUONGDANSUDUNG.MAHDSD',
                        'HUONGDANSUDUNG.TIEUDEHDSD',
                        'HUONGDANSUDUNG.MALOAI',
                        'DICHVUSO.MADV',
                        'DICHVUSO.TENDV'
                    )
                    .join(
                        "NGUOIDUNG",
                        "NGUOIDUNG.MANGUOIDUNG",
                        "=",
                        "BINHLUAN.MANGUOIDUNG"
                    )
                    .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'BINHLUAN.MAPHIENBAN')
                    .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
                    .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
                    .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'HUONGDANSUDUNG.MADV')
                    .whereBetween('BINHLUAN.THOIGIANBINHLUAN', [fourWeeksAgo, currentDateTime])
                    .whereNotNull('BINHLUAN.TRALOI')
                    .andWhere("TRALOIMAND", MaNguoiDung);

                if (Quyen === 'Admin' || Quyen === 'AdminService') {
                    array.push(...DvsItems, ...PhItems, ...CnItems, ...HdsdItems, ...PbHdsdItems, ...HdsdcItems, ...PbHdsdcItems);

                }
                array.push(...DvsItemsTraLoi, ...PhItemsTraLoi, ...CnItemsTraLoi, ...HdsdItemsTraLoi, ...PbHdsdItemsTraLoi, ...HdsdcItemsTraLoi, ...PbHdsdcItemsTraLoi);
                array.forEach((element: any) => {
                    element.THOIGIANBINHLUAN = new Date(element.THOIGIANBINHLUAN);
                });
                // Sort the array by THOIGIANBINHLUAN in descending order
                array.sort((a: any, b: any) => {
                    return b.THOIGIANBINHLUAN - a.THOIGIANBINHLUAN;
                });

                // Convert Date objects back to formatted strings
                array.forEach((element: any) => {
                    element.THOIGIANBINHLUAN = element.THOIGIANBINHLUAN.toLocaleString(
                        "vi-VN",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }
                    );
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
