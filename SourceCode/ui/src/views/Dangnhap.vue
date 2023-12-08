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
      tendangnhap: yup
        .string()
        .required("Vui lòng nhập tên đăng nhập.")
        .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự.")
        .max(255, "Tên đăng nhập không vượt quá 255 ký tự.")
        .matches(
          /^[A-Za-z0-9]+$/,
          "Tên đăng nhập không được có dấu, kí tự đặc biệt và khoảng trắng."
        ),
      matkhau: yup
        .string()
        .required("Vui lòng nhập mật khẩu.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
        .max(255, "Mật khẩu không vượt quá 255 ký tự.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])\S+$/,
          "Mật khẩu phải chứa ít nhất một ký tự in hoa, một kí tự thường, một ký tự đặc biệt và không chứa khoảng trắng."
        ),
    });
    const accountGoogle = {
      TenDangNhap: "",
      TenHienThi: "",
      MatKhau: "",
      Email: "",
      HinhAnh: "",
    };
    return {
      accountGoogle,
      tendangnhap: "",
      matkhau: "",
      showPassword: false,
      accountFormSchema,
      isLogin: false,
      account: {},
      isTrue: false,
    };
  },

  computed: {
    eyeIcon() {
      return this.showPassword ? "fa fa-eye" : "fa fa-eye-slash";
    },
  },
  methods: {
    LoadingMessage: function () {
      Swal.fire({
        title:
          "<div class='swal-loading-spinner'></div><div>Đang xử lý...</div>",
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
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async onLogin() {
      try {
        this.$refs.form.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
            this.isTrue = false;
          } else {
            this.isTrue = true;
            const account = await accountService.dangNhap(
              this.tendangnhap,
              this.matkhau
            );
            if (account) {
              localStorage.setItem("account", JSON.stringify(account));
              this.$router.push("/");
            } else {
              this.accountLoginMessage();
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    accountLoginMessage: function () {
      Swal.fire({
        position: "center",
        title: "Sai tên đăng nhập hoặc mật khẩu vui lòng nhập lại!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
        footer: '<a href="/dangky">Đăng ký ngay</a>',
      });
    },
    async loginGoogle() {
      try {
        this.LoadingMessage();
        const googleUser = await this.$gAuth.signIn();
        this.accountGoogle.TenDangNhap = googleUser
          .getBasicProfile()
          .getEmail();
        (this.accountGoogle.TenHienThi = googleUser
          .getBasicProfile()
          .getFamilyName()),
          googleUser.getBasicProfile().getGivenName(),
          googleUser.getBasicProfile().getName();
        this.accountGoogle.MatKhau = googleUser.getBasicProfile().getId();
        this.accountGoogle.Email = googleUser.getBasicProfile().getEmail();
        this.accountGoogle.HinhAnh = googleUser.getBasicProfile().getImageUrl();
        if (!this.accountGoogle.TenHienThi) {
          this.accountGoogle.TenHienThi = googleUser
            .getBasicProfile()
            .getEmail();
        }
        if (!this.accountGoogle.HinhAnh) {
          this.accountGoogle.HinhAnh = "avt.png";
        }
        if (
          await accountService.kiemTraTonTaiTenDangNhap(
            googleUser.getBasicProfile().getEmail()
          )
        ) {
          const account = await accountService.dangNhap(
            googleUser.getBasicProfile().getEmail(),
            googleUser.getBasicProfile().getId()
          );
          if (account) {
            localStorage.setItem("account", JSON.stringify(account));
            this.$router.push("/");
            Swal.close();
          } else {
            this.accountLoginMessage();
          }
        } else {
          // await accountService.dangKy(this.accountGoogle);
          localStorage.setItem(
            "accountGoogle",
            JSON.stringify(this.accountGoogle)
          );
          Swal.close();
          this.$router.push("/nhapthongtin");
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "center",
          title: "Lỗi server vui lòng thử lại sau!",
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          timerProgressBar: false,
          width: 500,
        });
      }
    },
    loginFBSuccess(response) {
      // Xử lý khi đăng nhập thành công
      console.log(response);
    },
    loginFBError(error) {
      // Xử lý khi có lỗi đăng nhập
      console.log(error);
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-color-hearder">
    <router-link :to="{ name: 'trangchu' }" class="pd-right">
      <img class="icon" src="../icons/logo.png" alt="Logo VNPT"/>
    </router-link>

    <router-link :to="{ name: 'trangchu' }">
      <h3 class="text-cl-login">Quản lý hướng dẫn sử dụng</h3>
    </router-link>
  </nav>

  <div class="khung max-khung canhgiua form-wrapper">
    <h1 class="font-tk mt-5 mb-4 text-center">Đăng Nhập</h1>
    <div class="canhgiua mwidth-login form-group">
      <Form ref="form" :validation-schema="accountFormSchema">
        <div class="form-group mg-bt-tk">
          <label for="tendangnhap" class="my-custom-font font-bold mg-khong"
            >Tên Đăng Nhập</label
          >
          <div class="input-container">
            <Field
              type="text"
              class="form-control my-custom-font form-radius mb-2 bg-input"
              placeholder="Nhập tên đăng nhập"
              v-model="tendangnhap"
              name="tendangnhap"
            />
            <ErrorMessage name="tendangnhap" class="error-message" />
          </div>
        </div>

        <div class="form-group mg-bt-tk">
          <label for="matkhau" class="my-custom-font font-bold mg-khong">Mật khẩu</label>
          <div class="input-container">
            <div class="input-group">
              <Field
                :type="showPassword ? 'text' : 'password'"
                v-model="matkhau"
                class="form-control my-custom-font form-radius bg-input"
                placeholder="Nhập mật khẩu"
                name="matkhau"
              />
              <i
                @click="togglePasswordVisibility"
                :class="eyeIcon"
                class="padding-eye input-group-addon bg-input style-radius"
              ></i>
            </div>
            <ErrorMessage name="matkhau" class="error-message" />
          </div>
        </div>

        <div class="canhgiua canhgiua-dn mb-2">
          <v-btn
            :disabled="isTrue"
            @click="onLogin"
            class="btn-dn text-cl-login btn-primary btn bg-tk my-custom-font form-radius"
          >
            Đăng nhập ⇀
          </v-btn>
        </div>
      </Form>

      <table class="w-100 canhgiua text-center mb-4">
        <tr>
          <td colspan="3">
            <p class="text-color text-font-or mb-2">Hoặc đăng nhập với</p>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <button @click="loginGoogle" class="button-google">
              <img src="../icons/Google.png" alt="" />
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span>
              <p class="text-dangky">
                Bạn chưa có tài khoản?
                <button class="button-dangkyngay">
                  <router-link :to="{ name: 'dangky' }">
                    Đăng kí ngay
                  </router-link>
                </button>
              </p>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
