
<template>

</template>
<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import VueRouter from "vue-router";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
import Patient from "../../../../store/entities/patient";
import planApplicationItem from "./planApplicationItem.vue";
import patientSearchItem from "./../../../customize/patientSearchItem.vue";
import searchButtonGroup from "./../../../customize/searchButtonGroup.vue";
import headerBar from "./../../../customize/headerBar.vue";

class PagePatientTreatmentListRequest extends PageRequest {
  PatientName: String;
  InfeePatientId: String;
  SocietyId: String;
  ChiefDoctorId: Number = 4;
  RadiotherapyNum: String;
  Type: String;
}

class SortObject {
  allSort: String;
  nameSort: String;
  birthSort: String;
  PatientName: String;
}

@Component({
  components: {
    planApplicationItem,
    patientSearchItem,
    searchButtonGroup,
    headerBar
  }
})
export default class MoreApprovePlan extends AbpBase {
  routerName: string;
  fav = true;
  menu = false;
  message = false;
  hints = true;
  isTable = true;
  show = false;
  pagerequest: PagePatientTreatmentListRequest = new PagePatientTreatmentListRequest();

  sortObject: SortObject = new SortObject();

  get list() {
    return this.$store.state.more.list;
  }

  get loading() {
    return this.$store.state.more.loading;
  }
  get pageSize() {
    return this.$store.state.more.planPageSize;
  }
  get totalCount() {
    return this.$store.state.more.planTotalCount;
  }
  get currentPage() {
    return this.$store.state.more.planCurrentPage;
  }
  set currentPage(value) {
    this.$store.state.more.planCurrentPage = value;
    this.getpage();
  }
  get ChiefDoctors() {
    return this.$store.state.patient.chiefDoctors;
  }
  ChiefDoctorsForRead(id) {
    if (this.ChiefDoctors && this.ChiefDoctors.length) {
      let readItem = (this.ChiefDoctors as any).filter(
        item => item.userId === id
      );
      if (readItem.length) {
        return readItem[0].name;
      }
    }
  }

  btnList = [
    { id: 0, title: "综合排序", showSort: true },
    { id: 1, title: "姓名", showSort: true },
    { id: 2, title: "出生日期", showSort: true }
  ];

  headerBtnList = [
    { id: 1, title: "全部申请单", showSort: false, selected: false },
    { id: 2, title: "未审核申请单", showSort: false, selected: false },
    { id: 3, title: "已审核申请单", showSort: false, selected: true }
  ];

  items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "请输入姓名",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "请输入放疗号",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      select: null,
      checkbox: false
    };
  }

  async showpatientResource(id, radiotherapyNum) {
    // let success = await this.$store.dispatch({
    //   type: "patientResource/getDiagnosisInfoAndListDto",
    //   data: { radiotherapyNum: radiotherapyNum }
    // });
    // if (success) {
    this.$store.commit("targetResource/changeStatus", false);

    this.$store.dispatch("targetResource/getPlanOrder", {
      id: id,
      radiotherapyNum: radiotherapyNum
    });

    this.$router.push({
      name: "targetResource",
      params: { name: this.routerName }
    });
    // this.$router.push({
    //   name: "applicationResultResource"
    // });
    // }
  }
  validate() {
    if ((this.$refs.searchForm as any).validate()) {
    }
  }
  reset() {
    (this.$refs.searchForm as any).reset();
  }
  resetValidation() {
    (this.$refs.searchForm as any).resetValidation();
  }
  changeListStyle(isTable) {
    this.isTable = !isTable;
  }
  async created() {
    this.getpage();
  }

  activated() {
    this.getpage();
  }

  changePage(page: number) {
    this.$store.commit("patientTreatmentList/setCurrentPage", page);
    this.getpage();
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit("patientTreatmentList/setPageSize", pagesize);
    this.getpage();
  }

  //选择的患者类型
  selectedTitle(id) {
    //恢复默认
    this.headerBtnList.forEach((item, index, arr) => {
      item.selected = false;
    });
    this.pagerequest.Type = id;
    this.getpage();
  }

  //选中排序
  sortSelected(state, item) {
    //排序传参
    let allSort, nameSort, birthSort;
    switch (item.id) {
      case 0:
        allSort = state === true ? "id asc" : " id desc";
        this.sortObject.allSort = allSort;
      case 1:
        nameSort = state === true ? "patientName asc" : " patientName desc";
        this.sortObject.nameSort = nameSort;
      case 2:
        birthSort = state === true ? "StartTime asc" : "StartTime desc";
        this.sortObject.birthSort = birthSort;
      default:
        break;
    }
    let sort =
      (this.sortObject.allSort ? this.sortObject.allSort + "," : "") +
      (this.sortObject.nameSort ? this.sortObject.nameSort + "," : "") +
      (this.sortObject.birthSort ? this.sortObject.birthSort : "");

    this.pagerequest.Sorting = sort;
    this.getpage();
  }
  async getpage() {
    this.pagerequest.MaxResultCount = this.pageSize;
    this.pagerequest.SkipCount = (this.currentPage - 1) * this.pageSize;
    await this.$store.dispatch({
      type: "more/getPlanOrderCheckPending",
      data: this.pagerequest
    });
  }
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.routerName = to.params.name;
    });
  }
}
</script>