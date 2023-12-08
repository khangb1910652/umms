import express from "express";
import { knex } from "database/knex";
const ApiError = require("../../api-error");
const router = express.Router();

export const CheckQuyenDichVuSo = () => {
    return router.get(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung, MaDV } = req.query;
                const results = await knex("PHANQUYEN")
                    .select("DICHVUSO.MADV", "DICHVUSO.TENDV")
                    .join("DICHVUSO", "PHANQUYEN.MADV", "DICHVUSO.MADV")
                    .join("NGUOIDUNG", "NGUOIDUNG.MANGUOIDUNG", "PHANQUYEN.MANGUOIDUNG")
                    .where({ "NGUOIDUNG.MANGUOIDUNG": MaNguoiDung, "DICHVUSO.MADV": MaDV })
                    .first();

                if (results) {
                    res.send(true);
                } else {
                    res.send(false);
                };
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
