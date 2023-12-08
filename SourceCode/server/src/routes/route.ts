import { LayBinhLuanPbHdsdc } from './../controllers/BinhLuan/LayBinhLuanPbHdsdc';
import { serverInit } from 'config';
import express from 'express'; 

import { UploadImage } from 'controllers/HinhAnh/UploadImage';
import { DangKy } from 'controllers/NguoiDung/DangKy';
import { DangNhap } from 'controllers/NguoiDung/DangNhap';
import { DoiHinhAnh } from 'controllers/NguoiDung/DoiHinhAnh';
import { DoiMatKhau } from 'controllers/NguoiDung/DoiMatKhau';
import { DoiQuyen } from 'controllers/NguoiDung/DoiQuyen';
import { KiemTraDangNhap } from 'controllers/NguoiDung/KiemTraDangNhap';
import { KiemTraTonTaiEmail } from 'controllers/NguoiDung/KiemTraTonTaiEmail';
import { KiemTraTonTaiSoDienThoai } from 'controllers/NguoiDung/KiemTraTonTaiSoDienThoai';
import { KiemTraTonTaiTenDangNhap } from 'controllers/NguoiDung/KiemTraTonTaiTenDangNhap';
import { LayDanhSach } from 'controllers/NguoiDung/LayDanhSach';
import { LayThongTinNguoiDung } from 'controllers/NguoiDung/LayThongTinNguoiDung';
import { SuaThongTin } from 'controllers/NguoiDung/SuaThongTin';
import { KiemTraTonTaiPhanHeChucNang } from 'controllers/PhanHeChucNang/KiemTraTonTaiPhanHeChucNang';
import { LayPhanHeChucNang } from 'controllers/PhanHeChucNang/LayPhanHeChucNang';
import { KiemTraTonTaiChucNang } from 'controllers/ChucNang/KiemTraTonTaiChucNang';
import { ThemHuongDanSuDungChung } from 'controllers/HuongDanSuDung/ThemHuongDanSuDungChung';
import { UploadHDSD } from 'controllers/HuongDanSuDung/UploadHDSD';
import { KiemTraTonTaiHDSDChung } from 'controllers/HuongDanSuDung/KiemTraTonTaiHDSDChung';
import { LayPhienBanHDSDChung } from 'controllers/HuongDanSuDung/LayPhienBanHDSDChung';
import { SuaHuongDanSuDungChung } from 'controllers/HuongDanSuDung/SuaHuongDanSuDungChung';
import { CheckQuyenDichVuSo } from 'controllers/DichVuSo/CheckQuyenDichVuSo';
import { LayLichSuSuaHDSDChung } from 'controllers/HuongDanSuDung/LayLichSuSuaHDSDChung';
import { KhoiPhucHDSDChung } from 'controllers/HuongDanSuDung/KhoiPhucHDSDChung';
import { LayDichVuSo } from 'controllers/DichVuSo/LayDichVuSo';
import { LayQuyenDichVuSo } from 'controllers/DichVuSo/LayQuyenDichVuSo';
import { DoiQuyenDichVuSo } from 'controllers/DichVuSo/DoiQuyenDichVuSo';
import { ThemDichVuSo } from 'controllers/DichVuSo/ThemDichVuSo';
import { SuaDichVuSo } from 'controllers/DichVuSo/SuaDichVuSo';
import { ThemPhanHeChucNang } from 'controllers/PhanHeChucNang/ThemPhanHeChucNang';
import { SuaPhanHeChucNang } from 'controllers/PhanHeChucNang/SuaPhanHeChucNang';
import { ThemChucNang } from 'controllers/ChucNang/ThemChucNang';
import { SuaChucNang } from 'controllers/ChucNang/SuaChucNang';
import { LayLoaiHDSD } from 'controllers/HuongDanSuDung/LayLoaiHDSD';
import { LayChucNang } from 'controllers/ChucNang/LayChucNang';
import { LayChucNangTheoDichVuSo } from 'controllers/ChucNang/LayChucNangTheoDichVuSo';
import { KiemTraTonTaiHDSD } from 'controllers/HuongDanSuDung/KiemTraTonTaiHDSD';
import { ThemHDSD } from 'controllers/HuongDanSuDung/ThemHDSD';
import { LayHDSD } from 'controllers/HuongDanSuDung/LayHDSD';
import { LayDanhSachMenu } from 'controllers/DichVuSo/LayDanhSachMenu';
import { KiemTraTonTaiDichVuSo } from 'controllers/DichVuSo/KiemTraTonTaiDichVuSo';
import { SuaHDSD } from 'controllers/HuongDanSuDung/SuaHDSD';
import { KiemTraTonTaiPbHDSD } from 'controllers/HuongDanSuDung/KiemTraTonTaiPbHDSD';
import { ThemPbHDSD } from 'controllers/HuongDanSuDung/ThemPbHDSD';
import { LayPbHDSD } from 'controllers/HuongDanSuDung/LayPbHDSD';
import { SuaPbHDSD } from 'controllers/HuongDanSuDung/SuaPbHDSD';
import { LayHDSDTheoChucNang } from 'controllers/HuongDanSuDung/LayHDSDTheoChucNang';
import { LayLichSuSuaHDSD } from 'controllers/HuongDanSuDung/LayLichSuSuaHDSD';
import { KhoiPhucHDSD } from 'controllers/HuongDanSuDung/KhoiPhucHDSD';
import { TimKiemChung } from 'controllers/TimKiem/TimKiemChung';
import { DanhDauYeuThich } from 'controllers/YeuThich/danhDauYeuThich';
import { LayDanhSachYeuThich } from 'controllers/YeuThich/LayDanhSachYeuThich';
import { BinhLuan } from 'controllers/BinhLuan/BinhLuan';
import { LayBinhLuanDvs } from 'controllers/BinhLuan/LayBinhLuanDvs';
import { LayBinhLuanHdsdc } from 'controllers/BinhLuan/LayBinhLuanHdsdc';
import { TraLoiBinhLuan } from 'controllers/BinhLuan/TraLoiBinhLuan';
import { LayBinhLuanPHCN } from 'controllers/BinhLuan/LayBinhLuanPHCN';
import { LayBinhLuanChucNang } from 'controllers/BinhLuan/LayBinhLuanChucNang';
import { LayBinhLuanHdsd } from 'controllers/BinhLuan/LayBinhLuanHdsd';
import { LayBinhLuanPbHdsd } from 'controllers/BinhLuan/LayBinhLuanPbHdsd';
import { LayThongBaoChuaDoc } from 'controllers/ThongBao/LayThongBaoChuaDoc';
import { DocThongBao } from 'controllers/ThongBao/DocThongBao';
import { LayThongBao } from 'controllers/ThongBao/LayThongBao';
import { LayYeuThich } from 'controllers/YeuThich/LayYeuThich';

