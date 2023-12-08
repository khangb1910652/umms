import express from "express";
import { knex } from "database/knex";
import { authenticateToken } from "controllers/NguoiDung/middleware";
import { generateHashtags } from "controllers/TimKiem/generateHashtags";

const ApiError = require("../../api-error");
const router = express.Router();

export const SuaChucNang = () => {
    return router.post(
        "/",
        // authenticateToken,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const { MaChucNang, TenChucNang, MaDV, MaPHCN } = req.body;
                const results = await knex("CHUCNANG")
                    .update({ TENCHUCNANG: TenChucNang, MADV: MaDV, MAPHCN: MaPHCN })
                    .where({ MACHUCNANG: MaChucNang });

                if (results) {
                    await knex("HASHTAG")
                        .update({ TAGNAME: generateHashtags(TenChucNang).join(' ') })
                        .where({ MACHUCNANG: MaChucNang });
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
