<script>
import "../assets/css/taikhoan.css";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { accountService } from "@/services/service";
import Swal from "sweetalert2";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const accountFormSchema = yup.object().shape({
      TenDangNhap: yup
        .string()
        .required("Vui lòng nhập tên đăng nhập.")
        .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự.")
        .max(255, "Tên đăng nhập không vượt quá 255 ký tự.")
        .matches(
          /^[A-Za-z0-9]+$/,
          "Tên đăng nhập không được có dấu, kí tự đặc biệt và khoảng trắng."
        )
        .test(
          "is-unique",
          "Tên đăng nhập đã tồn tại vui lòng chọn tên đăng nhập khác.",
          async function (value) {
            const exists = await accountService.kiemTraTonTaiTenDangNhap(value);
            return !exists;
          }
        ),
      TenHienThi: yup
        .string()
        .required("Vui lòng nhập Họ và Tên.")
        .min(6, "Họ và Tên phải có ít nhất 6 ký tự.")
        .max(255, "Họ và Tên không vượt quá 255 ký tự.")
        .matches(
          /^[\p{L}][\p{L} ]+[\p{L}]$/u,
          "Họ và tên không chứa kí tự đặc biệt."
        ),
      MatKhau: yup
        .string()
        .required("Vui lòng nhập mật khẩu.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
        .max(255, "Mật khẩu không vượt quá 255 ký tự.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])\S+$/,
          "Mật khẩu phải chứa ít nhất một ký tự in hoa, một kí tự thường, một ký tự đặc biệt và không chứa khoảng trắng."
        ),
      NhapLaiMatKhau: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu.")
        .oneOf(
          [yup.ref("MatKhau")],
          "Mật khẩu nhập lại phải trùng với mật khẩu đã nhập."
        ),
      SoDienThoai: yup
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
            const exists = await accountService.kiemTraTonTaiSoDienThoai(value);
            return !exists;
          }
        ),
      Email: yup
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
            const exists = await accountService.kiemTraTonTaiEmail(value);
            return !exists;
          }
        ),
    });
    const account = {
      TenDangNhap: "",
      TenHienThi: "",
      MatKhau: "",
      SoDienThoai: "",
      Email: "",
      HinhAnh: "avt.png",
    };
    return {
      account,
      NhapLaiMatKhau: "",
      accountFormSchema,
      showPassword: false,
      showCfPassword: false,
      isTrue: false,
    };
  },
  computed: {
    eyeIcon() {
      return this.showPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
    eyeCfIcon() {
      return this.showCfPassword ? "fas fa-eye-slash" : "fas fa-eye";
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleCfPasswordVisibility() {
      this.showCfPassword = !this.showCfPassword;
    },
    async onAddAccount() {
      try {
        this.$refs.form.validate().then((result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
            this.isTrue = false;
          } else {
            this.isTrue = true;
            accountService.dangKy(this.account);
            this.accountAddedMessage();
          }
        });
      } catch (error) {
        console.log(error);
        this.accountAddedMessageFalse();
      }
    },
    accountAddedMessage: function () {
      Swal.fire({
        position: "center",
        title: "Đã đăng kí thành công!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
        confirmButtonText: "Đăng nhập ngay",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Gọi hàm khi người dùng nhấp vào nút "Đăng nhập ngay"
          const account = await accountService.dangNhap(
            this.account.TenDangNhap,
            this.account.MatKhau
          );
          if (account) {
            localStorage.setItem("account", JSON.stringify(account));
            this.$router.push("/");
          } else {
            this.accountLoginMessage();
          }
        }
      });
    },
    accountAddedMessageFalse: function () {
      Swal.fire({
        position: "center",
        title: "Đăng kí thất bại!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    resetForm() {
      this.account.TenDangNhap = "";
      this.account.TenHienThi = "";
      this.account.MatKhau = "";
      this.account.SoDienThoai = "";
      this.account.Email = "";
      this.NhapLaiMatKhau = "";
    },
  },
};
</script>
<template>
  <nav class="navbar navbar-expand navbar-dark bg-tk">
    <router-link :to="{ name: 'trangchu' }" class="pd-right">
      <img class="icon" src="../icons/logo.png" alt="Logo VNPT" />
    </router-link>

    <router-link :to="{ name: 'trangchu' }">
      <h3 class="text-cl-login">Quản lý hướng dẫn sử dụng</h3>
    </router-link>
  </nav>
  <Form ref="form" :validation-schema="accountFormSchema" class="form-wrapper">
    <div class="khung max-khung canhgiua">
      <h3 class="font-tk mt-4 mb-4 text-center">Đăng ký tài khoản</h3>
      <div class="canhgiua mwidth form-group mb-4">
        <table class="width-form-fill canhgiua">
          <tr>
            <td>
              <label for="tendangnhap" class="my-custom-font mb-0 font-bold"
                >Tên Đăng Nhập</label
              >
            </td>
            <td>
              <div class="input-container">
                <Field
                  class="form-control my-custom-font form-radius bg-input"
                  placeholder="Nhập tên đăng nhập"
                  v-model="account.TenDangNhap"
                  name="TenDangNhap"
                />
                <ErrorMessage name="TenDangNhap" class="error-message" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="hovaten" class="my-custom-font mb-0 font-bold">Họ và Tên</label>
            </td>
            <td>
              <div class="input-container">
                <Field
                  class="form-control my-custom-font form-radius bg-input"
                  placeholder="Nhập họ và tên"
                  v-model="account.TenHienThi"
                  name="TenHienThi"
                />
                <ErrorMessage name="TenHienThi" class="error-message" />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label class="my-custom-font mb-0 font-bold">Mật khẩu</label>
            </td>
            <td>
              <div class="input-container">
                <div class="input-group">
                  <Field
                    class="form-control my-custom-font form-radius bg-input"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="account.MatKhau"
                    placeholder="Nhập mật khẩu"
                    name="MatKhau"
                  />
                  <div
                    class="input-group-addon bg-input style-radius"
                    @click="togglePasswordVisibility"
                  >
                    <i :class="eyeIcon" class="padding-eye"></i>
                  </div>
                </div>
                <ErrorMessage name="MatKhau" class="error-message" />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label class="my-custom-font mb-0 font-bold">Nhập lại mật khẩu</label>
            </td>
            <td>
              <div class="input-container">
                <div class="input-group" id="show_hide_password">
                  <Field
                    :type="showCfPassword ? 'text' : 'password'"
                    v-model="NhapLaiMatKhau"
                    class="form-control my-custom-font form-radius bg-input"
                    placeholder="Nhập lại mật khẩu"
                    name="NhapLaiMatKhau"
                  />
                  <div
                    class="input-group-addon bg-input style-radius"
                    @click="toggleCfPasswordVisibility"
                  >
                    <i :class="eyeCfIcon" class="padding-eye"></i>
                  </div>
                </div>
                <ErrorMessage name="NhapLaiMatKhau" class="error-message" />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label class="my-custom-font mb-0 font-bold">Số điện thoại</label>
            </td>
            <td>
              <div class="input-container">
                <Field
                  class="form-control my-custom-font form-radius bg-input"
                  placeholder="Nhập số điện thoại"
                  v-model="account.SoDienThoai"
                  name="SoDienThoai"
                />
                <ErrorMessage name="SoDienThoai" class="error-message" />
              </div>
            </td>
          </tr>

          <tr>
            <td class="w-td-1">
              <label class="my-custom-font mb-0 font-bold">Email</label>
            </td>
            <td class="w-td-2">
              <div class="input-container">
                <Field
                  class="form-control my-custom-font form-radius bg-input"
                  placeholder="Nhập Email"
                  v-model="account.Email"
                  name="Email"
                />
                <ErrorMessage name="Email" class="error-message" />
              </div>
            </td>
          </tr>

          <tr>
            <td></td>
            <td class="mt-2 td-end-tk">
              <v-btn
                @click="onAddAccount"
                :disabled="isTrue"
                class="btn-dn text-cl-login btn-primary btn bg-tk my-custom-font form-radius"
              >
                Đăng ký ⇀
              </v-btn>
              <label class="text-dangky"> Bạn đã có tài khoản? </label>
              <button class="button-dangnhapngay">
                <router-link :to="{ name: 'dangnhap' }">
                  Đăng nhập ngay
                </router-link>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </Form>
</template>
