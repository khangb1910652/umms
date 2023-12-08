<template>
  <div class="pd-content slide-height">
    <ul class="fsize mt-2">
      <li v-for="(item, index) in dvsItems" :key="index">
        <div class="div-selected" @click="toggleDvsMenu(item), toggleItem(item)" :class="{ selected: item.selected }"
          v-if="item.phItems">
          <div class="mr-2 ml1">
            <i v-if="item.showPhMenu" class="fas fa-caret-down"></i>
            <i v-else class="fas fa-caret-right"></i>
          </div>
          {{ item.title }}
        </div>
        <ul v-show="item.showPhMenu">
          <li v-for="(hdsdcItem, hdsdcIndex) in item.hdsdChungItems" :key="hdsdcIndex">
            <div class="div-selected" @click="toggleHdsdChungMenu(hdsdcItem, item), toggleItem(hdsdcItem)"
              :class="{ selected: hdsdcItem.selected }" v-if="hdsdcItem.pbhdsdChungItems">
              <div class="mr-2 ml2">
                <i v-if="hdsdcItem.showPbhdsdChungMenu" class="fas fa-caret-down"></i>
                <i v-else class="fas fa-caret-right"></i>
              </div>
              {{ hdsdcItem.title }}
            </div>

            <ul v-show="hdsdcItem.showPbhdsdChungMenu">
              <li v-for="(
                  pbhdsdcItem, pbhdsdcIndex
                ) in hdsdcItem.pbhdsdChungItems" :key="pbhdsdcIndex">
                <div class="div-selected" @click="togglePbHdsdc(pbhdsdcItem, item, hdsdcItem), toggleItem(pbhdsdcItem)"
                  :class="{ selected: pbhdsdcItem.selected }">
                  <div class="mr-2 ml3">
                    <i class="fa-solid fa-circle-dot fa-2xs"></i>
                  </div>
                  {{ pbhdsdcItem.title }}
                </div>
              </li>
            </ul>
          </li>

          <li v-for="(phItem, phIndex) in item.phItems" :key="phIndex">
            <div class="div-selected" @click="togglePhMenu(phItem, item), toggleItem(phItem)"
              :class="{ selected: phItem.selected }" v-if="phItem.cnItems">
              <div class="mr-2 ml2">
                <i v-if="phItem.showCnMenu" class="fas fa-caret-down"></i>
                <i v-else class="fas fa-caret-right"></i>
              </div>
              {{ phItem.title }}
            </div>

            <ul v-show="phItem.showCnMenu">
              <li v-for="(cnItem, cnIndex) in phItem.cnItems" :key="cnIndex">
                <div class="div-selected" @click="toggleCnMenu(cnItem, item, phItem), toggleItem(cnItem)"
                  :class="{ selected: cnItem.selected }" v-if="cnItem.LoaiItems">
                  <div class="mr-2 ml3">
                    <i v-if="cnItem.showLMenu" class="fas fa-caret-down"></i>
                    <i v-else class="fas fa-caret-right"></i>
                  </div>
                  {{ cnItem.title }}
                </div>
                <ul v-show="cnItem.showLMenu">
                  <li v-for="(lItem, lIndex) in cnItem.LoaiItems" :key="lIndex">
                    <div class="div-selected" @click="toggleHdsdMenu(lItem, item, phItem, cnItem), toggleItem(lItem)"
                      :class="{ selected: lItem.selected }" v-if="lItem.HDSDItems">
                      <div class="mr-2 ml4">
                        <i v-if="lItem.showHDSDMenu" class="fas fa-caret-down"></i>
                        <i v-else class="fas fa-caret-right"></i>
                      </div>
                      {{ lItem.title }}
                    </div>
                    <ul v-show="lItem.showHDSDMenu">
                      <li v-for="(hdsdItem, hdsdIndex) in lItem.HDSDItems" :key="hdsdIndex">
                        <div class="div-selected" @click="
                          togglePbHdsdMenu(hdsdItem, item, phItem, cnItem, lItem), toggleItem(hdsdItem)
                          " :class="{ selected: hdsdItem.selected }" v-if="hdsdItem.PbHDSDItems">
                          <div class="mr-2 ml5">
                            <i v-if="hdsdItem.PbHDSDItems" class="fas fa-caret-down"></i>
                            <i v-else class="fas fa-caret-right"></i>
                          </div>
                          {{ hdsdItem.title }}
                        </div>
                        <ul v-show="hdsdItem.showPbHDSDMenu">
                          <li v-for="(
                              pbhdsdItem, pbhdsdIndex
                            ) in hdsdItem.PbHDSDItems" :key="pbhdsdIndex">
                            <div class="div-selected"
                              @click="togglePbHdsd(pbhdsdItem, hdsdItem, item, phItem, cnItem, lItem), toggleItem(pbhdsdItem)"
                              :class="{ selected: pbhdsdItem.selected }">
                              <div class="mr-2 ml6">
                                <i class="fa-solid fa-circle-dot fa-2xs"></i>
                              </div>
                              {{ pbhdsdItem.title }}
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { array } from "yup";
import "../assets/css/slidebar-navbar.css";
import { accountService } from "@/services/service";

