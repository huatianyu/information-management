<template>
  <div>
    <material-card
      :color="currentColor"
      ref="formValidate"
      title="定位申请单"
      :showBackBtn="true"
      text="定位申请单列表"
    >
      <v-toolbar flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>审核批准列表</v-toolbar-title>
        <div class="flex-grow-1">
          <search-button-group
            @sort-selected="sortSelected"
            :btnList="btnList"
          ></search-button-group>
        </div>
        <div class="text-center">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{on}">
              <v-btn v-on="on" icon>
                <v-icon color="#4dc9a875">mdi-magnify</v-icon>
              </v-btn>
            </template>
            <v-card class="mx-auto">
              <v-card-text>
                <v-form ref="searchForm" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="姓名"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="放疗号"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || '请选择主治医生']"
                    label="主治医生"
                    required
                  ></v-select>
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                    >搜索</v-btn
                  >
                  <v-btn color="error" class="mr-4" @click="reset">清空</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
        <v-btn icon>
          <v-icon
            v-if="isTable"
            color="#4dc9a875"
            @click="changeListStyle(isTable)"
            >mdi-table</v-icon
          >
          <v-icon v-else color="#4dc9a875" @click="changeListStyle(isTable)"
            >mdi-format-list-bulleted</v-icon
          >
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            dark
            class="px-4"
            v-model="tab"
            @change="selectedTitle"
            align-with-title
          >
            <v-tabs-slider color="#4dc9a875"></v-tabs-slider>
            <v-tab v-for="(item, index) in headerBtnList">
              <v-badge color="#4dc9a875" right>
                <template v-slot:badge>
                  <span>{{ numberCount[index] }}</span>
                </template>
                <v-icon left>mdi-store</v-icon> {{ item.title }}
              </v-badge></v-tab
            >
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tab" class="pa-2">
        <v-tab-item v-for="item in headerBtnList">
          <v-card flat>
            <v-list v-if="isTable" two-line subheader>
              <v-list-item
                v-for="item in list"
                :key="item.title"
                @click="
                  showpatientResource(item.locationId, item.radiotherapyNum)
                "
              >
                <v-list-item-avatar>
                  <v-img :src="url + 'upload/' + item.photographPath"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.patientName"
                  ></v-list-item-title>
                  <v-list-item-subtitle>
                    <span class="grey--text subtitle-2"
                      >{{ '放疗号：' + item.radiotherapyNum }} 性别：
                      {{ item.sex === 1 ? '女' : '男' }} 开始时间：
                      {{ item.startTime | date('%Y-%m-%d %T') }}
                      {{
                        '主治医生：' + ChiefDoctorsForRead(item.chiefDoctorId)
                      }}</span
                    >
                  </v-list-item-subtitle>
                  <v-divider dark></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-row v-else>
              <v-col v-for="item in list" cols="12" sm="6" lg="2" md="3" xl="2">
                <v-card>
                  <v-img
                    :src="url + 'upload/' + item.photographPath"
                    height="200px"
                  ></v-img>
                  <v-card-title>
                    <div class="grey--text">{{ item.patientName }}</div>
                    <span class="grey--text subtitle-2">{{
                      '放疗号：' + item.radiotherapyNum
                    }}</span>
                    <span class="grey--text subtitle-2"
                      >性别： {{ item.sex === 1 ? '女' : '男' }}</span
                    >
                    <span class="grey--text subtitle-2"
                      >开始时间：
                      {{ item.startTime | date('%Y-%m-%d %T') }}</span
                    >
                    <span class="grey--text subtitle-2">{{
                      '主治医生：' + ChiefDoctorsForRead(item.chiefDoctorId)
                    }}</span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      color="success"
                      @click="
                        showpatientResource(
                          item.locationId,
                          item.radiotherapyNum
                        )
                      "
                      fab
                      x-small
                      dark
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-pagination
        color="#4dc9a875"
        dark
        v-model="currentPage"
        :length="Math.ceil(totalCount / pageSize)"
      ></v-pagination>
    </material-card>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import url from '@/lib/url';
