<script>
import AppHeader from "@/components/AppHeader.vue";
import SidebarNavigation from "../components/SidebarNavigation.vue";
import Content from "../components/Content.vue";

import { accountService } from "@/services/service";
import "../assets/app.css";
import Swal from "sweetalert2";
import VueClientRecaptcha from 'vue-client-recaptcha';
import { ref } from "vue";

export default {
  data() {
    return {
      account: {},
      accountInfo: {},
      dvsItems: [],
      dvsItem: {},
      phItem: {},
      hdsdcItem: {},
      cnItem: {},
      lItem: {},
      hdsdItem: {},
      pbhdsdItem: {},
      pbhdsdcItem: {},
      captchaResponse: '',
      checkCaptcha: true,
    };
  },
  async created() {
    this.LoadingMessage(); // Display the loading message
    const accountData = localStorage.getItem("account");
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
    } finally {
      Swal.close(); // Close the loading message
    }
    if (this.$route.query.param && this.lItem.id === 1) {
      if (this.accountInfo.Quyen !== 'Admin' || await accountService.checkQuyenDichVuSo(
        this.account.MaNguoiDung,
        this.dvsItem.id
      )) {
        Swal.fire({
          position: "center",
          title:
            'Bạn không có quyền truy cập vào đường dẫn chia sẻ này!',
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          timerProgressBar: false,
          width: 500,
        }).then(() => {
          this.$router.push("/");
        });
      }
    }
  },
  components: {
    AppHeader,
    SidebarNavigation,
    Content,
    VueClientRecaptcha,
  },
  setup() {
    const inputValue = ref(null); // Move this line to the component's setup() function

    const getCaptchaCode = (value) => {
      /* you can access captcha code */
      console.log(value);
    };

    const checkValidCaptcha = (value) => {
      /* expected return boolean if your value and captcha code are same return True otherwise return False */
      return value;
    };

    return {
      inputValue,
      getCaptchaCode,
      checkValidCaptcha,
    };
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
    async checkAuthentication() {
      if (!this.account.token) {
        if (this.$route.query.param) {
          this.checkCaptcha = true;
        }
      } else {
        return accountService
          .kiemTraDangNhap(this.account.token)
          .then((response) => {
            if (response.statusCode == 200) {
              return accountService
                .layThongTinNguoiDung(
                  this.account.MaNguoiDung,
                  this.account.token
                )
                .then((response) => {
                  this.accountInfo = response;
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
      location.reload();
    },
    handleDvsItems(dvsItems) {
      this.dvsItems = dvsItems;
    },
    handleDvsItem(item) {
      this.dvsItem = item;
    },
    handlePhItem(phItem) {
      this.phItem = phItem;
    },
    handleHdsdcItem(hdsdcItem) {
      this.hdsdcItem = hdsdcItem;
    },
    handleCnItem(cnItem) {
      this.cnItem = cnItem;
    },
    handleLItem(lItem) {
      this.lItem = lItem;
    },
    handleHdsdItem(hdsdItem) {
      this.hdsdItem = hdsdItem;
    },
    handlePbhdsdItem(pbhdsdItem) {
      this.pbhdsdItem = pbhdsdItem;
    },
    handlePbhdsdcItem(pbhdsdcItem) {
      this.pbhdsdcItem = pbhdsdcItem;
    },
    check() {
      if (this.checkValidCaptcha) {
        this.checkCaptcha = false
      }
    },
  },
  mounted() {
    if (this.$route.query.param) {
      const queryString = decodeURIComponent(this.$route.query.param);
      const parsedObject = JSON.parse(queryString);
      this.dvsItem = parsedObject.dvsItem;
      this.phItem = parsedObject.phItem;
      this.cnItem = parsedObject.cnItem;
      this.lItem = parsedObject.lItem;
      this.hdsdItem = parsedObject.hdsdItem;
      this.pbhdsdItem = parsedObject.pbhdsdItem;
      this.hdsdcItem = parsedObject.hdsdcItem;
      this.pbhdsdcItem = parsedObject.pbhdsdcItem;
    }
  },
};
</script>

<template>
  <AppHeader :dvsItems="dvsItems" />
  <div class="container-content mt-3 mb-3">
    <div class="sidebar">
      <SidebarNavigation :dvsItems="dvsItems" @dvsItem="handleDvsItem" @hdsdcItem="handleHdsdcItem"
        @pbhdsdcItem="handlePbhdsdcItem" @phItem="handlePhItem" @cnItem="handleCnItem" @lItem="handleLItem"
        @hdsdItem="handleHdsdItem" @pbhdsdItem="handlePbhdsdItem" />
    </div>
    <div v-if="!account.token && $route.query.param && checkCaptcha" class="sample-captcha content mt-5">
      <h3 class="h3-center">Vui lòng nhập mã Captcha</h3>
      <p class="h3-center">Hãy 
        <router-link :to="{ name: 'dangky' }">
          đăng ký
        </router-link>
        hoặc
        <router-link :to="{ name: 'dangnhap' }">
          đăng nhập
        </router-link>
         đăng nhập để bỏ qua mã Captcha!</p>
      <div class="captcha mt-5">
        <VueClientRecaptcha :value="inputValue" @getCode="getCaptchaCode" @isValid="checkValidCaptcha" />
        <input type="text" v-model="inputValue" class="mt-3" />
        <br>
        <v-btn class="btn-captcha btn mt-3" @click="check">Gửi</v-btn>
      </div>

    </div>
    <div v-else class="content">
      <Content @dvsItems="handleDvsItems" :dvsItems="dvsItems" :dvsItem="dvsItem" :hdsdcItem="hdsdcItem"
        :pbhdsdcItem="pbhdsdcItem" :phItem="phItem" :cnItem="cnItem" :lItem="lItem" :hdsdItem="hdsdItem"
        :pbhdsdItem="pbhdsdItem" @dvsItem="handleDvsItem" @hdsdcItem="handleHdsdcItem" @pbhdsdcItem="handlePbhdsdcItem"
        @phItem="handlePhItem" @cnItem="handleCnItem" @lItem="handleLItem" @hdsdItem="handleHdsdItem"
        @pbhdsdItem="handlePbhdsdItem" />
    </div>

  </div>
</template>
<style>
@import url("/node_modules/vue-client-recaptcha/dist/style.css");
</style>
