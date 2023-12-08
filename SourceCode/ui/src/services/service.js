import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;
class AccountService {
  constructor() {
    this.baseUrl = `${url}/`;
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
  }
  async dangKy(account) {
    return (await this.api.post(this.baseUrl + "dangKy", account)).data;
  }
  async kiemTraTonTaiTenDangNhap(TenDangNhap) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiTenDangNhap", { params: { TenDangNhap } })).data;
  }
  async kiemTraTonTaiSoDienThoai(SoDienThoai) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiSoDienThoai", { params: { SoDienThoai } })).data;
  }
  async kiemTraTonTaiEmail(Email) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiEmail", { params: { Email } })).data;
  }
  async dangNhap(TenDangNhap, MatKhau) {
    return (await this.api.get(this.baseUrl + "dangNhap", { params: { TenDangNhap, MatKhau } })).data;
  }
  async layThongTinNguoiDung(MaNguoiDung, token) {
    return (await this.api.get(this.baseUrl + "layThongTinNguoiDung", {
      params: { MaNguoiDung },
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async suaThongTin(info, token) {
    return (await this.api.post(this.baseUrl + "suaThongTin", info, {
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async doiMatKhau(pass, token) {
    return (await this.api.post(this.baseUrl + "doiMatKhau", pass, {
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async doiHinhAnh(image, token) {
    return (await this.api.post(this.baseUrl + "doiHinhAnh", image, {
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async layDanhSachNguoiDung(search, token) {
    return (await this.api.get(this.baseUrl + "layDanhSachNguoiDung", {
      params: { search },
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async layDichVuSo() {
    return (await this.api.get(this.baseUrl + "layDichVuSo")).data;
  }
  async layQuyenDichVuSo(TenDangNhap) {
    return (await this.api.get(this.baseUrl + "layQuyenDichVuSo", { params: { TenDangNhap } })).data;
  }
  async doiQuyen(permission, token) {
    return (await this.api.post(this.baseUrl + "doiQuyen", permission, {
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async doiQuyenDichVuSo(thongTinDoi) {
    return (await this.api.post(this.baseUrl + "doiQuyenDichVuSo", thongTinDoi)).data;
  }
  async kiemTraDangNhap(token) {
    return (await this.api.get(this.baseUrl + "kiemTraDangNhap", {
      headers: {
        Authorization: token, // Gửi token trong header Authorization
      },
    })).data;
  }
  async layDanhSachMenu(Quyen, MaNguoiDung) {
    return (await this.api.get(this.baseUrl + "layDanhSachMenu", { params: { Quyen, MaNguoiDung } })).data;
  }
  async themDichVuSo(TenDV) {
    return (await this.api.post(this.baseUrl + "themDichVuSo", { TenDV })).data;
  }
  async suaDichVuSo(thongTinSua) {
    return (await this.api.post(this.baseUrl + "suaDichVuSo", thongTinSua)).data;
  }
  async themPhanHeChucNang(TenPHCN) {
    return (await this.api.post(this.baseUrl + "themPhanHeChucNang", { TenPHCN })).data;
  }
  async suaPhanHeChucNang(thongTinSua) {
    return (await this.api.post(this.baseUrl + "suaPhanHeChucNang", thongTinSua)).data;
  }
  async themChucNang(thongTinThem) {
    return (await this.api.post(this.baseUrl + "themChucNang", thongTinThem)).data;
  }
  async suaChucNang(thongTinSua) {
    return (await this.api.post(this.baseUrl + "suaChucNang", thongTinSua)).data;
  }
  async kiemTraTonTaiDichVuSo(TenDV) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiDichVuSo", { params: { TenDV } })).data;
  }
  async kiemTraTonTaiPhanHeChucNang(TenPHCN) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiPhanHeChucNang", { params: { TenPHCN } })).data;
  }
  async kiemTraTonTaiChucNang(TenChucNang, MaDV, MaPHCN) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiChucNang", { params: { TenChucNang, MaDV, MaPHCN } })).data;
  }
  async layPhanHeChucNang() {
    return (await this.api.get(this.baseUrl + "layPhanHeChucNang")).data;
  }
  async layChucNang() {
    return (await this.api.get(this.baseUrl + "layChucNang")).data;
  }
  async themHuongDanSuDungChung(thongTinThem) {
    return (await this.api.post(this.baseUrl + "themHuongDanSuDungChung", thongTinThem)).data;
  }
  async suaHuongDanSuDungChung(thongTinSua) {
    return (await this.api.post(this.baseUrl + "suaHuongDanSuDungChung", thongTinSua)).data;
  }
  async kiemTraTonTaiHDSDChung(TieuDePhienBan, MaDV) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiHDSDChung", { params: { TieuDePhienBan, MaDV } })).data;
  }
  async layPhienBanHDSDChung(MaDV) {
    return (await this.api.get(this.baseUrl + "layPhienBanHDSDChung", { params: { MaDV } })).data;
  }
  async checkQuyenDichVuSo(MaNguoiDung, MaDV) {
    return (await this.api.get(this.baseUrl + "checkQuyenDichVuSo", { params: { MaNguoiDung, MaDV } })).data;
  }
  async layLichSuSuaHDSDChung(MaDV, MaPhienBan) {
    return (await this.api.get(this.baseUrl + "layLichSuSuaHDSDChung", { params: { MaDV, MaPhienBan } })).data;
  }
  async khoiPhucHDSDChung(ThongTinKhoiPhuc) {
    return (await this.api.post(this.baseUrl + "khoiPhucHDSDChung", ThongTinKhoiPhuc)).data;
  }
  async layLoaiHDSD() {
    return (await this.api.get(this.baseUrl + "layLoaiHDSD")).data;
  }
  async layChucNangTheoDichVuSo(MaDV) {
    return (await this.api.get(this.baseUrl + "layChucNangTheoDichVuSo", { params: { MaDV } })).data;
  }
  async kiemTraTonTaiHDSD(TieuDeHDSD, MaDV, MaPHCN, MaChucNang, MaLoai) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiHDSD", { params: { TieuDeHDSD, MaDV, MaPHCN, MaChucNang, MaLoai } })).data;
  }
  async themHDSD(thongTinThem) {
    return (await this.api.post(this.baseUrl + "themHDSD", thongTinThem)).data;
  }
  async layHDSD() {
    return (await this.api.get(this.baseUrl + "layHDSD")).data;
  }
  async suaHDSD(thongTinSua) {
    return (await this.api.post(this.baseUrl + "suaHDSD", thongTinSua)).data;
  }
  async kiemTraTonTaiPbHDSD(TieuDePhienBan, MaHDSD) {
    return (await this.api.get(this.baseUrl + "kiemTraTonTaiPbHDSD", { params: { TieuDePhienBan, MaHDSD } })).data;
  }
  async themPbHDSD(thongTinThem) {
    return (await this.api.post(this.baseUrl + "themPbHDSD", thongTinThem)).data;
  }
  async layPbHDSD(MaHDSD) {
    return (await this.api.get(this.baseUrl + "layPbHDSD", { params: { MaHDSD } })).data;
  }
  async suaPbHDSD(thongTinSua) {
    return (await this.api.post(this.baseUrl + "suaPbHDSD", thongTinSua)).data;
  }
  async layHDSDTheoChucNang(MaChucNang, MaLoai) {
    return (await this.api.get(this.baseUrl + "layHDSDTheoChucNang", { params: { MaChucNang, MaLoai } })).data;
  }
  async layLichSuSuaHDSD(MaHDSD, MaPhienBan) {
    return (await this.api.get(this.baseUrl + "layLichSuSuaHDSD", { params: { MaHDSD, MaPhienBan } })).data;
  }
  async khoiPhucHDSD(ThongTinKhoiPhuc) {
    return (await this.api.post(this.baseUrl + "khoiPhucHDSD", ThongTinKhoiPhuc)).data;
  }
  async danhDauYeuThich(thongTinDoi) {
    return (await this.api.post(this.baseUrl + "danhDauYeuThich", thongTinDoi)).data;
  }
  async layDanhSachYeuThich(MaNguoiDung) {
    return (await this.api.get(this.baseUrl + "layDanhSachYeuThich", { params: { MaNguoiDung } })).data;
  }
  async binhLuan(thongTinBL) {
    return (await this.api.post(this.baseUrl + "binhLuan", thongTinBL)).data;
  }
  async layBinhLuanDvs(MaDV) {
    return (await this.api.get(this.baseUrl + "layBinhLuanDvs", { params: { MaDV } })).data;
  }
  async layBinhLuanHdsdc(MaHDSD) {
    return (await this.api.get(this.baseUrl + "layBinhLuanHdsdc", { params: { MaHDSD } })).data;
  }
  async layBinhLuanPbHdsdc(MaPhienBan) {
    return (await this.api.get(this.baseUrl + "layBinhLuanPbHdsdc", { params: { MaPhienBan } })).data;
  }
  async layBinhLuanPHCN(MaPHCN) {
    return (await this.api.get(this.baseUrl + "layBinhLuanPHCN", { params: { MaPHCN } })).data;
  }
  async layBinhLuanChucNang(MaChucNang) {
    return (await this.api.get(this.baseUrl + "layBinhLuanChucNang", { params: { MaChucNang } })).data;
  }
  async layBinhLuanHdsd(MaHDSD) {
    return (await this.api.get(this.baseUrl + "layBinhLuanHdsd", { params: { MaHDSD } })).data;
  }
  async layBinhLuanPbHdsd(MaPhienBan) {
    return (await this.api.get(this.baseUrl + "layBinhLuanPbHdsd", { params: { MaPhienBan } })).data;
  }
  async traLoiBinhLuan(thongTinBL) {
    return (await this.api.post(this.baseUrl + "traLoiBinhLuan", thongTinBL)).data;
  }
  async timKiemChung(search) {
    return (await this.api.get(this.baseUrl + "timKiemChung", { params: { search } })).data;
  }
  async layThongBaoChuaDoc(Quyen, MaNguoiDung) {
    return (await this.api.get(this.baseUrl + "layThongBaoChuaDoc", { params: { Quyen, MaNguoiDung } })).data;
  }
  async docThongBao(MaBL) {
    return (await this.api.post(this.baseUrl + "docThongBao", { MaBL } )).data;
  }
  async layThongBao(Quyen, MaNguoiDung) {
    return (await this.api.get(this.baseUrl + "layThongBao", { params: { Quyen, MaNguoiDung } })).data;
  }
  async layYeuThich(MaNguoiDung, MaDV, MaPHCN, MaChucNang, MaHDSD, MaPhienBan) {
    return (await this.api.get(this.baseUrl + "layYeuThich", { params: { MaNguoiDung, MaDV, MaPHCN, MaChucNang, MaHDSD, MaPhienBan } })).data;
  }
}

export const accountService = new AccountService();

class FileService {
  constructor() {
    this.baseUrl = `${url}/`;
    this.api = axios.create({
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
  }
  async uploadImage(formData) {
    return (await this.api.post(this.baseUrl + "uploadImage", formData)).data;
  }
  async uploadHDSD(formData) {
    return (await this.api.post(this.baseUrl + "uploadHDSD", formData)).data;
  }
}

export const fileService = new FileService();