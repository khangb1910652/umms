import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const LayYeuThich = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung, MaDV, MaPHCN, MaChucNang, MaHDSD, MaPhienBan } = req.query;
                if (MaDV) {
                    const results = await knex("YEUTHICH")
                        .select("*")
                        .where({ MADV: MaDV })
                        .andWhere({ MANGUOIDUNG: MaNguoiDung });
                    if (results.length > 0) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                } else if (MaPHCN) {
                    const results = await knex("YEUTHICH")
                        .select("*")
                        .where({ MAPHCN: MaPHCN })
                        .andWhere({ MANGUOIDUNG: MaNguoiDung });
                    if (results.length > 0) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                } else if (MaChucNang) {
                    const results = await knex("YEUTHICH")
                        .select("*")
                        .where({ MACHUCNANG: MaChucNang })
                        .andWhere({ MANGUOIDUNG: MaNguoiDung });
                    if (results.length > 0) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                } else if (MaHDSD) {
                    const results = await knex("YEUTHICH")
                        .select("*")
                        .where({ MAHDSD: MaHDSD })
                        .andWhere({ MANGUOIDUNG: MaNguoiDung });
                    if (results.length > 0) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                } else if (MaPhienBan) {
                    const results = await knex("YEUTHICH")
                        .select("*")
                        .where({ MAPHIENBAN: MaPhienBan })
                        .andWhere({ MANGUOIDUNG: MaNguoiDung });
                    if (results.length > 0) {
                        res.send(true);
                    } else {
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
