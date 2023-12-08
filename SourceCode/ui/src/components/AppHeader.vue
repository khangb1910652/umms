<script>
import "../assets/css/header.css";
import { accountService } from "@/services/service";

export default {
  props: {
    dvsItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showDiv: false,
      serverUrl: "http://localhost:8080/images/",
      isAuthentication: false,
      accountInfo: {},
      account: {},
      isLoadingImage: false,
      showDivSearch: false,
      dsSearch: [],
      inputSearch: "",
      thongBaoVisible: false,
      dsThongBao: [],
      dsThongBaoChuaDoc: [],
      tatCaVisible: true,
      chuaDocVisible: false,
    };
  },
  created() {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      this.account = JSON.parse(accountData);
    }
    this.checkAuthentication();
  },
  methods: {
    handleKeyPress(event) {
      if (event.key === "Enter") {
        this.search();
      }
    },
    handleClickOutside(event) {
      const target = event.target;
      const searchDiv = this.$refs.searchDiv;

      if (searchDiv && !searchDiv.contains(target)) {
        this.showDivSearch = false;
      }
    },
    checkAuthentication() {
      if (!this.account.token) {
        // this.$router.push("/");
      } else {
        accountService
          .kiemTraDangNhap(this.account.token)
          .then((response) => {
            if (response.statusCode == 200) {
              this.isAuthentication = true;
              accountService
                .layThongTinNguoiDung(
                  this.account.MaNguoiDung,
                  this.account.token
                )
                .then((response) => {
                  this.accountInfo = response;
                  this.isLoadingImage = true;
                })
                .catch((error) => {
                  console.log(error);
                  this.onLogout();
                });
            } else if (response.status === 401) {
              // Token hết hạn, đăng xuất người dùng và chuyển hướng về trang đăng nhập
              this.onLogout();
            } else {
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
      this.$router.push("/");
    },
    proFile() {
      this.$router.push("/thongtintaikhoan");
    },
    getUserName(email) {
      if (email.includes("@")) {
        return email.split("@")[0];
      } else {
        return email;
      }
    },
    handleClick() {
      if (this.$route.path === "/danhmuc") {
        location.reload();
      } else {
        this.$router.push({ name: "danhmuc" });
      }
    },
    async search() {
      this.dsSearch = await accountService.timKiemChung(this.inputSearch);
      this.showDivSearch = true;
      this.showDiv = false;
      this.thongBaoVisible = false;
    },
    async handleSelected(item) {
      const dvsItem = this.dvsItems.find(
        (element) => element.id === item.MADV_1
      );
      let phItem = {};
      if (item.MAPHCN_1) {
        phItem = dvsItem.phItems.find(
          (element) => element.id === item.MAPHCN_1
        );
      }
      let cnItem = {};
      if (item.MACHUCNANG_1) {
        cnItem = phItem.cnItems.find(
          (element) => element.id === item.MACHUCNANG_1
        );
      }
      let lItem = {};
      if (item.MALOAI) {
        lItem = cnItem.LoaiItems.find((element) => element.id === item.MALOAI);
      }
      let hdsdItem = {};
      if (item.MAHDSD_1 && item.MACHUCNANG_1) {
        hdsdItem = lItem.HDSDItems.find(
          (element) => element.id === item.MAHDSD_1
        );
      }
      let pbhdsdItem = {};
      if (item.MAPHIENBAN_1 && item.MACHUCNANG_1) {
        pbhdsdItem = hdsdItem.PbHDSDItems.find(
          (element) => element.id === item.MAPHIENBAN_1
        );
      }
      let hdsdcItem = {};
      if (item.MAHDSD_1 && !item.MACHUCNANG_1) {
        hdsdcItem = dvsItem.hdsdChungItems.find(
          (element) => element.id === item.MAHDSD_1
        );
      }
      let pbhdsdcItem = {};
      if (item.MAPHIENBAN_1 && !item.MACHUCNANG_1) {
        pbhdsdcItem = hdsdcItem.pbhdsdChungItems.find(
          (element) => element.id === item.MAPHIENBAN_1
        );
      }

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
    },
    async showTatCaThongBao() {
      
      this.tatCaVisible = true;
      this.chuaDocVisible = false;
    },
    async showThongBaoChuaDoc() {
      
      this.tatCaVisible = false;
      this.chuaDocVisible = true;
    },
    async onDaDocThongBao(item) {
      await accountService.docThongBao(item.MABL)
        .then(async () => {
          const dvsItem = this.dvsItems.find(
            (element) => element.id === item.MADV_1
          );
          let phItem = {};
          if (item.MAPHCN_1) {
            phItem = dvsItem.phItems.find(
              (element) => element.id === item.MAPHCN_1
            );
          }
          let cnItem = {};
          if (item.MACHUCNANG_1) {
            cnItem = phItem.cnItems.find(
              (element) => element.id === item.MACHUCNANG_1
            );
          }
          let lItem = {};
          if (item.MALOAI) {
            lItem = cnItem.LoaiItems.find((element) => element.id === item.MALOAI);
          }
          let hdsdItem = {};
          if (item.MAHDSD_1 && item.MACHUCNANG_1) {
            hdsdItem = lItem.HDSDItems.find(
              (element) => element.id === item.MAHDSD_1
            );
          }
          let pbhdsdItem = {};
          if (item.MAPHIENBAN_1 && item.MACHUCNANG_1) {
            pbhdsdItem = hdsdItem.PbHDSDItems.find(
              (element) => element.id === item.MAPHIENBAN_1
            );
          }
          let hdsdcItem = {};
          if (item.MAHDSD_1 && !item.MACHUCNANG_1) {
            hdsdcItem = dvsItem.hdsdChungItems.find(
              (element) => element.id === item.MAHDSD_1
            );
          }
          let pbhdsdcItem = {};
          if (item.MAPHIENBAN_1 && !item.MACHUCNANG_1) {
            pbhdsdcItem = hdsdcItem.pbhdsdChungItems.find(
              (element) => element.id === item.MAPHIENBAN_1
            );
          }

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
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchComments() {
      try {
        this.dsThongBaoChuaDoc = await accountService.layThongBaoChuaDoc(this.accountInfo.Quyen, this.account.MaNguoiDung);
        this.dsThongBao = await accountService.layThongBao(this.accountInfo.Quyen, this.account.MaNguoiDung);
      } catch (error) {
        console.log(error);
      }
    },
    startFetchingComments() {
      // Gọi hàm fetchComments ban đầu
      this.fetchComments();

      // Thiết lập chạy định kỳ hàm fetchComments sau mỗi 10 giây
      setInterval(() => {
        this.fetchComments();
      }, 10000);
    },
    showDivTaiKhoan() {
      this.showDiv = !this.showDiv;
      this.thongBaoVisible = false;
      this.showDivSearch = false;
    },
    showDivThongBao() {
      this.thongBaoVisible = !this.thongBaoVisible;
      this.showDiv = false;
      this.showDivSearch = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.startFetchingComments();
  },
  // destroyed() {
  //   document.removeEventListener("click", this.handleClickOutside);
  // },
};
</script>
<template>
  <nav class="navbar navbar-expand navbar-dark bg-color-hearder input-group">
    <router-link :to="{ name: 'trangchu' }" class="pd-right">
      <img class="icon" src="../icons/logo.png" alt="Logo VNPT" />
    </router-link>

    <router-link :to="{ name: 'trangchu' }" class="pd-right" :class="{
      'text-ql':
        $route.name === 'danhmuc' || $route.name === 'thongtintaikhoan',
    }">
      <h3 class="text-cl-login">Quản lý hướng dẫn sử dụng</h3>
    </router-link>

    <router-link :to="{ name: 'danhmuc' }" class="pd-right">
      <h3 class="text-cl-login" @click="handleClick">Dịch vụ số</h3>
    </router-link>

    <div class="ml-auto search-header input-group">
      <input v-if="$route.path !== '/'" type="search" class="form-control bg-search" placeholder="Tìm kiếm"
        aria-label="Search" aria-describedby="search-addon" v-model="inputSearch" @keyup="handleKeyPress" />
      <div v-if="$route.path !== '/'" class="input-group-append">
        <v-btn type="button" @click="search" class="btn btn-primary search-btn">
          <i class="fas fa-search"></i>
        </v-btn>
      </div>
      <div v-if="showDivSearch" ref="searchDiv" class="search-div-header mt-2"
        :class="{ 'show-div-search': showDivSearch }">
        <div class="canhgiua">
          <table v-if="dsSearch" v-for="item in dsSearch" class="list-item-ct">
            <tr @click="handleSelected(item)">
              {{
                item.MADV
                ? item.TENDV + " - Dịch vụ số"
                : item.MAPHCN
                  ? item.TENPHCN + " - Phân hệ chức năng (" + item.TENDV + ")"
                  : item.MACHUCNANG
                    ? item.TENCHUCNANG +
                    " - Chức năng (" +
                    item.TENDV +
                    " - " +
                    item.TENPHCN +
                    ")"
                    : item.MAHDSD && item.MACHUCNANG_1
                      ? item.TIEUDEHDSD +
                      " - HDSD (" +
                      item.TENDV +
                      " - " +
                      item.TENCHUCNANG +
                      ")"
                      : item.MAPHIENBAN && item.MACHUCNANG_1
                        ? item.TIEUDEPHIENBAN +
                        " - Phiên bản HDSD (" +
                        item.TENDV +
                        " - " +
                        item.TENCHUCNANG +
                        " - " +
                        item.TIEUDEHDSD +
                        ") "
                        : item.MAHDSD && !item.MACHUCNANG_1
                          ? item.TIEUDEHDSD + " - HDSD chung (" + item.TENDV + ")"
                          : item.MAPHIENBAN && !item.MACHUCNANG_1
                            ? item.TIEUDEPHIENBAN +
                            " - Phiên bản HDSD chung (" +
                            item.TENDV +
                            " - " +
                            item.TIEUDEHDSD +
                            ") "
                            : "Không tìm thấy kết quả!"
              }}
            </tr>
          </table>
          <table v-else class="list-item-ct">
            <tr>
              Không tìm thấy kết quả!
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div v-if="isAuthentication">
      <table>
        <tr>
          <td>
            <v-btn v-if="dsThongBaoChuaDoc.length > 0" tyle="button" class="notification-button mr-2" @click="showDivThongBao" :data-count="dsThongBaoChuaDoc.length">
              <img class="icon" src="../icons/Chuong.png" alt="Chuong" />
            </v-btn>
            <v-btn v-else tyle="button" @click="showDivThongBao" class="mr-2">
              <img class="icon" src="../icons/Chuong.png" alt="Chuong" />
            </v-btn>
          </td>
          <td>
            <img v-if="isLoadingImage" class="avt" :src="serverUrl + accountInfo.HinhAnh" @click="showDivTaiKhoan"
              alt="Hình đại diện" />
          </td>
        </tr>
      </table>

      <!-- Thông báo -->
      <div v-if="thongBaoVisible" class="thong-bao-div">
        <div class="ml-3 mt-3">
          <h3 class="text-left">Thông báo</h3>
          <v-btn tyle="button" class="btn btn-thong-bao mr-1" @click="showTatCaThongBao"
            :class="{ active: tatCaVisible }">
            Tất cả
          </v-btn>
          <v-btn tyle="button" class="btn btn-thong-bao" @click="showThongBaoChuaDoc"
            :class="{ active: chuaDocVisible }">
            Chưa đọc
          </v-btn>
        </div>
        <div class="canhgiua mt-3 padding-button chua-doc" v-if="tatCaVisible">
          <table v-if="dsThongBao" v-for="item in dsThongBao" class="list-item-ct">
            <tr >
              <td class="">
                <table :class="(item.THONGBAO === 'true') ? 'item-tat-ca' : 'item-chua-doc'" @click="onDaDocThongBao(item)">
                  <tr>
                    <td>
                      <img class="atv-comment" :src="serverUrl + item.HINHANH" alt="" />
                    </td>
                    <td>
                      <b>{{ item.TENHIENTHI }}</b> {{ item.TRALOI ? "đã trả lời bình luận của bạn trong" : "đã bình luận trong"}} <b>{{
                        item.MADV
                        ? item.TENDV
                        : item.MAPHCN
                          ? item.TENPHCN
                          : item.MACHUCNANG
                            ? item.TENCHUCNANG
                            : item.MAHDSD && item.MACHUCNANG_1
                              ? item.TIEUDEHDSD
                              : item.MAPHIENBAN && item.MACHUCNANG_1
                                ? item.TIEUDEPHIENBAN
                                : item.MAHDSD && !item.MACHUCNANG_1
                                  ? item.TIEUDEHDSD
                                  : item.MAPHIENBAN && !item.MACHUCNANG_1
                                    ? item.TIEUDEPHIENBAN
                                    : "Đang tải!"
                      }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>

                    </td>
                    <td>
                      {{ item.THOIGIANBINHLUAN }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table v-else class="list-item-ct">
            <tr>
              Không có thông báo mới!
            </tr>
          </table>
        </div>

        <div class="canhgiua mt-3 padding-button chua-doc" v-if="chuaDocVisible">
          <table v-if="dsThongBaoChuaDoc" v-for="item in dsThongBaoChuaDoc" class="list-item-ct">
            <tr>
              <td class="">
                <table class="item-chua-doc" @click="onDaDocThongBao(item)">
                  <tr>
                    <td>
                      <img class="atv-comment" :src="serverUrl + item.HINHANH" alt="" />
                    </td>
                    <td>
                      <b>{{ item.TENHIENTHI }}</b> {{ item.TRALOI ? "đã trả lời bình luận của bạn trong" : "đã bình luận trong"}} <b>{{
                        item.MADV
                        ? item.TENDV
                        : item.MAPHCN
                          ? item.TENPHCN
                          : item.MACHUCNANG
                            ? item.TENCHUCNANG
                            : item.MAHDSD && item.MACHUCNANG_1
                              ? item.TIEUDEHDSD
                              : item.MAPHIENBAN && item.MACHUCNANG_1
                                ? item.TIEUDEPHIENBAN
                                : item.MAHDSD && !item.MACHUCNANG_1
                                  ? item.TIEUDEHDSD
                                  : item.MAPHIENBAN && !item.MACHUCNANG_1
                                    ? item.TIEUDEPHIENBAN
                                    : "Đang tải!"
                      }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>

                    </td>
                    <td>
                      {{ item.THOIGIANBINHLUAN }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table v-else class="list-item-ct">
            <tr>
              Không có thông báo mới!
            </tr>
          </table>
        </div>
      </div>

      <!-- Tai khoan -->
      <div v-if="showDiv" class="logout-div">
        <div class="canhgiua mt-3 padding-button">
          <table>
            <tr>
              <td class="text-center">
                <img class="avt" :src="serverUrl + accountInfo.HinhAnh" @click="showDiv = !showDiv" alt="Hình đại diện" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>
                <p class="text-center">
                  {{ getUserName(accountInfo.TenHienThi) }}
                </p>
              </td>
            </tr>
            <tr>
              <td class="text-center">
                <button @click="proFile" class="button-profile">
                  Tài khoản
                </button>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td class="text-center">
                <button @click="onLogout" class="button-profile">
                  Đăng xuất
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <table>
        <tr>
          <td class="pd-right pd-left">
            <button class="button-in-home btn">
              <router-link :to="{ name: 'dangky' }" class="nav-link">
                Đăng ký
              </router-link>
            </button>
          </td>
          <td>
            <button class="button-in-home btn">
              <router-link :to="{ name: 'dangnhap' }" class="nav-link">
                Đăng nhập
              </router-link>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </nav>
</template>
