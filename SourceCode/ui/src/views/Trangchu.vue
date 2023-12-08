<script>
import AppHeader from "@/components/AppHeader.vue";
import SidebarNavigation from "../components/SidebarNavigation.vue";
import Content from "../components/Content.vue";
import { accountService } from "@/services/service";
import "../assets/app.css";

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
      showDivSearch: false,
      dsSearch: [],
      inputSearch: "",
    };
  },
  async created() {
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
    };
  },
  methods: {
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.search();
      }
    },
    checkAuthentication() {
      if (!this.account.token) {
        // this.$router.push("/");
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
    async search() {
      this.showDivSearch = true;
      this.dsSearch = await accountService.timKiemChung(this.inputSearch);
      console.log(this.dsSearch)
    },
    async handleSelected(item) {
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
      const url = this.$route.path + 'danhmuc?param=' + queryString;
      await this.$router.push(url);
      location.reload();
    }
  },
  components: {
    AppHeader,
    SidebarNavigation,
    Content,
  },
};
</script>

<template>
  <AppHeader :dvsItems="dvsItems" />

  <div class="ct-trangchu">
    <h1 class="h1-css">QUẢN LÝ HƯỚNG DẪN SỬ DỤNG</h1>
    <div class="search-bar mt-5">
      <input class="ip-search" type="text" placeholder="Tìm kiếm..." v-model="inputSearch" @keyup="handleKeyPress" />
      <v-btn class="btn-search" type="button" @click="search"><i class="fas fa-search nut-search"></i></v-btn>
    </div>
    <div v-if="showDivSearch" class="search-div mt-2" :class="{ 'show-div-search': showDivSearch }">
      <div class="canhgiua">
        <table v-if="dsSearch" v-for="item in dsSearch" class="list-item-ct">
          <tr @click="handleSelected(item)">
            {{ (item.MADV) ? item.TENDV + " - Dịch vụ số" :
              (item.MAPHCN) ? item.TENPHCN + " - Phân hệ chức năng (" + item.TENDV + ")" :
                (item.MACHUCNANG) ? item.TENCHUCNANG + " - Chức năng (" + item.TENDV + " - " + item.TENPHCN + ")" :
                  (item.MAHDSD && item.MACHUCNANG_1) ? item.TIEUDEHDSD + " - HDSD (" + item.TENDV + " - " + item.TENCHUCNANG + ")" :
                    (item.MAPHIENBAN && item.MACHUCNANG_1) ? item.TIEUDEPHIENBAN + " - Phiên bản HDSD (" +
                      item.TENDV + " - " + item.TENCHUCNANG + " - " + item.TIEUDEHDSD + ")" :
                      (item.MAHDSD && !item.MACHUCNANG_1) ? item.TIEUDEHDSD + " - HDSD chung (" + item.TENDV + ")" :
                        (item.MAPHIENBAN && !item.MACHUCNANG_1) ? item.TIEUDEPHIENBAN + " - Phiên bản HDSD chung (" +
                          item.TENDV + " - " + item.TIEUDEHDSD + ") " :
                          'Không tìm thấy kết quả!' }}
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
</template>
