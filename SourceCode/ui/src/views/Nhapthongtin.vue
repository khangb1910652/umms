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
    const inforFormSchema = yup.object().shape({
      TenHienThi: yup
        .string()
        .required("Vui lòng nhập Họ và Tên.")
        .min(6, "Họ và Tên phải có ít nhất 6 ký tự.")
        .max(255, "Họ và Tên không vượt quá 255 ký tự.")
        .matches(
          /^[\p{L}][\p{L} ]+[\p{L}]$/u,
          "Họ và tên không chứa kí tự đặc biệt."
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
    });
    const account = {
      TenDangNhap: "",
      TenHienThi: "",
      MatKhau: "",
      SoDienThoai: "",
      Email: "",
      HinhAnh: "",
    };
    return {
      inforFormSchema,
      account,
    };
  },
  created() {
    const accountData = localStorage.getItem("accountGoogle");
    if (accountData) {
      const accountGoogle = JSON.parse(accountData);
      this.account.TenDangNhap = accountGoogle.TenDangNhap;
      this.account.HinhAnh = accountGoogle.HinhAnh;
      this.account.MatKhau = accountGoogle.MatKhau;
      this.account.Email = accountGoogle.Email;
    }
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      if (this.account.TenDangNhap) {
        console.log("ok");
      } else {
        this.$router.push("/");
      }
    },
    Empty: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng nhập mật đầy đủ thông tin!",
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    onFinish() {
      try {
        this.$refs.form.validate().then((result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
            this.Empty();
          } else {
            const results = accountService.dangKy(this.account);
            results
              .then((response) => {
                if (response.statusCode == 200) {
                  const account = accountService.dangNhap(
                    this.account.TenDangNhap,
                    this.account.MatKhau
                  );
                  account.then((response) => {
                    localStorage.removeItem("accountGoogle");
                    localStorage.setItem("account", JSON.stringify(response));
                    this.$router.push("/");
                  });
                } else {
                  this.Empty();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } catch (error) {
        console.log(error);
        this.Empty();
      }
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-color-hearder">
    <router-link :to="{ name: 'trangchu' }" class="pd-right">
      <img class="icon" src="../icons/logo.png" alt="Logo VNPT" />
    </router-link>

    <router-link :to="{ name: 'trangchu' }">
      <h3 class="text-cl-login">Quản lý hướng dẫn sử dụng</h3>
    </router-link>
  </nav>

  <div class="mt-5 khung max-khung canhgiua">
    <Form ref="form" :validation-schema="inforFormSchema">
      <h1 class="font-tk mt-5 mb-5 text-center">Nhập thông tin</h1>
      <div class="canhgiua form-group">
        <table class="canhgiua width-form-fill w-75">
          <tr>
            <td>
              <label for="TenDangNhap" class="my-custom-font font-bold mg-khong"
                >Tên Đăng Nhập</label
              >
            </td>
            <td>
              <div class="input-container">
                <Field
                  :readonly="true"
                  :disabled="true"
                  class="form-control my-custom-font form-radius bg-input"
                  placeholder="Nhập tên đăng nhập"
                  v-model="account.TenDangNhap"
                  name="TenDangNhap"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="TenHienThi" class="my-custom-font font-bold  mg-khong"
                >Họ và Tên</label
              >
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
              <label class="my-custom-font font-bold  mg-khong">Số điện thoại</label>
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
          <tr class="canhgiua">
            <td></td>
            <td>
              <div class="mt-2 padding-button">
                <v-btn
                  type="submit"
                  @click="onFinish"
                  class="text-cl-login btn-primary btn bg-tk my-custom-font form-radius"
                >
                  Hoàn thành ⇀
                </v-btn>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div class="canhgiua text-center mb-5">
        <label class="text-dangky"> Bạn đã có tài khoản? </label>
        <button class="button-dangnhapngay ml-2">
          <router-link :to="{ name: 'dangnhap' }"> Đăng nhập ngay </router-link>
        </button>
      </div>
    </Form>
  </div>
</template>