import AbpBase from '@/lib/abpbase';
import VueRouter from 'vue-router';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';
import Patient from '../../../../store/entities/patient';
import targetApplicationItem from './targetApplicationItem.vue';
import patientSearchItem from './../../../customize/patientSearchItem.vue';
import searchButtonGroup from './../../../customize/searchButtonGroup.vue';
import headerBar from './../../../customize/headerBar.vue';

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
    targetApplicationItem,
    patientSearchItem,
    searchButtonGroup,
    headerBar,
  },
})
export default class MoreTargetApplication extends AbpBase {
  fav = true;
  menu = false;
  message = false;
  hints = true;
  isTable = true;
  show = false;
  pagerequest: PagePatientTreatmentListRequest = new PagePatientTreatmentListRequest();
  sortObject: SortObject = new SortObject();
  get currentColor() {
    return this.$store.state.targetResource.color;
  }
  get routerName() {
    return this.$store.state.targetResource.routerName;
  }
  get url() {
    return url;
  }
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '请输入姓名',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || '请输入放疗号',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      checkbox: false,
    };
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

  get list() {
    return this.$store.state.more.list;
  }
  get numberCount() {
    return this.$store.state.more.numberCount;
  }

  get loading() {
    return this.$store.state.more.loading;
  }
  get pageSize() {
    return this.$store.state.more.targetpageSize;
  }
  get totalCount() {
    return this.$store.state.more.targetTotalCount;
  }
  get currentPage() {
    return this.$store.state.more.targetCurrentPage;
  }
  set currentPage(value) {
    this.$store.state.more.targetCurrentPage = value;
    this.getpage();
  }
  get tab() {
    return this.$store.state.targetResource.moreTargetApplicationTab;
  }
  set tab(value) {
    this.$store.state.targetResource.moreTargetApplicationTab = value;
  }

  btnList = [
    {id: 0, title: '综合排序', showSort: true},
    {id: 1, title: '姓名', showSort: true},
    {id: 2, title: '出生日期', showSort: true},
  ];

  headerBtnList = [
    {id: 1, title: '全部申请单', showSort: false, selected: false},
    {id: 2, title: '未审核申请单', showSort: false, selected: false},
    {id: 3, title: '已审核申请单', showSort: false, selected: true},
  ];

  get ChiefDoctors() {
    return this.$store.state.patient.chiefDoctors;
  }
  ChiefDoctorsForRead(id) {
    if (this.ChiefDoctors && this.ChiefDoctors.length) {
      let readItem = (this.ChiefDoctors as any).filter(
        item => item.value === id
      );
      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }
  changeListStyle(isTable) {
    this.isTable = !isTable;
  }
  async created() {
    this.pagerequest.Type = this.tab;
    this.getpage();
  }

  changePage(page: number) {
    this.$store.commit('patientTreatmentList/setCurrentPage', page);
    this.getpage();
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('patientTreatmentList/setPageSize', pagesize);
    this.getpage();
  }

  //选择的患者类型
  selectedTitle(id) {
    this.currentPage = 1;
    //恢复默认
    this.headerBtnList.forEach((item, index, arr) => {
      item.selected = false;
    });
    this.pagerequest.Type = id;
    this.getpage();
  }
  goback() {
    this.$router.go(-1); //返回上一层
  }

  async showpatientResource(locationId, radiotherapyNum) {
    this.$store.dispatch('targetResource/getExaminePatientListQueryAsync', {
      id: locationId,
      radiotherapyNum: radiotherapyNum,
    });
    this.$router.push({
      name: this.routerName,
      // params: { name: this.routerName }
    });
  }
  //选中排序
  sortSelected(state, item) {
    //排序传参
    let sort;
    switch (item.id) {
      case 0:
        sort = state === true ? 'id asc' : ' id desc';
        break;
      case 1:
        sort = state === true ? 'patientName asc' : ' patientName desc';
        break;
      case 2:
        sort = state === true ? 'birthDay asc' : 'birthDay desc';
        break;
      default:
        break;
    }
    this.pagerequest.Sorting = sort;
    this.getpage();
  }
  async getpage() {
    this.pagerequest.MaxResultCount = this.pageSize;
    this.pagerequest.SkipCount = (this.currentPage - 1) * this.pageSize;

    await this.$store.dispatch({
      type: 'more/getExamineQueryAsync',
      data: this.pagerequest,
    });
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.routerName = to.params.name;
  //   });
  // }
}
</script>
