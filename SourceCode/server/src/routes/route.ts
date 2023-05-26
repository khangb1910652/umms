
import { serverInit } from 'config';
import { DangKy } from 'controllers/TaiKhoan/DangKy';
import { DangNhap } from 'controllers/TaiKhoan/DangNhap';
import { KiemTraTonTai } from 'controllers/TaiKhoan/KiemTraTonTai';
import { LayDanhSach } from 'controllers/TaiKhoan/LayDanhSach';


import express from 'express';

const app = express();

export const routes = () => {
    serverInit(app);
    app.use('/dangKy', DangKy());
    app.use('/dangNhap', DangNhap());

    app.use('/layDanhSachNguoiDung', LayDanhSach());
    app.use('/kiemTraTonTai', KiemTraTonTai());
}