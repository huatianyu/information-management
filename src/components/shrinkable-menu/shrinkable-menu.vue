<template>
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <slot name="Avatar"></slot>
    <!-- <div slot="avatarInfo">
      <div class="box-content">
        <div class="profile-avatar img-flex">
          <img
            onerror="this.src='../../../../static/noImage.png'"
            class="img-flex-item1"
            :src="photographPath"
          />
          <a v-if="patientName" @click="changePerson" :class="`btn btn-block1 shrink-${shrink}`">
            <h6>
              <Icon class="icon-margin" type="md-contact" />
              <label class="shuli">{{patientName}}</label>
              <Icon type="ios-arrow-forward" />
            </h6>
          </a>
          <a :class="`btn btn-block2 shrink-${shrink}`">
            <h6>
              <Icon class="icon-margin" type="ios-pulse" />
              {{TreatmentMethodForRead(treatmentMethod) }}
            </h6>
          </a>
          <a v-if="radiotherapyNum" @click="timeLine" :class="`btn btn-block3 shrink-${shrink}`">
            <h6>
              <Icon class="icon-margin" type="md-trending-up" />治疗阶段
              <Icon type="ios-arrow-forward" />
            </h6>
          </a>
          <a v-if="radiotherapyNum" :class="`btn btn-block4 shrink-${shrink}`">
            <h6>
              <Icon class="icon-margin" type="ios-bookmarks-outline" />
              <label :class="`number-vertical-${shrink}`">{{radiotherapyNum}}</label>
            </h6>
          </a>
        </div>
      </div>
    </div> -->

    <sidebar-menu
      :shrink="!shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sidebar-menu>
    <!-- <sidebar-menu-shrink
      v-show="shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sidebar-menu-shrink>-->
    <Modal v-model="isChangePerson" width="760" :closable="false">
      <div slot="header" class="shrinkable-flex-container">
        <h3>切换用户</h3>
        <Button type="primary" @click="changePerson">
          <span>确定</span>
        </Button>
      </div>
      <!-- <AccountsTable></AccountsTable> -->
    </Modal>
  </div>
</template>

<script lang="ts">
import sidebarMenu from "./components/sidebarMenu.vue";
import sidebarMenuShrink from "./components/sidebarMenuShrink.vue";
import util from "../../lib/util";
// import AccountsTable from "../../views/accountsTable.vue";
import {
  Component,
  Vue,
  Inject,
  Prop,
  Emit,
  Watch
} from "vue-property-decorator";
import $ from "jquery";

@Component({
  components: { sidebarMenu, sidebarMenuShrink }
})
export default class ShrinkableMenu extends Vue {
  name: string = "shrinkableMenu";
  isChangePerson: boolean = false;
  @Prop({ default: true }) shrink: boolean ;
  @Prop({ required: true, type: Array }) menuList: Array<any>;
  @Prop({ type: Array }) openNames: Array<string>;
  @Prop({ type: Function }) beforePush: Function;
  @Prop({
    validator: val => {
      return util.oneOf(val, ["dark", "light"]);
    }
  })
  theme: string;
  @Watch("shrink")
  changeShrink(newTxt: boolean, oldTxt: boolean) {
    if (newTxt == true) {
      this.shrinkDetail();
    } else {
      this.zoomDetail();
    }
  }

  @Watch("radiotherapyNum")
  changeRadiotherapyNum(newTxt: string, oldTxt: string) {
    if (newTxt) {
      this.showImgDetail();
    } else {
      this.hiddenImgDetail();
    }
  }

  get TreatmentMethod() {
    if (this.$store.state.app.rtisDict) {
      return this.$store.state.app.rtisDict.PatientInfo.TreatmentMethod;
    }
    // return JSON.parse(localStorage.getItem("content.state.rtisDict"))
    //   .PatientInfo.TreatmentMethod;
  }

