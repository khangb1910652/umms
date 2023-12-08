import express from "express";
import { authenticateToken } from "./middleware";

const ApiError = require("../../api-error");
const router = express.Router();

export const KiemTraDangNhap = () => {
    return router.get(
        "/",
        authenticateToken,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                res.send({
                    statusCode: 200,
                    massage: "Success",
                })
            } catch (error) {
                console.log(error);
                return next(new ApiError(500, "Không có dữ liệu"));
            }
        }
    );
};
