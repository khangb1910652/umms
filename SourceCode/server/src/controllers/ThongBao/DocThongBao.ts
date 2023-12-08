import express from "express";
import { knex } from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();

export const DocThongBao = () => {
    return router.post(
        "/",
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaBL } = req.body;
                const results = await knex("BINHLUAN")
                    .update({ THONGBAO: "true" })
                    .where({ MABL: MaBL });
                if (results) {
                    res.send(true);
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
