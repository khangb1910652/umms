import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const DoiQuyenDichVuSo = () => {
    return router.post(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaNguoiDung, MaDV, isCheck } = req.body;
                if (isCheck) {
                    const results = await knex("PHANQUYEN").insert([
                        {
                            MANGUOIDUNG: MaNguoiDung,
                            MADV: MaDV,
                        },
                    ]);
                    res.sendStatus(200);
                } else {
                    const results = await knex("PHANQUYEN")
                        .delete()
                        .where({
                            MANGUOIDUNG: MaNguoiDung,
                            MADV: MaDV,
                        });
                    res.sendStatus(200);
                }
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
