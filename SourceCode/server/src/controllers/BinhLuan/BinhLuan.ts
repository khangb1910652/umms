import express from "express";
import { knex } from "database/knex";
const ApiError = require("../../api-error");
const router = express.Router();

export const BinhLuan = () => {
    return router.post(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung, MaDV, MaHDSD, MaPhienBan, MaPHCN, MaChucNang, NoiDungBL } = req.body;
                const currentdate = new Date();
                if (MaDV) {
                    await knex("BINHLUAN").insert([
                        {
                            NOIDUNG: NoiDungBL,
                            THOIGIANBINHLUAN: currentdate,
                            MANGUOIDUNG: MaNguoiDung,
                            MADV: MaDV,
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
