import express from "express";
import { knex } from "database/knex";
import { authenticateToken } from "./middleware";

const ApiError = require("../../api-error");
const router = express.Router();

export const DoiHinhAnh = () => {
    return router.post(
        "/",
        authenticateToken,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { TenDangNhap, HinhAnh } = req.body;
                const results = await knex("NGUOIDUNG")
                    .update({ HINHANH: HinhAnh })
                    .where({ TENDANGNHAP: TenDangNhap });
                
                if (results) {
                    res.send({
                        statusCode: 200,
                        massage: "Success",
                    });
                } else {
                    res.send({
                        statusCode: 501,
                        massage: "False",
                    });
                }
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
