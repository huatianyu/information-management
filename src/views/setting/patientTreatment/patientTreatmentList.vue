<template>
  <div>
    <material-card
      color="#4dc9a875"
      ref="formValidate"
      title="接诊"
      :showBackBtn="false"
      text="接诊患者列表"
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
        <!-- <div class="text-center">
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon color="#4dc9a875">mdi-magnify</v-icon>
              </v-btn>
            </template>
            <v-card class="mx-auto">
              <v-card-text>
                <v-form ref="searchForm" v-model="valid" lazy-validation>
                  <v-text-field v-model="name" :counter="10" :rules="nameRules" label="姓名" required></v-text-field>
                  <v-text-field v-model="email" :rules="emailRules" label="放疗号" required></v-text-field>
                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || '请选择主治医生']"
                    label="主治医生"
                    required
                  ></v-select>
                  <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">搜索</v-btn>
                  <v-btn color="error" class="mr-4" @click="reset">清空</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
        <v-btn icon>
          <v-icon v-if="isTable" color="#4dc9a875" @click="changeListStyle(isTable)">mdi-table</v-icon>
          <v-icon
            v-else
            color="#4dc9a875"
            @click="changeListStyle(isTable)"
          >mdi-format-list-bulleted</v-icon>
        </v-btn> -->

        <template v-slot:extension>
          <v-tabs
            dark
            class="px-4"
            v-model="tab"
            @change="selectedTitle"
            align-with-title
          >
            <v-tabs-slider color="#4dc9a875"></v-tabs-slider>
            <v-tab v-for="(item, index) in numberCount">
              <v-badge color="#4dc9a875" right>
                <template v-slot:badge>
                  <span>{{ item }}</span>
                </template>
                <v-icon left>mdi-store</v-icon> {{ headerBtnList[index].title }}
              </v-badge>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-tabs-items v-model="tab" class="pa-2">
        <v-tab-item v-for="tab in numberCount">
          <v-card flat>
            <v-list v-if="isTable" two-line subheader>
              <v-list-item
                v-for="item in list"
                :key="item.title"
                @click="showpatientResource(item.radiotherapyNum)"
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
                      >{{ '放疗号：' + item.radiotherapyNum }}
                      {{ '性别：' + (item.sex === 1 ? '女' : '男') }}
                      创建日期：{{ item.creationTime | date('%Y-%m-%d %T') }}
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
                      >创建日期：{{
                        item.creationTime | date('%Y-%m-%d %T')
                      }}</span
                    >
                    <span class="grey--text subtitle-2">{{
                      '主治医生：' + ChiefDoctorsForRead(item.chiefDoctorId)
                    }}</span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      color="success"
                      @click="showpatientResource(item.radiotherapyNum)"
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
    <!-- <Spin size="large" fix v-if="loading"></Spin> -->
  </div>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import url from '@/lib/url';
import AbpBase from '@/lib/abpbase';
import VueRouter from 'vue-router';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';
import Patient from '../../../store/entities/patient';
import patientItemCard from './../../customize/patientItemCard.vue';
import patientSearchItem from './../../customize/patientSearchItem.vue';
import searchButtonGroup from './../../customize/searchButtonGroup.vue';
import headerBar from './../../customize/headerBar.vue';
import moment from 'moment';

class PagePatientTreatmentListRequest extends PageRequest {
  PatientName: String;
  InfeePatientId: String;
  SocietyId: String;
  ChiefDoctorId: Number = 4;
  RadiotherapyNum: String;
  Type: String;
}

@Component({
  components: {
    patientItemCard,
    patientSearchItem,
    searchButtonGroup,
    headerBar,
  },
})
export default class Patients extends AbpBase {
  menu = false;
  isTable = true;
  routerName: string;
  show = false;
  pagerequest: PagePatientTreatmentListRequest = new PagePatientTreatmentListRequest();
  get url() {
    return url;
  }
  get tab() {
    return this.$store.state.patientTreatmentList.currentTab;
  }
  set tab(value) {
    this.$store.state.patientTreatmentList.currentTab = value;
  }
  get list() {
    return this.$store.state.patientTreatmentList.list;
  }

  get numberCount() {
    return this.$store.state.patientTreatmentList.numberCount;
  }
  get patientDetail() {
    return this.$store.state.patientTreatmentList.patientDetail;
  }
  get loading() {
    return this.$store.state.patientTreatmentList.loading;
  }
  get pageSize() {
    return this.$store.state.patientTreatmentList.pageSize;
  }
  get totalCount() {
    return this.$store.state.patientTreatmentList.totalCount;
  }
  get currentPage() {
    return this.$store.state.more.targetCurrentPage;
  }
  set currentPage(value) {
    this.$store.state.more.targetCurrentPage = value;
    this.getpage();
  }
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
  btnList = [
    {id: 0, title: '综合排序', showSort: true},
    {id: 1, title: '姓名', showSort: true},
    {id: 2, title: '出生日期', showSort: true},
  ];

  headerBtnList = [
    {id: 1, title: '全部分类', showSort: false, selected: false},
    {id: 2, title: '制定方案', showSort: false, selected: false},
    {id: 3, title: '签同意书', showSort: false, selected: true},
    {id: 4, title: '申请定位', showSort: false, selected: false},
    {id: 5, title: '申请计划', showSort: false, selected: false},
  ];

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
  async showpatientResource(radiotherapyNum) {
    let success = await this.$store.dispatch({
      type: 'patientResource/getDiagnosisInfoAndListDto',
      data: {radiotherapyNum: radiotherapyNum},
    });
    if (success) {
      this.$router.push({
        name: 'patientResource',
      });
    }
  }

  changeListStyle(isTable) {
    this.isTable = !isTable;
  }

  activated() {
    this.pagerequest.Type = this.tab;
    this.getpage();
  }

  //选择的患者类型
  selectedTitle(id) {
    //恢复默认
    this.headerBtnList.forEach((item, index, arr) => {
      item.selected = false;
    });
    this.pagerequest.Type = id;
    this.currentPage = 1;
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
      type: 'patientTreatmentList/getAll',
      data: this.pagerequest,
    });
  }
}
</script>
