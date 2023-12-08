import express from "express";
import { knex } from "database/knex";
const ApiError = require("../../api-error");
const router = express.Router();

export const DanhDauYeuThich = () => {
    return router.post(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung, MaDV, MaHDSD, MaPhienBan, MaPHCN, MaChucNang, isCheck } = req.body;
                const currentdate = new Date();
                if (MaDV) {
                    if (!isCheck) {
                        await knex("YEUTHICH").insert([
                            {
                                YEUTHICH: 'true',
                                MANGUOIDUNG: MaNguoiDung,
                                MADV: MaDV,
                                THOIGIANYEUTHICH: currentdate,
                            },
                        ]);
                        res.send(true);
                    } else {
                        await knex("YEUTHICH")
                            .delete()
                            .where({
                                MANGUOIDUNG: MaNguoiDung,
                                MADV: MaDV,
                            });
                        res.send(false);
                    }
                } else if (MaHDSD) {
                    if (!isCheck) {
                        await knex("YEUTHICH").insert([
                            {
                                YEUTHICH: 'true',
                                MANGUOIDUNG: MaNguoiDung,
                                MAHDSD: MaHDSD,
                                THOIGIANYEUTHICH: currentdate,
                            },
                        ]);
                        res.send(true);
                    } else {
                        await knex("YEUTHICH")
                            .delete()
                            .where({
                                MANGUOIDUNG: MaNguoiDung,
                                MAHDSD: MaHDSD,
                            });
                        res.send(false);
                    }
                } else if (MaPhienBan) {
                    if (!isCheck) {
                        await knex("YEUTHICH").insert([
                            {
                                YEUTHICH: 'true',
                                MANGUOIDUNG: MaNguoiDung,
                                MAPHIENBAN: MaPhienBan,
                                THOIGIANYEUTHICH: currentdate,
                            },
                        ]);
                        res.send(true);
                    } else {
                        await knex("YEUTHICH")
                            .delete()
                            .where({
                                MANGUOIDUNG: MaNguoiDung,
                                MAPHIENBAN: MaPhienBan,
                            });
                        res.send(false);
                    }
                } else if (MaPHCN) {
                    if (!isCheck) {
                        await knex("YEUTHICH").insert([
                            {
                                YEUTHICH: 'true',
                                MANGUOIDUNG: MaNguoiDung,
                                MAPHCN: MaPHCN,
                                THOIGIANYEUTHICH: currentdate,
                            },
                        ]);
                        res.send(true);
                    } else {
                        await knex("YEUTHICH")
                            .delete()
                            .where({
                                MANGUOIDUNG: MaNguoiDung,
                                MAPHCN: MaPHCN,
                            });
                        res.send(false);
                    }
                } else if (MaChucNang) {
                    if (!isCheck) {
                        await knex("YEUTHICH").insert([
                            {
                                YEUTHICH: 'true',
                                MANGUOIDUNG: MaNguoiDung,
                                MACHUCNANG: MaChucNang,
                                THOIGIANYEUTHICH: currentdate,
                            },
                        ]);
                        res.send(true);
                    } else {
                        await knex("YEUTHICH")
                            .delete()
                            .where({
                                MANGUOIDUNG: MaNguoiDung,
                                MACHUCNANG: MaChucNang,
                            });
                        res.send(false);
                    }
                }
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