export default {
  props: {
    dvsItems: {
      type: Array,
      required: true,
    },
    dvsItem: {
      type: Object,
      required: true,
    },
    hdsdcItem: {
      type: Object,
      required: true,
    },
    pbhdsdcItem: {
      type: Object,
      required: true,
    },
    phItem: {
      type: Object,
      required: true,
    },
    cnItem: {
      type: Object,
      required: true,
    },
    lItem: {
      type: Object,
      required: true,
    },
    hdsdItem: {
      type: Object,
      required: true,
    },
    pbhdsdItem: {
      type: Object,
      required: true,
    },
  },
  async created() {
    // const accountData = localStorage.getItem("account");
    // if (accountData) {
    //   this.account = JSON.parse(accountData);
    // }
    // await this.checkAuthentication();
    // try {
    //   this.dvsItems = await accountService.layDanhSachMenu(
    //     this.accountInfo.Quyen
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    // this.$emit('dvsItems', this.dvsItems);

  },
  data() {
    return {
      account: {},
      accountInfo: {},
    };
  },
  methods: {
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
    toggleDvsMenu(item) {
      item.showPhMenu = !item.showPhMenu;
      this.$emit('dvsItem', item);
      this.$emit('phItem', {});
      this.$emit('hdsdcItem', {});
      this.$emit('cnItem', {});
      this.$emit('hdsdItem', {});
      this.$emit('pbhdsdItem', {});
      this.$emit('pbhdsdcItem', {});
      this.$emit('lItem', {});
      this.$router.push("/danhmuc");
    },
    toggleHdsdChungMenu(hdsdcItem, item) {
      hdsdcItem.showPbhdsdChungMenu = !hdsdcItem.showPbhdsdChungMenu;
      this.$emit('hdsdcItem', hdsdcItem);
      this.$emit('phItem', {});
      this.$emit('dvsItem', item);
      this.$emit('cnItem', {});
      this.$emit('lItem', {});
      this.$emit('hdsdItem', {});
      this.$emit('pbhdsdItem', {});
      // this.$emit('pbhdsdcItem', {});
    },
    togglePbHdsdc(pbhdsdcItem, item, hdsdcItem) {
      this.$emit('pbhdsdcItem', pbhdsdcItem);
      this.$emit('pbhdsdItem', {});
      this.$emit('hdsdItem', {});
      this.$emit('lItem', {});
      this.$emit('cnItem', {});
      this.$emit('phItem', {});
      this.$emit('dvsItem', item);
      this.$emit('hdsdcItem', hdsdcItem);
    },
    togglePhMenu(phItem, item) {
      phItem.showCnMenu = !phItem.showCnMenu;
      this.$emit('phItem', phItem);
      this.$emit('dvsItem', item);
      this.$emit('hdsdcItem', {});
      this.$emit('cnItem', {});
      this.$emit('lItem', {});
      this.$emit('hdsdItem', {});
      this.$emit('pbhdsdItem', {});
      this.$emit('pbhdsdcItem', {});
    },
    toggleCnMenu(cnItem, item, phItem) {
      cnItem.showLMenu = !cnItem.showLMenu;
      this.$emit('cnItem', cnItem);
      this.$emit('phItem', phItem);
      this.$emit('dvsItem', item);
      this.$emit('hdsdcItem', {});
      if(cnItem.LoaiItems[0]){
        this.$emit('lItem', cnItem.LoaiItems[0]);
      }else{
        this.$emit('lItem', {});
      }
      this.$emit('hdsdItem', {});
      this.$emit('pbhdsdItem', {});
      this.$emit('pbhdsdcItem', {});
    },
    toggleHdsdMenu(lItem, item, phItem, cnItem) {
      lItem.showHDSDMenu = !lItem.showHDSDMenu;
      this.$emit('lItem', lItem);
      this.$emit('cnItem', cnItem);
      this.$emit('phItem', phItem);
      this.$emit('dvsItem', item);
      this.$emit('hdsdcItem', {});
      this.$emit('hdsdItem', {});
      this.$emit('pbhdsdItem', {});
      this.$emit('pbhdsdcItem', {});
    },
    togglePbHdsdMenu(hdsdItem, item, phItem, cnItem, lItem) {
      hdsdItem.showPbHDSDMenu = !hdsdItem.showPbHDSDMenu;
      this.$emit('hdsdItem', hdsdItem);
      this.$emit('lItem', lItem);
      this.$emit('cnItem', cnItem);
      this.$emit('phItem', phItem);
      this.$emit('dvsItem', item);
      this.$emit('hdsdcItem', {});
      this.$emit('pbhdsdItem', {});
      this.$emit('pbhdsdcItem', {});
    },
    togglePbHdsd(pbhdsdItem, hdsdItem, item, phItem, cnItem, lItem) {
      this.$emit('pbhdsdItem', pbhdsdItem);
      this.$emit('hdsdItem', hdsdItem);
      this.$emit('lItem', lItem);
      this.$emit('cnItem', cnItem);
      this.$emit('phItem', phItem);
      this.$emit('dvsItem', item);
      this.$emit('hdsdcItem', {});
      this.$emit('pbhdsdcItem', {});
    },
    toggleItem(item) {
      // Unselect previously selected item
      this.unselectItems(this.dvsItems);
      // Select the clicked item
      item.selected = true;
    },
    unselectItems(items) {
      for (const item of items) {
        item.selected = false;
        if (item.phItems) {
          this.unselectItems(item.phItems);
        }
        if (item.hdsdChungItems) {
          this.unselectItems(item.hdsdChungItems);
        }
        if (item.pbhdsdChungItems) {
          this.unselectItems(item.pbhdsdChungItems);
        }
        if (item.cnItems) {
          this.unselectItems(item.cnItems);
        }
        if (item.LoaiItems) {
          this.unselectItems(item.LoaiItems);
        }
        if (item.HDSDItems) {
          this.unselectItems(item.HDSDItems);
        }
        if (item.PbHDSDItems) {
          this.unselectItems(item.PbHDSDItems);
        }
      }
    },
  },
};
</script>