  TreatmentMethodForRead(id) {
    if (this.TreatmentMethod && this.TreatmentMethod.length) {
      let readItem = this.TreatmentMethod.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get bgColor() {
    return this.theme === "dark" ? "#115581" : "#fff";
  }
  get shrinkIconColor() {
    return this.theme === "dark" ? "#fff" : "#495060";
  }

  get photographPath() {
    return this.$store.state.patient.imgSrc;
  }
  get radiotherapyNum() {
    return this.$store.state.patient.radiotherapyNum;
  }

  get patientName() {
    return this.$store.state.patient.patientName;
  }

  get treatmentMethod() {
    return this.$store.state.patient.treatmentMethod;
  }

  set photographPath(value) {
    this.$store.state.patient.imgSrc = value;
  }
  @Emit("on-change")
  handleChange(name: string) {
    let willpush = true;
    if (this.beforePush !== undefined) {
      if (!this.beforePush(name)) {
        willpush = false;
      }
    }
    if (willpush) {
      this.$router.push({ name: name });
    }
  }

  showImgDetail() {
    if (this.shrink) {
      $(".box-content").animate({ height: 0, opacity: 1 }, 0);
      $(".box-content").animate({ height: 145, opacity: 1 }, 1000);
    } else {
      $(".box-content").animate({ height: 0, opacity: 1 }, 0);
      $(".box-content").animate({ height: 370, opacity: 1 }, 1000);
    }
  }
  hiddenImgDetail() {
    if (this.shrink) {
      $(".box-content").animate({ height: 145, opacity: 1 }, 0);
      $(".box-content").animate({ height: 0, opacity: 1 }, 1000);
    } else {
      $(".box-content").animate({ height: 370, opacity: 1 }, 0);
      $(".box-content").animate({ height: 0, opacity: 1 }, 1000);
    }
  }

  shrinkDetail() {
    if (this.radiotherapyNum) {
      $(".box-content").animate({ width: 200, opacity: 1 }, 0);
      $(".box-content").animate({ width: 80, height: 145, opacity: 1 }, 220);
    }
  }

  zoomDetail() {
    if (this.radiotherapyNum) {
      $(".box-content").animate({ width: 80, opacity: 1 }, 0);
      $(".box-content").animate({ width: 200, height: 370, opacity: 1 }, 220);
    }
  }
  timeLine() {
    this.$router.push({
      name: "timeline"
    });
  }

  changePerson() {
    this.isChangePerson = true;
  }
}
</script>


<style scoped>
.avatarInfo {
  height: 150px;
  width: auto;
  margin: 10px;
  display: flex;
}
.information {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column-reverse;
  flex-direction: column;
  width: 400px;
  height: 100%;
}
.flex-item {
  width: 100px;
  height: 15;
  margin: 10px;
}

.item1 {
  -webkit-flex: 3;
  flex: 3;
}
.item2 {
  -webkit-flex: 1;
  flex: 1;
}
img {
  max-width: 100%;
  height: auto;
  -webkit-backface-visibility: hidden;
}
.text-warning {
  color: #fbbc05 !important;
}

.box-content {
  position: relative;
  margin: 0 0 20px;
  background: #fff;
  height: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #115581;
}
.box-content:hover {
  overflow-y: auto;
}
.no-margin {
  margin-left: 0px;
}
.notice-danger {
  color: #fff;
  background: #ff1744;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 3px;
}

.list-group-item > .badge {
  float: right;
}
btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.profile-avatar {
  border: 10px solid white;
  border-radius: 10px;
}
.profile-avatar .btn {
  margin: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  color: #666;
}
.btn {
  background: #f0f2f5;
  outline: none !important;
  font-size: 16px;
  line-height: 18px;
  padding: 8px 25px;
  border: none;
  font-weight: 500;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  border-top: 1px solid white;
}
.btn-block1 {
  display: block;
  width: 100%;
}

.btn-block2 {
  display: block;
  width: 100%;
  background-color: #dcdee2;
}

.btn-block3 {
  display: block;
  width: 100%;
}
.btn-block4 {
  display: block;
  width: 100%;
  background-color: #dcdee2;
}
.shrinkable-flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 60px;
  background-color: #fff;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.icon-margin {
  margin-right: 8px;
}
.img-flex {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.img-flex-item1 {
  width: 236px;
  height: 214px;
}
.shrink-true {
  padding: "8px  6px";
  writing-mode: lr-tb;
}
.shrink-false {
  display: block;
  width: 100%;
  padding: "8px 25px";
}
.number-vertical-true {
  text-orientation: upright;
  margin-left: -2px;
  animation: mymove 1s infinite;
  -webkit-animation: mymove 1s infinite;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes mymove {
  100% {
    writing-mode: vertical-rl;
  }
}

@-webkit-keyframes mymove /* Safari and Chrome */ {
  100% {
    writing-mode: vertical-rl;
  }
}
</style>
