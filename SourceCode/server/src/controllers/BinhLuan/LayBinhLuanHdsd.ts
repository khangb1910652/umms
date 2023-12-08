import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const LayBinhLuanHdsd = () => {
  return router.get(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { MaHDSD } = req.query;
        let array = [] as any;
        const HdsdItems = await knex("BINHLUAN")
          .select("*")
          .join(
            "HUONGDANSUDUNG",
            "HUONGDANSUDUNG.MAHDSD",
            "=",
            "BINHLUAN.MAHDSD"
          )
          .join(
            "NGUOIDUNG",
            "NGUOIDUNG.MANGUOIDUNG",
            "=",
            "BINHLUAN.MANGUOIDUNG"
          )
          .join(
            "CHUCNANG",
            "CHUCNANG.MACHUCNANG",
            "=",
            "HUONGDANSUDUNG.MACHUCNANG"
          )
          .join("DICHVUSO", "DICHVUSO.MADV", "=", "CHUCNANG.MADV")
          .join(
            "PHANHECHUCNANG",
            "PHANHECHUCNANG.MAPHCN",
            "=",
            "CHUCNANG.MAPHCN"
          )
          .where("BINHLUAN.MAHDSD", MaHDSD)
          .andWhere("BINHLUAN.TRALOI", null);
        for (const element of HdsdItems) {
          const TraLoiHdsdItems = await knex("BINHLUAN")
            .select("*")
            .join(
              "HUONGDANSUDUNG",
              "HUONGDANSUDUNG.MAHDSD",
              "=",
              "BINHLUAN.MAHDSD"
            )
            .join(
              "NGUOIDUNG",
              "NGUOIDUNG.MANGUOIDUNG",
              "=",
              "BINHLUAN.MANGUOIDUNG"
            )
            .join(
              "CHUCNANG",
              "CHUCNANG.MACHUCNANG",
              "=",
              "HUONGDANSUDUNG.MACHUCNANG"
            )
            .join("DICHVUSO", "DICHVUSO.MADV", "=", "CHUCNANG.MADV")
            .join(
              "PHANHECHUCNANG",
              "PHANHECHUCNANG.MAPHCN",
              "=",
              "CHUCNANG.MAPHCN"
            )
            .where("BINHLUAN.MAHDSD", MaHDSD)
            .andWhere("BINHLUAN.TRALOI", element.MABL);
          element.TraLoiBL = TraLoiHdsdItems;
        }

        // const PbHdsdItems = await knex('BINHLUAN')
        //     .select('BINHLUAN.THOIGIANBINHLUAN', 'BINHLUAN.MADV', 'BINHLUAN.MAPHCN', 'BINHLUAN.MACHUCNANG', 'BINHLUAN.MAHDSD', 'BINHLUAN.MAPHIENBAN', 'PHIENBANHDSD.MAPHIENBAN', 'PHIENBANHDSD.TIEUDEPHIENBAN', 'HUONGDANSUDUNG.MAHDSD', 'HUONGDANSUDUNG.TIEUDEHDSD', 'HUONGDANSUDUNG.MALOAI', 'CHUCNANG.MACHUCNANG', 'CHUCNANG.TENCHUCNANG', 'DICHVUSO.MADV', 'DICHVUSO.TENDV', 'CHUCNANG.MAPHCN', 'PHANHECHUCNANG.MAPHCN', 'PHANHECHUCNANG.TENPHCN')
        //     .join('PHIENBANHDSD', 'PHIENBANHDSD.MAPHIENBAN', '=', 'BINHLUAN.MAPHIENBAN')
        //     .join('CHITIETPHIENBANHDSD', 'CHITIETPHIENBANHDSD.MAPHIENBAN', '=', 'PHIENBANHDSD.MAPHIENBAN')
        //     .join('HUONGDANSUDUNG', 'HUONGDANSUDUNG.MAHDSD', '=', 'CHITIETPHIENBANHDSD.MAHDSD')
        //     .join('CHUCNANG', 'CHUCNANG.MACHUCNANG', '=', 'HUONGDANSUDUNG.MACHUCNANG')
        //     .join('DICHVUSO', 'DICHVUSO.MADV', '=', 'CHUCNANG.MADV')
        //     .join('PHANHECHUCNANG', 'PHANHECHUCNANG.MAPHCN', '=', 'CHUCNANG.MAPHCN')
        //     .where('BINHLUAN.MANGUOIDUNG', MaNguoiDung);
        array.push(...HdsdItems);
        array.forEach((element: any) => {
          element.THOIGIANBINHLUAN = new Date(element.THOIGIANBINHLUAN);
        });

        // Sort the array by THOIGIANBINHLUAN in descending order
        array.sort((a: any, b: any) => {
          return a.THOIGIANBINHLUAN - b.THOIGIANBINHLUAN;
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
          element.TraLoiBL.sort((a: any, b: any) => {
            return a.THOIGIANBINHLUAN - b.THOIGIANBINHLUAN;
          });
          element.TraLoiBL.forEach((item: any) => {
            item.THOIGIANBINHLUAN = item.THOIGIANBINHLUAN.toLocaleString(
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
