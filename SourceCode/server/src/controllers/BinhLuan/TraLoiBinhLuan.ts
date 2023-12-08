import express from "express";
import { knex } from "database/knex";
const ApiError = require("../../api-error");
const router = express.Router();

export const TraLoiBinhLuan = () => {
    return router.post(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung, MaDV, MaHDSD, MaPhienBan, MaPHCN, MaChucNang, NoiDungBL, MaBL, TraLoiMaND } = req.body;
                const currentdate = new Date();
                if (MaDV) {
                    await knex("BINHLUAN").insert([
                        {
                            NOIDUNG: NoiDungBL,
                            THOIGIANBINHLUAN: currentdate,
                            MANGUOIDUNG: MaNguoiDung,
                            MADV: MaDV,
                            TRALOI: MaBL,
                            TRALOIMAND: TraLoiMaND,
                        },
                    ]);
                    res.send(true);
                } else if (MaHDSD) {
                    await knex("BINHLUAN").insert([
                        {
                            NOIDUNG: NoiDungBL,
                            THOIGIANBINHLUAN: currentdate,
                            MANGUOIDUNG: MaNguoiDung,
                            MAHDSD: MaHDSD,
                            TRALOI: MaBL,
                            TRALOIMAND: TraLoiMaND,
                        },
                    ]);
                    res.send(true);

                } else if (MaPhienBan) {
                    await knex("BINHLUAN").insert([
                        {
                            NOIDUNG: NoiDungBL,
                            THOIGIANBINHLUAN: currentdate,
                            MANGUOIDUNG: MaNguoiDung,
                            MAPHIENBAN: MaPhienBan,
                            TRALOI: MaBL,
                            TRALOIMAND: TraLoiMaND,
                        },
                    ]);
                    res.send(true);
                } else if (MaPHCN) {
                    await knex("BINHLUAN").insert([
                        {
                            NOIDUNG: NoiDungBL,
                            THOIGIANBINHLUAN: currentdate,
                            MANGUOIDUNG: MaNguoiDung,
                            MAPHCN: MaPHCN,
                            TRALOI: MaBL,
                            TRALOIMAND: TraLoiMaND,
                        },
                    ]);
                    res.send(true);
                } else if (MaChucNang) {
                    await knex("BINHLUAN").insert([
                        {
                            NOIDUNG: NoiDungBL,
                            THOIGIANBINHLUAN: currentdate,
                            MANGUOIDUNG: MaNguoiDung,
                            MACHUCNANG: MaChucNang,
                            TRALOI: MaBL,
                            TRALOIMAND: TraLoiMaND,
                        },
                    ]);
                    res.send(true);
                }
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