const app = express();

export const routes = () => {
    serverInit(app);
    app.use('/dangKy', DangKy());
    app.use('/dangNhap', DangNhap());

    app.use('/layDanhSachNguoiDung', LayDanhSach()); //AUTH
    app.use('/kiemTraTonTaiTenDangNhap', KiemTraTonTaiTenDangNhap()); 
    app.use('/kiemTraTonTaiSoDienThoai', KiemTraTonTaiSoDienThoai()); 
    app.use('/kiemTraTonTaiEmail', KiemTraTonTaiEmail());
    app.use('/suaThongTin', SuaThongTin()); //AUTH
    app.use('/doiMatKhau', DoiMatKhau()); //AUTH
    app.use('/uploadImage', UploadImage()); // Sử dụng upload.single
    app.use('/doiHinhAnh', DoiHinhAnh()); //AUTH
    app.use('/doiQuyen', DoiQuyen()); //AUTH
    app.use('/layDichVuSo', LayDichVuSo());
    app.use('/layQuyenDichVuSo', LayQuyenDichVuSo());
    app.use('/doiQuyenDichVuSo', DoiQuyenDichVuSo()); 
    app.use('/kiemTraDangNhap', KiemTraDangNhap()); //AUTH
    app.use('/layThongTinNguoiDung', LayThongTinNguoiDung()); //AUTH
    app.use('/layDanhSachMenu', LayDanhSachMenu());
    app.use('/themDichVuSo', ThemDichVuSo());
    app.use('/suaDichVuSo', SuaDichVuSo());
    app.use('/themPhanHeChucNang', ThemPhanHeChucNang());
    app.use('/suaPhanHeChucNang', SuaPhanHeChucNang());
    app.use('/themChucNang', ThemChucNang());
    app.use('/suaChucNang', SuaChucNang());
    app.use('/kiemTraTonTaiDichVuSo', KiemTraTonTaiDichVuSo());
    app.use('/kiemTraTonTaiPhanHeChucNang', KiemTraTonTaiPhanHeChucNang());
    app.use('/kiemTraTonTaiChucNang', KiemTraTonTaiChucNang());
    app.use('/layPhanHeChucNang', LayPhanHeChucNang());
    app.use('/layChucNang', LayChucNang());
    app.use('/themHuongDanSuDungChung', ThemHuongDanSuDungChung());
    app.use('/uploadHDSD', UploadHDSD()); // Sử dụng upload.single
    app.use('/kiemTraTonTaiHDSDChung', KiemTraTonTaiHDSDChung());
    app.use('/layPhienBanHDSDChung', LayPhienBanHDSDChung());
    app.use('/suaHuongDanSuDungChung', SuaHuongDanSuDungChung());
    app.use('/checkQuyenDichVuSo', CheckQuyenDichVuSo());
    app.use('/layLichSuSuaHDSDChung', LayLichSuSuaHDSDChung());
    app.use('/khoiPhucHDSDChung', KhoiPhucHDSDChung());
    app.use('/layLoaiHDSD', LayLoaiHDSD());
    app.use('/layChucNangTheoDichVuSo', LayChucNangTheoDichVuSo());
    app.use('/kiemTraTonTaiHDSD', KiemTraTonTaiHDSD());
    app.use('/themHDSD', ThemHDSD());
    app.use('/layHDSD', LayHDSD());
    app.use('/suaHDSD', SuaHDSD());
    app.use('/kiemTraTonTaiPbHDSD', KiemTraTonTaiPbHDSD());
    app.use('/themPbHDSD', ThemPbHDSD());
    app.use('/layPbHDSD', LayPbHDSD());
    app.use('/suaPbHDSD', SuaPbHDSD());
    app.use('/layHDSDTheoChucNang', LayHDSDTheoChucNang());
    app.use('/layLichSuSuaHDSD', LayLichSuSuaHDSD());
    app.use('/khoiPhucHDSD', KhoiPhucHDSD());
    app.use('/timKiemChung', TimKiemChung());
    app.use('/danhDauYeuThich', DanhDauYeuThich());
    app.use('/layDanhSachYeuThich', LayDanhSachYeuThich());
    app.use('/binhLuan', BinhLuan());
    app.use('/layBinhLuanDvs', LayBinhLuanDvs());
    app.use('/layBinhLuanHdsdc', LayBinhLuanHdsdc());
    app.use('/layBinhLuanPbHdsdc', LayBinhLuanPbHdsdc());
    app.use('/layBinhLuanPHCN', LayBinhLuanPHCN());
    app.use('/layBinhLuanChucNang', LayBinhLuanChucNang());
    app.use('/layBinhLuanHdsd', LayBinhLuanHdsd());
    app.use('/layBinhLuanPbHdsd', LayBinhLuanPbHdsd());
    app.use('/traLoiBinhLuan', TraLoiBinhLuan());
    app.use('/layThongBaoChuaDoc', LayThongBaoChuaDoc());
    app.use('/docThongBao', DocThongBao());
    app.use('/layThongBao', LayThongBao());
    app.use('/layYeuThich', LayYeuThich());

}
