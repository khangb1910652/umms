import express from "express";
import { knex } from "database/knex";
import { authenticateToken } from "controllers/NguoiDung/middleware";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const SuaPhanHeChucNang = () => {
    return router.post(
        "/",
        // authenticateToken,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaPHCN, TenPHCN } = req.body;
                const results = await knex("PHANHECHUCNANG")
                    .update({ TENPHCN: TenPHCN })
                    .where({ MAPHCN: MaPHCN });

                if (results) {
                    await knex("HASHTAG")
                        .update({ TAGNAME: generateHashtags(TenPHCN).join(' ') })
                        .where({ MADV: MaPHCN });
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
