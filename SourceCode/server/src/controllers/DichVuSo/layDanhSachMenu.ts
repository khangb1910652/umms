import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayDanhSachMenu = () => {
  return router.get(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { Quyen } = req.query;
        const array: any[] = [];
        const dichVuSo = await knex.raw(`
          SELECT * FROM DICHVUSO
          ORDER BY MADV DESC
        `);
        dichVuSo.forEach(async (row: any) => {
          const object = {
            id: row.MADV,
            title: row.TENDV,
            hdsdChungItems: [],
            showHdsdChungMenu: false,
            phItems: [],
            showPhMenu: false,
            likeDvs: false,
          };
          array.push(object);
        });

        const HDSDChung = await knex.raw(`
          SELECT * FROM HUONGDANSUDUNG
          ORDER BY MAHDSD DESC
        `);
        HDSDChung.forEach((row: any) => {
          const object = {
            id: row.MAHDSD,
            title: row.TIEUDEHDSD,
            pbhdsdChungItems: [],
            showPbhdsdChungMenu: false,
            likeHdsdc: false,
          };
          array.forEach(async (item: any) => {
            if (item.id === row.MADV) {
              item.hdsdChungItems.push(object);
            }
          });
        });
        const PbHDSDChung = await knex.raw(`
          SELECT * FROM PHIENBANHDSD 
          JOIN CHITIETPHIENBANHDSD ON CHITIETPHIENBANHDSD.MAPHIENBAN = PHIENBANHDSD.MAPHIENBAN
          JOIN NGUOIDUNG ON NGUOIDUNG.MANGUOIDUNG = CHITIETPHIENBANHDSD.MANGUOIDUNG
          JOIN HUONGDANSUDUNG ON CHITIETPHIENBANHDSD.MAHDSD = HUONGDANSUDUNG.MAHDSD
          WHERE CHITIETPHIENBANHDSD.REVERT = 'true'
          ORDER BY CHITIETPHIENBANHDSD.THOIGIANTAO DESC
        `);
        PbHDSDChung.forEach((row: any) => {
          const formattedDate = new Date(row.THOIGIANTAO).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          const object = {
            id: row.MAPHIENBAN,
            title: row.TIEUDEPHIENBAN,
            time: formattedDate,
            describe: row.MOTA,
            url: row.DUONGDANFILE,
            user: row.TENDANGNHAP,
            likePbHdsdc: false
          };
          array.forEach((item: any) => {
            item.hdsdChungItems.forEach(async (hdItem: any) => {
              if (hdItem.id === row.MAHDSD) {
                const existingItem = hdItem.pbhdsdChungItems.find((pbItem: any) => pbItem.id === row.MAPHIENBAN);
                if (!existingItem) {
                  hdItem.pbhdsdChungItems.push(object);
                }
              };
            });
          });
        });
        const PhanHe = await knex.raw(`
          SELECT * FROM CHUCNANG
          JOIN DICHVUSO ON DICHVUSO.MADV = CHUCNANG.MADV
          JOIN PHANHECHUCNANG ON PHANHECHUCNANG.MAPHCN = CHUCNANG.MAPHCN
          ORDER BY
            PHANHECHUCNANG.MAPHCN DESC,
            CHUCNANG.MACHUCNANG DESC
        `);
        PhanHe.forEach((row: any) => {
          const object = {
            id: row.MAPHCN,
            title: row.TENPHCN,
            cnItems: [],
            showCnMenu: false,
            likePh: false,
          };
          const object1 = {
            id: row.MACHUCNANG,
            title: row.TENCHUCNANG,
            LoaiItems: [],
            showLMenu: false,
            likeCn: false,
          };
          array.forEach(async (item: any) => {
            if (item.id === row.MADV) {
              let existingPhItem = item.phItems.find((phItem: any) => phItem.id === object.id);
              if (!existingPhItem) {
                item.phItems.push(object);
                existingPhItem = object;
              };
              existingPhItem.cnItems.push(object1);
            };
          });
        });

        let LoaiHDSD;
        if (Quyen === 'Admin' || Quyen === 'AdminService') {
          LoaiHDSD = await knex.raw(`
          SELECT * FROM HUONGDANSUDUNG
          JOIN LOAIHDSD ON LOAIHDSD.MALOAI = HUONGDANSUDUNG.MALOAI
          JOIN CHUCNANG ON CHUCNANG.MACHUCNANG = HUONGDANSUDUNG.MACHUCNANG
          ORDER BY HUONGDANSUDUNG.MAHDSD DESC, LOAIHDSD.MALOAI DESC
        `);
        } else {
          LoaiHDSD = await knex.raw(`
          SELECT * FROM HUONGDANSUDUNG
          JOIN LOAIHDSD ON LOAIHDSD.MALOAI = HUONGDANSUDUNG.MALOAI
          JOIN CHUCNANG ON CHUCNANG.MACHUCNANG = HUONGDANSUDUNG.MACHUCNANG
          WHERE LOAIHDSD.MALOAI = 2
          ORDER BY HUONGDANSUDUNG.MAHDSD DESC, LOAIHDSD.MALOAI DESC
        `);
        }
        LoaiHDSD.forEach((row: any) => {
          const object = {
            id: row.MALOAI,
            title: row.TENLOAI,
            HDSDItems: [],
            showHDSDMenu: false,
          };
          const object1 = {
            id: row.MAHDSD,
            title: row.TIEUDEHDSD,
            PbHDSDItems: [],
            showPbHDSDMenu: false,
            likeHdsd: false,
          };
          array.forEach(async (item: any) => {
            item.phItems.forEach((phItem: any) => {
              phItem.cnItems.forEach((cnItem: any) => {
                if (cnItem.id === row.MACHUCNANG) {
                  let existingLoaiItem = cnItem.LoaiItems.find((loaiItem: any) => loaiItem.id === object.id);
                  if (!existingLoaiItem) {
                    existingLoaiItem = {
                      id: object.id,
                      title: object.title,
                      HDSDItems: [],
                    };
                    cnItem.LoaiItems.push(existingLoaiItem);
                  }
                  existingLoaiItem.HDSDItems.push(object1);
                }
              });
            });
          });
        });

        const PbHDSD = await knex.raw(`
          SELECT * FROM PHIENBANHDSD 
          JOIN CHITIETPHIENBANHDSD ON CHITIETPHIENBANHDSD.MAPHIENBAN = PHIENBANHDSD.MAPHIENBAN
          JOIN NGUOIDUNG ON NGUOIDUNG.MANGUOIDUNG = CHITIETPHIENBANHDSD.MANGUOIDUNG
          JOIN HUONGDANSUDUNG ON CHITIETPHIENBANHDSD.MAHDSD = HUONGDANSUDUNG.MAHDSD
          WHERE CHITIETPHIENBANHDSD.REVERT = 'true'
          ORDER BY CHITIETPHIENBANHDSD.THOIGIANTAO DESC
        `);
        for (const row of PbHDSD) {
          const formattedDate = new Date(row.THOIGIANTAO).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          const object = {
            id: row.MAPHIENBAN,
            title: row.TIEUDEPHIENBAN,
            time: formattedDate,
            describe: row.MOTA,
            url: row.DUONGDANFILE,
            user: row.TENDANGNHAP,
            likePbHdsd: false,
          };
          array.forEach((item: any) => {
            item.phItems.forEach((hdItem: any) => {
              hdItem.cnItems.forEach((cnItem: any) => {
                cnItem.LoaiItems.forEach((loaiItem: any) => {
                  loaiItem.HDSDItems.forEach((hd: any) => {
                    if (hd.id === row.MAHDSD) {
                      // hd.PbHDSDItems.push(object);
                      const existingItem = hd.PbHDSDItems.find((pbItem: any) => pbItem.id === row.MAPHIENBAN);
                      if (!existingItem) {
                        hd.PbHDSDItems.push(object);
                      }
                    }
                  });
                });
              });
            });
          });
        };
        res.send(array);
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};

