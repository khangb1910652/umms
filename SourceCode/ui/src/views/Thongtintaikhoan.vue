<script>
import "../assets/css/taikhoan.css";
import AppHeader from "@/components/AppHeader.vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
import { accountService, fileService } from "@/services/service";

export default {
  components: {
    AppHeader,
    Form,
    Field,
    ErrorMessage,
  },
  async created() {
    const accountData = localStorage.getItem("account");
    Swal.close();
    if (accountData) {
      this.account = JSON.parse(accountData);
    }
    await this.checkAuthentication();
    try {
      this.dvsItems = await accountService.layDanhSachMenu(
        this.accountInfo.Quyen
      );
      this.$emit("dvsItems", this.dvsItems);
    } catch (error) {
      console.log(error);
    };
  },
  data() {
    const passFormSchema = yup.object().shape({
      matkhauhientai: yup
        .string()
        .required("Vui lòng nhập mật khẩu hiện tại.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
        .max(255, "Mật khẩu không vượt quá 255 ký tự.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])\S+$/,
          "Mật khẩu phải chứa ít nhất một ký tự in hoa, một kí tự thường, một ký tự đặc biệt và không chứa khoảng trắng."
        ),
      matkhaumoi: yup
        .string()
        .required("Vui lòng nhập mật khẩu.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
        .max(255, "Mật khẩu không vượt quá 255 ký tự.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])\S+$/,
          "Mật khẩu phải chứa ít nhất một ký tự in hoa, một kí tự thường, một ký tự đặc biệt và không chứa khoảng trắng."
        ),
      nhaplaimatkhaumoi: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu.")
        .oneOf(
          [yup.ref("matkhaumoi")],
          "Mật khẩu nhập lại phải trùng với mật khẩu mới đã nhập."
        ),
    });
    const inforFormSchema = yup.object().shape({
      hovaten: yup
        .string()
        .required("Vui lòng nhập Họ và Tên.")
        .min(6, "Họ và Tên phải có ít nhất 6 ký tự.")
        .max(255, "Họ và Tên không vượt quá 255 ký tự.")
        .matches(
          /^[\p{L}][\p{L} ]+[\p{L}]$/u,
          "Họ và tên không chứa kí tự đặc biệt."
        ),
      email: yup
        .string()
        .required("Vui lòng nhập Email.")
        .min(0, ".")
        .max(255, "Email không vượt quá 255 ký tự.")
        .matches(
          /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
          "Email phải đúng định dạng."
        )
        .test(
          "is-unique",
          "Email đã tồn tại vui lòng nhập email khác.",
          async function (value) {
            if (value && value !== this.accountInfo.Email) {
              const exists = await accountService.kiemTraTonTaiEmail(value);
              return !exists;
            }
            return true;
          }.bind(this)
        ),
      sodienthoai: yup
        .string()
        .required("Vui lòng nhập số điện thoại.")
        .min(10, "Số điện thoại phải có ít nhất 10 số.")
        .max(14, "Số điện thoại không vượt quá 14 số.")
        .matches(
          /^(0|84)\d{9,12}$/,
          "Vui lòng nhập số điện thoại đúng định dạng."
        )
        .test(
          "is-unique",
          "Số điện thoại đã tồn tại vui lòng nhập số điện thoại khác.",
          async function (value) {
            if (value && value !== this.accountInfo.SoDienThoai) {
              const exists = await accountService.kiemTraTonTaiSoDienThoai(
                value
              );
              return !exists;
            }
            return true;
          }.bind(this)
        ),
    });
    const info = {
      TenDangNhap: "",
      TenHienThi: "",
      Email: "",
      SoDienThoai: "",
    };
    const pass = {
      MatKhauHienTai: "",
      MatKhauMoi: "",
    };
    return {
      account: {},
      accountInfo: {},
      info,
      pass,
      nhaplaimatkhaumoi: "",
      passFormSchema,
      inforFormSchema,
      showPassword: false,
      showNewPassword: false,
      showNewCfPassword: false,
      isHoSoVisible: true,
      isMatKhauVisible: false,
      isNguoiDungVisible: false,
      isDichVuVisible: false,
      isYeuThichVisible: false,
      activeButton: "ho-so",
      selectedImage: null,
      serverUrl: "http://localhost:8080/images/",
      DSNguoiDung: [],
      DSYeuThich: [],
      selectedItemQuyen: "",
      itemsQuyen: [
        { id: 1, label: "Admin", value: "Admin" },
        { id: 2, label: "AdminService", value: "AdminService" },
        { id: 3, label: "EndUser", value: "EndUser" },
      ],
      selectedItemPhanQuyen: "",
      DSDichVuSo: [],
      permission: {},
      search: "",
      isChecked: false,
      selectedNguoiDung: {},
      DSDichVuSoCuaNguoiDung: [],
      dvsItems: [],
    };
  },
  computed: {
    eyeIcon() {
      return this.showPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
    eyeNewIcon() {
      return this.showNewPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
    eyeNewCfIcon() {
      return this.showNewCfPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
    selectedPhanQuyenColorClass() {
      return this.selectedItemQuyen === "Admin" ? "xam-option" : "xanh-option";
    },
    checkAdmin() {
      return this.accountInfo.Quyen;
    },

  },
  methods: {
    LoadingMessage: function () {
      Swal.fire({
        title: "<div class='swal-loading-spinner'></div><div>Đang tải...</div>",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        width: 500,
        customClass: {
          popup: "swal-loading-popup",
          content: "swal-loading-content",
        },
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    },
    checkAuthentication() {
      if (!this.account.token) {
        this.$router.push("/");
      } else {
        accountService
          .kiemTraDangNhap(this.account.token)
          .then((response) => {
            if (response.statusCode == 200) {
              accountService
                .layThongTinNguoiDung(
                  this.account.MaNguoiDung,
                  this.account.token
                )
                .then((response) => {
                  this.accountInfo = response;
                  this.info.TenDangNhap = this.accountInfo.TenDangNhap;
                  this.info.TenHienThi = this.accountInfo.TenHienThi;
                  this.info.Email = this.accountInfo.Email;
                  this.info.SoDienThoai = this.accountInfo.SoDienThoai;
                })
                .catch((error) => {
                  console.log(error);
                  this.onLogout();
                });
            } else if (response.status === 401) {
              console.error("Authentication failed");
            }
          })
          .catch((error) => {
            console.error(error);
            this.onLogout();
          });
      }
    },
    onLogout() {
      localStorage.removeItem("account");
      this.$router.push("/");
      location.reload();
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleNewCfPasswordVisibility() {
      this.showNewCfPassword = !this.showNewCfPassword;
    },
    async showYeuThich() {
      this.isYeuThichVisible = true;
      this.isHoSoVisible = false;
      this.isMatKhauVisible = false;
      this.isNguoiDungVisible = false;
      this.activeButton = "yeu-thich";
      this.LoadingMessage();
      try {
        this.DSYeuThich = await accountService.layDanhSachYeuThich(this.account.MaNguoiDung);
        Swal.close();
      } catch (error) {
        console.log(error);
        this.ServerError();
      }
    },
    showHoSo() {
      this.isHoSoVisible = true;
      this.isMatKhauVisible = false;
      this.isNguoiDungVisible = false;
      this.isYeuThichVisible = false;
      this.activeButton = "ho-so";
    },
    showMatKhau() {
      this.isHoSoVisible = false;
      this.isMatKhauVisible = true;
      this.isNguoiDungVisible = false;
      this.isYeuThichVisible = false;
      this.activeButton = "mat-khau";
    },
    async showNguoiDung() {
      this.isHoSoVisible = false;
      this.isMatKhauVisible = false;
      this.isNguoiDungVisible = true;
      this.isYeuThichVisible = false;
      this.activeButton = "nguoi-dung";
      this.LoadingMessage();
      try {
        this.DSNguoiDung = await accountService.layDanhSachNguoiDung(this.search, this.account.token);
        Swal.close();
      } catch (error) {
        console.log(error);
        this.ServerError();
      }
    },
    async showDichVu(TenDangNhap, MaNguoiDung) {
      this.isHoSoVisible = false;
      this.isMatKhauVisible = false;
      this.isNguoiDungVisible = false;
      this.isDichVuVisible = true;
      this.isYeuThichVisible = false;
      this.activeButton = "dich-vu";
      this.LoadingMessage();
      try {
        await accountService.layDichVuSo().then(async (response) => {
          this.DSDichVuSo = response;
          Swal.close();
          await accountService.layQuyenDichVuSo(
            this.selectedNguoiDung.TenDangNhap
          ).then((response) => {
            this.DSDichVuSoCuaNguoiDung = response;
            Swal.close();
          }).catch((error) => {
            console.log(error);
            this.ServerError();
          });
        })
          .catch((error) => {
            console.log(error);
            this.ServerError();
          });
      } catch (error) {
        console.log(error);
      }
      this.selectedNguoiDung.TenDangNhap = TenDangNhap;
      this.selectedNguoiDung.MaNguoiDung = MaNguoiDung;
    },
    onSuaThongTin() {
      try {
        this.$refs.formInfo.validate().then((result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            const results = accountService.suaThongTin(
              this.info,
              this.account.token
            );
            results
              .then((response) => {
                if (response.statusCode == 200) {
                  this.EditTrue();
                } else {
                  this.EditFalse();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } catch (error) {
        console.log(error);
        this.EditFalse();
      }
    },
    onDoiMatKhau() {
      try {
        this.$refs.formPass.validate().then((result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.pass.MaNguoiDung = this.account.MaNguoiDung;
            const results = accountService.doiMatKhau(
              this.pass,
              this.account.token
            );
            results
              .then((response) => {
                if (response.statusCode == 200) {
                  this.ChangePassTrue();
                  this.pass.MatKhauHienTai = "";
                  this.pass.MatKhauMoi = "";
                  this.nhaplaimatkhaumoi = "";
                } else {
                  this.ChangePassFalse();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } catch (error) {
        console.log(error);
        this.ChangePassFalse();
      }
    },
    EditTrue: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa thông tin thành công!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    EditFalse: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng nhập đầy đủ thông tin cần sửa!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    ChangePassTrue: function () {
      Swal.fire({
        position: "center",
        title: "Đổi mật khẩu thành công!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    ChangePassFalse: function () {
      Swal.fire({
        position: "center",
        title: "Sai mật khẩu vui lòng thử lại!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    Empty: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng nhập đầy đủ thông tin!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    EmptyImage: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn hình ảnh!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      this.selectedImage = event.target.files[0];
    },
    uploadImage() {
      const file = event.target.files[0];
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        this.EmptyImage();
        return;
      } else {
        const formData = new FormData();
        formData.append("image", file);
        const results = fileService.uploadImage(formData);
        results
          .then((response) => {
            if (response.statusCode == 200) {
              this.accountInfo.HinhAnh = response.imageUrl;
              const image = {};
              image.TenDangNhap = this.info.TenDangNhap;
              image.HinhAnh = this.accountInfo.HinhAnh;
              accountService.doiHinhAnh(image, this.account.token);
              location.reload();
            } else {
              this.EmptyImage();
            }
          })
          .catch((error) => {
            console.log(error);
            this.EmptyImage();
          });
      }
    },
    onDoiQuyen(TenDangNhap, Quyen) {
      try {
        this.permission.TenDangNhap = TenDangNhap;
        this.permission.Quyen = Quyen;
        const results = accountService.doiQuyen(
          this.permission,
          this.account.token
        );
        results
          .then((response) => {
            if (response.statusCode == 200) {
              console.log("OK");
            } else {
              this.ChangePassFalse();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async timKiemTaiKhoan() {
      try {
        const results = await accountService.layDanhSachNguoiDung(
          this.search,
          this.account.token
        );
        this.DSNguoiDung = results;
      } catch (error) {
        console.log(error);
      }
    },
    async resetSearch() {
      try {
        const results = await accountService.layDanhSachNguoiDung(
          "",
          this.account.token
        );
        this.DSNguoiDung = results;
      } catch (error) {
        console.log(error);
      }
    },
    async toggleCheckbox(row) {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.selectedNguoiDung.MaNguoiDung;
      thongTinDoi.MaDV = row.MADV;
      thongTinDoi.isCheck = row.isChecked;
      await accountService.doiQuyenDichVuSo(thongTinDoi);
      this.isChecked = true;
    },
    hasMatchingMADV(row) {
      return this.DSDichVuSoCuaNguoiDung.some((item) => item.MADV === row.MADV);
    },
    serverError() {
      Swal.fire({
        position: "center",
        title: "Lỗi server vui lòng thử lại sau!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    async disLike(item) {
      Swal.fire({
        title: 'Bạn xác nhận xóa "' + (item.MADV
          ? item.TENDV
          : item.MAPHCN
            ? item.TENDV + " - " + item.TENPHCN
            : item.MACHUCNANG
              ? item.TENDV +
              " - " +
              item.TENPHCN +
              " - " +
              item.TENCHUCNANG
              : item.MAHDSD && item.MACHUCNANG_1
                ? item.TENDV +
                " - " +
                item.TENPHCN +
                " - " +
                item.TENCHUCNANG +
                " - " +
                item.TIEUDEHDSD

                : item.MAPHIENBAN && item.MACHUCNANG_1
                  ? item.TENDV +
                  " - " +
                  item.TENPHCN +
                  " - " +
                  item.TENCHUCNANG +
                  " - " +
                  item.TIEUDEHDSD +
                  " - " +
                  item.TIEUDEPHIENBAN
                  : item.MAHDSD && !item.MACHUCNANG_1
                    ? item.TENDV + " - " + item.TIEUDEHDSD
                    : item.MAPHIENBAN && !item.MACHUCNANG_1
                      ? item.TENDV +
                      " - " +
                      item.TIEUDEHDSD +
                      " - " +
                      item.TIEUDEPHIENBAN
                      : "Không tìm thấy kết quả!")
          + '" khỏi danh sách yêu thích?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0c62b5",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không", // Swap the text for the Cancel button
        confirmButtonText: "Có", // Swap the text for the OK button
        customClass: {
          actions: "swal-buttons", // Custom CSS class for the dialog
        },
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const thongTinDoi = {};
          thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
          if (item.MAPHIENBAN) {
            thongTinDoi.MaDV = null;
            thongTinDoi.MaHDSD = null;
            thongTinDoi.MaPhienBan = item.MAPHIENBAN;
            thongTinDoi.MaPHCN = null;
            thongTinDoi.MaChucNang = null;
          } else if (item.MAHDSD) {
            thongTinDoi.MaDV = null;
            thongTinDoi.MaHDSD = item.MAHDSD;
            thongTinDoi.MaPhienBan = null;
            thongTinDoi.MaPHCN = null;
            thongTinDoi.MaChucNang = null;
          } else if (item.MACHUCNANG) {
            thongTinDoi.MaDV = null;
            thongTinDoi.MaHDSD = null;
            thongTinDoi.MaPhienBan = null;
            thongTinDoi.MaPHCN = null;
            thongTinDoi.MaChucNang = item.MACHUCNANG;
          } else if (item.MAPHCN) {
            thongTinDoi.MaDV = null;
            thongTinDoi.MaHDSD = null;
            thongTinDoi.MaPhienBan = null;
            thongTinDoi.MaPHCN = item.MAPHCN;
            thongTinDoi.MaChucNang = null;
          } else if (item.MADV) {
            thongTinDoi.MaDV = item.MADV;
            thongTinDoi.MaHDSD = null;
            thongTinDoi.MaPhienBan = null;
            thongTinDoi.MaPHCN = null;
            thongTinDoi.MaChucNang = null;
          }
          thongTinDoi.isCheck = true;
          await accountService.danhDauYeuThich(thongTinDoi)
            .then(async (response) => {
              if (!response) {
                Swal.fire({
                  position: "center",
                  title:
                    'Nội dung  "' + (item.MADV
                      ? item.TENDV
                      : item.MAPHCN
                        ? item.TENDV + " - " + item.TENPHCN
                        : item.MACHUCNANG
                          ? item.TENDV +
                          " - " +
                          item.TENPHCN +
                          " - " +
                          item.TENCHUCNANG
                          : item.MAHDSD && item.MACHUCNANG_1
                            ? item.TENDV +
                            " - " +
                            item.TENPHCN +
                            " - " +
                            item.TENCHUCNANG +
                            " - " +
                            item.TIEUDEHDSD

                            : item.MAPHIENBAN && item.MACHUCNANG_1
                              ? item.TENDV +
                              " - " +
                              item.TENPHCN +
                              " - " +
                              item.TENCHUCNANG +
                              " - " +
                              item.TIEUDEHDSD +
                              " - " +
                              item.TIEUDEPHIENBAN
                              : item.MAHDSD && !item.MACHUCNANG_1
                                ? item.TENDV + " - " + item.TIEUDEHDSD
                                : item.MAPHIENBAN && !item.MACHUCNANG_1
                                  ? item.TENDV +
                                  " - " +
                                  item.TIEUDEHDSD +
                                  " - " +
                                  item.TIEUDEPHIENBAN
                                  : "Không tìm thấy kết quả!")
                    + '" đã xóa khỏi danh sách yêu thích!',
                  icon: "success",
                  confirmButtonColor: "#0c62b5",
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  timerProgressBar: false,
                  width: 500,
                }).then(async () => {
                  // this.DSYeuThich = await accountService.layDanhSachYeuThich(this.account.MaNguoiDung);
                  this.showYeuThich();
                });
              } else {
                this.ServerError();
              }
            })
            .catch((error) => {
              console.log(error);
              this.ServerError();
            });
        } else {
          // The user clicked "Cancel" or closed the dialog
          // Do nothing or handle the cancel action
        }
      });

    },
    async handleLinkYeuThich(item) {
      const dvsItem = this.dvsItems.find((element) => element.id === item.MADV_1);
      let phItem = {};
      if (item.MAPHCN_1) {
        phItem = dvsItem.phItems.find((element) => element.id === item.MAPHCN_1);
      };
      let cnItem = {};
      if (item.MACHUCNANG_1) {
        cnItem = phItem.cnItems.find((element) => element.id === item.MACHUCNANG_1);
      };
      let lItem = {};
      if (item.MALOAI) {
        lItem = cnItem.LoaiItems.find((element) => element.id === item.MALOAI);
      };
      let hdsdItem = {};
      if (item.MAHDSD_1 && item.MACHUCNANG_1) {
        hdsdItem = lItem.HDSDItems.find((element) => element.id === item.MAHDSD_1);
      };
      let pbhdsdItem = {};
      if (item.MAPHIENBAN_1 && item.MACHUCNANG_1) {
        pbhdsdItem = hdsdItem.PbHDSDItems.find((element) => element.id === item.MAPHIENBAN_1);
      };
      let hdsdcItem = {};
      if (item.MAHDSD_1 && !item.MACHUCNANG_1) {
        hdsdcItem = dvsItem.hdsdChungItems.find((element) => element.id === item.MAHDSD_1);
      };
      let pbhdsdcItem = {};
      if (item.MAPHIENBAN_1 && !item.MACHUCNANG_1) {
        pbhdsdcItem = hdsdcItem.pbhdsdChungItems.find((element) => element.id === item.MAPHIENBAN_1);
      };

      const params = {
        dvsItem: dvsItem,
        phItem: phItem,
        cnItem: cnItem,
        lItem: lItem,
        hdsdcItem: hdsdcItem,
        pbhdsdcItem: pbhdsdcItem,
        hdsdItem: hdsdItem,
        pbhdsdItem: pbhdsdItem,
      };
      const queryString = encodeURIComponent(JSON.stringify(params));
      const url = 'danhmuc?param=' + queryString;
      await this.$router.push(url);
      location.reload();
    }
  },
  mounted() {
    this.DSNguoiDung.forEach((row) => {
      row.selectedQuyen = this.itemsQuyen[0].value;
      row.selectedPhanQuyen = this.itemsPhanQuyen[0].value;
    });
  },
};
</script>
<template>
  <AppHeader :dvsItems="dvsItems" />
  <h1 class="w-75 canhgiua mt-2 div-container text-center">QUẢN LÝ TÀI KHOẢN</h1>
  <h5 class="w-75 canhgiua mt-2 div-container">
    Cập nhật thông tin tài khoản của bạn
  </h5>
  <hr class="w-75 canhgiua mt-2 div-container" />

  <div class="w-75 canhgiua mt-3 div-container">
    <div class="div-left">
      <button @click="showHoSo" :class="{ active: activeButton === 'ho-so' }" class="button-hoso">
        HỒ SƠ
      </button>
      <button v-if="this.accountInfo.TenDangNhap &&
        !this.accountInfo.TenDangNhap.includes('@')
        " @click="showMatKhau" :class="{ active: activeButton === 'mat-khau' }" class="button-hoso">
        MẬT KHẨU
      </button>
      <button v-if="checkAdmin === 'Admin'" @click="showNguoiDung" :class="{ active: activeButton === 'nguoi-dung' }"
        class="button-hoso">
        QUẢN LÝ TÀI KHOẢN
      </button>
      <button @click="showYeuThich" :class="{ active: activeButton === 'yeu-thich' }" class="button-hoso">
        DANH SÁCH YÊU THÍCH
      </button>
    </div>

    <div v-if="activeButton === 'ho-so'" class="div-center">
      <h3 class="canhgiua w-75 form-group">HỒ SƠ</h3>
      <div class="canhgiua w-75 form-group mt-3">
        <Form ref="formInfo" :validation-schema="inforFormSchema">
          <div class="mg-bt-tt">
            <label for="tentaikhoan" class="my-custom-font mg-khong font-bold">Tên tài khoản</label>
            <div class="input-container">
              <Field v-model="info.TenDangNhap" :readonly="true" :disabled="true" type="text"
                class="form-control my-custom-font form-radius bg-input" name="tentaikhoan" />
            </div>
          </div>

          <div class="mg-bt-tt">
            <label for="hovaten" class="my-custom-font mg-khong font-bold">Họ và tên</label>
            <div class="input-container">
              <Field type="text" class="form-control my-custom-font form-radius bg-input" placeholder="Nhập họ và tên"
                v-model="info.TenHienThi" name="hovaten" />
              <ErrorMessage name="hovaten" class="error-message" />
            </div>
          </div>

          <div class="mg-bt-tt">
            <label for="email" class="my-custom-font mg-khong font-bold">Email</label>
            <div class="input-container">
              <Field type="text" class="form-control my-custom-font form-radius bg-input" placeholder="Nhập email"
                v-model="info.Email" name="email" />
              <ErrorMessage name="email" class="error-message" />
            </div>
          </div>

          <div class="mg-bt-tt">
            <label for="sodienthoai" class="my-custom-font mg-khong font-bold">Số điện thoại</label>
            <div class="input-container">
              <Field type="text" class="form-control my-custom-font form-radius bg-input" placeholder="Nhập số điện thoại"
                v-model="info.SoDienThoai" name="sodienthoai" />
              <ErrorMessage name="sodienthoai" class="error-message" />
            </div>
          </div>

          <div class="mt-2 padding-button">
            <v-btn @click="onSuaThongTin" class="text-cl-login btn-primary btn bg-tk my-custom-font form-radius">
              LƯU HỒ SƠ
            </v-btn>
          </div>
        </Form>
      </div>
    </div>
    <div v-if="activeButton === 'ho-so'" class="div-right">
      <img class="atv-macdinh" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />

      <div>
        <input type="file" ref="fileInput" style="display: none" @change="uploadImage" />
        <button class="small-round-button" @click="openFileInput">
          <img class="icon-img" src="../icons/Camera.png" alt="" />
        </button>
      </div>
    </div>

    <!-- Mật khẩu -->
    <div v-if="activeButton === 'mat-khau'" class="div-center">
      <h3 class="canhgiua w-75 form-group">MẬT KHẨU</h3>
      <div class="canhgiua w-75 form-group mt-3">
        <Form ref="formPass" :validation-schema="passFormSchema">
          <div class="mg-bt-tt">
            <label for="matkhauhientai" class="my-custom-font mg-khong font-bold">Mật khẩu hiện tại</label>
            <div class="input-container">
              <div class="input-group">
                <Field :type="showPassword ? 'text' : 'password'" v-model="pass.MatKhauHienTai"
                  class="form-control my-custom-font form-radius bg-input" placeholder="Nhập mật khẩu hiện tại"
                  name="matkhauhientai" />
                <i @click="togglePasswordVisibility" :class="eyeIcon"
                  class="padding-eye input-group-addon bg-input style-radius"></i>
              </div>
              <ErrorMessage name="matkhauhientai" class="error-message" />
            </div>
          </div>

          <div class="mg-bt-tt">
            <label for="matkhaumoi" class="my-custom-font mg-khong font-bold">Mật khẩu mới</label>
            <div class="input-container">
              <div class="input-group">
                <Field :type="showNewPassword ? 'text' : 'password'" v-model="pass.MatKhauMoi"
                  class="form-control my-custom-font form-radius bg-input" placeholder="Nhập mật khẩu mới"
                  name="matkhaumoi" />
                <i @click="toggleNewPasswordVisibility" :class="eyeNewIcon"
                  class="padding-eye input-group-addon bg-input style-radius"></i>
              </div>
              <ErrorMessage name="matkhaumoi" class="error-message" />
            </div>
          </div>

          <div class="mg-bt-tt">
            <label for="nhaplaimatkhaumoi" class="my-custom-font mg-khong font-bold">Nhập lại mật khẩu mới</label>
            <div class="input-container">
              <div class="input-group">
                <Field :type="showNewCfPassword ? 'text' : 'password'" v-model="nhaplaimatkhaumoi"
                  class="form-control my-custom-font form-radius bg-input" placeholder="Nhập lại mật khẩu mới"
                  name="nhaplaimatkhaumoi" />
                <i @click="toggleNewCfPasswordVisibility" :class="eyeNewCfIcon"
                  class="padding-eye input-group-addon bg-input style-radius"></i>
              </div>
              <ErrorMessage name="nhaplaimatkhaumoi" class="error-message" />
            </div>
          </div>

          <div class="mt-3 padding-button">
            <v-btn @click="onDoiMatKhau" class="text-cl-login btn-primary btn bg-tk my-custom-font form-radius">
              ĐỔI MẬT KHẨU
            </v-btn>
          </div>
        </Form>
      </div>
    </div>
    <div v-if="activeButton === 'mat-khau'" class="div-right"></div>
    <div v-if="activeButton === 'nguoi-dung'" class="div-nguoidung">
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div>
            <h3 class="ml-5 d-flex align-items-center">DANH SÁCH NGƯỜI DÙNG</h3>
          </div>

          <div class="ml-auto">
            <div class="input-group">
              <input type="search" v-model="search" class="form-control" placeholder="Tìm kiếm" aria-label="Search"
                aria-describedby="search-addon" @input="timKiemTaiKhoan" />
              <div class="input-group-append mr-4">
                <button class="btn btn-primary search-btn" @click="timKiemTaiKhoan" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div>
            <button class="btn btn-primary" @click="resetSearch">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="canhgiua ml-5 mt-3 mb-3 khung-tt form-group" style="max-height: 450px; overflow-y: auto">
        <table class="equal-width-table text-center">
          <thead>
            <tr>
              <th class="td-th td-avt">Ảnh</th>
              <th class="td-th">Tên đăng nhập</th>
              <th class="td-th">Email</th>
              <th class="td-th td-quyen">Quyền</th>
              <th class="td-th td-quyen">Phân quyền</th>
            </tr>
          </thead>
          <tbody>
            <tr class="td-th td-avt" v-for="row in DSNguoiDung" :key="row.TenDangNhap">
              <td class="td-th">
                <img class="avt" :src="serverUrl + row.HinhAnh" alt="" />
              </td>
              <td class="td-th">
                <p class="p-table">{{ row.TenDangNhap }}</p>
              </td>
              <td class="td-th">
                <p class="p-table">{{ row.Email }}</p>
              </td>
              <td class="td-th td-quyen">
                <select v-model="row.Quyen" class="xanh-option text-center"
                  @change="onDoiQuyen(row.TenDangNhap, row.Quyen)" :disabled="row.TenDangNhap === this.info.TenDangNhap">
                  <option v-for="item in itemsQuyen" :value="item.value" :key="item.id">
                    {{ item.label }}
                  </option>
                </select>
              </td>
              <td class="td-th td-quyen">
                <button class="bg-color-xemtt" @click="showDichVu(row.TenDangNhap, row.MaNguoiDung)"
                  :class="{ active: activeButton === 'dich-vu' }" :disabled="row.Quyen === 'EndUser'">
                  Xem dịch vụ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align: center" v-if="DSNguoiDung.length === 0">
        <p>Không tìm thấy người dùng!</p>
      </div>
    </div>

    <div v-if="activeButton === 'dich-vu'" class="div-nguoidung">
      <div class="container">
        <div class="row d-flex justify-content-between">
          <h3 class="ml-5 d-flex align-items-center">
            DANH SÁCH QUYỀN DỊCH VỤ SỐ CỦA {{ selectedNguoiDung.TenDangNhap }}
          </h3>
        </div>
      </div>
      <div class="canhgiua ml-5 mt-3 mb-3 khung-tt form-group" style="max-height: 450px; overflow-y: auto">
        <table class="equal-width-table text-center">
          <thead>
            <tr>
              <th class="td-th">Danh sách dịch vụ số</th>
              <th class="td-th">Quyền</th>
            </tr>
          </thead>
          <tbody>
            <tr class="td-th" v-for="row in DSDichVuSo" :key="row.MADV">
              <td class="td-th">
                <p class="p-table">{{ row.TENDV }}</p>
              </td>
              <td class="td-th">
                <!-- <input type="checkbox" v-if="hasMatchingMADV(row)" v-model="row.isChecked" @change="toggleCheckbox(row)"
                                  checked /> -->
                <input type="checkbox" :checked="hasMatchingMADV(row)" v-model="row.isChecked"
                  @change="toggleCheckbox(row)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Danh sach yeu thich -->
    <div v-if="activeButton === 'yeu-thich'" class="div-nguoidung">
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div>
            <h3 class="ml-5 d-flex align-items-center">DANH SÁCH YÊU THÍCH</h3>
          </div>
          <!-- <div class="ml-auto">
            <div class="input-group">
              <input type="search" v-model="search" class="form-control" placeholder="Tìm kiếm" aria-label="Search"
                aria-describedby="search-addon" @input="timKiemTaiKhoan" />
              <div class="input-group-append mr-4">
                <button class="btn btn-primary search-btn" @click="timKiemTaiKhoan" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div> -->
          <!-- <div>
            <button class="btn btn-primary" @click="resetSearch">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div> -->
        </div>
      </div>

      <div v-if="DSYeuThich.length > 0" class="canhgiua ml-5 mt-3 mb-3 khung-tt form-group"
        style="max-height: 450px; overflow-y: auto">
        <table class="equal-width-table text-center">
          <thead>
            <tr>
              <th class="td-th td-avt">STT</th>
              <th class="td-th">Tên</th>
              <th class="td-th td-ngay">Ngày thích</th>
              <th class="td-th td-quyen">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr class="td-th" v-for="(item, index) in DSYeuThich">
              <td class="td-th td-avt">
                <p class="p-table">{{ index + 1 }}</p>
              </td>
              <td class="td-th td-ct">
                <v-btn @click="handleLinkYeuThich(item)" class="p-table">{{
                  item.MADV
                  ? item.TENDV
                  : item.MAPHCN
                    ? item.TENDV + " - " + item.TENPHCN
                    : item.MACHUCNANG
                      ? item.TENDV +
                      " - " +
                      item.TENPHCN +
                      " - " +
                      item.TENCHUCNANG
                      : item.MAHDSD && item.MACHUCNANG_1
                        ? item.TENDV +
                        " - " +
                        item.TENPHCN +
                        " - " +
                        item.TENCHUCNANG +
                        " - " +
                        item.TIEUDEHDSD

                        : item.MAPHIENBAN && item.MACHUCNANG_1
                          ? item.TENDV +
                          " - " +
                          item.TENPHCN +
                          " - " +
                          item.TENCHUCNANG +
                          " - " +
                          item.TIEUDEHDSD +
                          " - " +
                          item.TIEUDEPHIENBAN
                          : item.MAHDSD && !item.MACHUCNANG_1
                            ? item.TENDV + " - " + item.TIEUDEHDSD
                            : item.MAPHIENBAN && !item.MACHUCNANG_1
                              ? item.TENDV +
                              " - " +
                              item.TIEUDEHDSD +
                              " - " +
                              item.TIEUDEPHIENBAN
                              : "Không tìm thấy kết quả!"
                }}</v-btn>
              </td>
              <td class="td-th td-ngay">
                {{ item.THOIGIANYEUTHICH }}
              </td>
              <td class="td-th td-quyen">
                <button class="bg-color-xemtt" @click="disLike(item)">
                  Bỏ thích
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align: center" class="mt-3 mb-3" v-else>
        <p>Bạn chưa có mục yêu thích nào!</p>
      </div>
    </div>
  </div>
</template>
