import express from "express";
import { knex } from "database/knex";
import { authenticateToken } from "./middleware";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayDanhSach = () => {
  return router.get(
    "/",
    authenticateToken,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { search } = req.query;
        const results = await knex('NGUOIDUNG')
          .select('*')
          .whereRaw("LOWER(TenDangNhap) like LOWER('%'||?||'%')", search);
        let account = {
          MaNguoiDung: Number,
          TenDangNhap: "",
          TenHienThi: "",
          Email: "",
          HinhAnh: "",
          Quyen: "",
        } as any;
        let accounts = [] as any;
        if (results.length > 0) {
          let currentAccount = results[0].MANGUOIDUNG;
          results.forEach((item: any) => {
            if (item.MANGUOIDUNG === currentAccount) {
              (account.MaNguoiDung = item.MANGUOIDUNG),
                (account.TenDangNhap = item.TENDANGNHAP),
                (account.TenHienThi = item.TENHIENTHI),
                (account.Email = item.EMAIL),
                (account.HinhAnh = item.HINHANH),
                (account.Quyen = item.QUYEN);
            } else {
              accounts.push(account);
              currentAccount = item.MANGUOIDUNG;

              const newAccount = {
                MaNguoiDung: item.MANGUOIDUNG,
                TenDangNhap: item.TENDANGNHAP,
                TenHienThi: item.TENHIENTHI,
                Email: item.EMAIL,
                HinhAnh: item.HINHANH,
                Quyen: item.QUYEN,
              };
              account = { ...newAccount };
            }
          });
          accounts.push(account);
          res.send(accounts);
        } else {
          res.send(accounts);
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
