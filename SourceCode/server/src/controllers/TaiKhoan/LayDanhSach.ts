import express from "express";
import { knex} from "database/knex";

const ApiError = require("../../api-error");
const router = express.Router();


export const LayDanhSach = () => {
  return router.get(
    "/",

    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        
        const results = await knex("NGUOIDUNG").select("*");
        let account = {
          MaNguoiDung: Number,
          TenDangNhap: "",
          TenHienThi: "",
          MatKhau: "",
          Email: "",
          SoDienThoai: Number,
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
                (account.MatKhau = item.MATKHAU),
                (account.Email = item.EMAIL),
                (account.SoDienThoai = item.SODIENTHOAI),
                (account.Quyen = item.QUYEN);
            } else {
              accounts.push(account);
              currentAccount = item.MANGUOIDUNG;
              const newAccount = {
                MaNguoiDung: item.MANGUOIDUNG,
                TenDangNhap: item.TENDANGNHAP,
                TenHienThi: item.TENHIENTHI,
                MatKhau: item.MATKHAU,
                Email: item.EMAIL,
                SoDienThoai: item.SODIENTHOAI,
                Quyen: item.QUYEN,
              };
              account = { ...newAccount };
            }
          });
          accounts.push(account);
          res.send(accounts);
        }
      } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Không có dữ liệu"));
      }
    }
  );
};
