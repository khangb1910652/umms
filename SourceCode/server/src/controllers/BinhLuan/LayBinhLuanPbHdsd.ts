import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const LayBinhLuanPbHdsd = () => {
  return router.get(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { MaPhienBan } = req.query;
        let array = [] as any;
        const PbHdsdItems = await knex("BINHLUAN")
          .select("*")
          .join(
            "PHIENBANHDSD",
            "PHIENBANHDSD.MAPHIENBAN",
            "=",
            "BINHLUAN.MAPHIENBAN"
          )
          .join(
            "NGUOIDUNG",
            "NGUOIDUNG.MANGUOIDUNG",
            "=",
            "BINHLUAN.MANGUOIDUNG"
          )
          .join(
            "CHITIETPHIENBANHDSD",
            "CHITIETPHIENBANHDSD.MAPHIENBAN",
            "=",
            "PHIENBANHDSD.MAPHIENBAN"
          )
          .join(
            "HUONGDANSUDUNG",
            "HUONGDANSUDUNG.MAHDSD",
            "=",
            "CHITIETPHIENBANHDSD.MAHDSD"
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
          .where("BINHLUAN.MAPHIENBAN", MaPhienBan)
          .andWhere("BINHLUAN.TRALOI", null);
        for (const element of PbHdsdItems) {
          const TraLoiPbHdsdItems = await knex("BINHLUAN")
            .select("*")
            .join(
              "PHIENBANHDSD",
              "PHIENBANHDSD.MAPHIENBAN",
              "=",
              "BINHLUAN.MAPHIENBAN"
            )
            .join(
              "NGUOIDUNG",
              "NGUOIDUNG.MANGUOIDUNG",
              "=",
              "BINHLUAN.MANGUOIDUNG"
            )
            .join(
              "CHITIETPHIENBANHDSD",
              "CHITIETPHIENBANHDSD.MAPHIENBAN",
              "=",
              "PHIENBANHDSD.MAPHIENBAN"
            )
            .join(
              "HUONGDANSUDUNG",
              "HUONGDANSUDUNG.MAHDSD",
              "=",
              "CHITIETPHIENBANHDSD.MAHDSD"
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
            .where("BINHLUAN.MAPHIENBAN", MaPhienBan)
            .andWhere("BINHLUAN.TRALOI", element.MABL);
          element.TraLoiBL = TraLoiPbHdsdItems;
        }
        array.push(...PbHdsdItems);
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
