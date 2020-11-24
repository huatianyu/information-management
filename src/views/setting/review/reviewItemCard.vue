<template>
  <div style="margin-right:15px">
    <div class="flex-container">
      <div class="flex-img">
        <!-- <img  src="../../../images/usericon.jpg" /> -->
        <img
          height="100%"
          width="100%"
          class="img-flex-item1"
          onerror="this.src='../../../../static/noImage.png'"
          :src="url+'upload/' + item.photographPath"
        />
      </div>
      <div class="flex-content">
        <div class="flex-content-top">
          <div class="flex-content-top-name">{{item.patientName}}</div>
        </div>
        <div
          class="flex-content-bottom"
        >性别：{{item.sex== 0 ?"男":"女" }} 出生日期：{{item.birthDay }} 治疗方式：{{TreatmentMethodForRead(item.treatmentMethod)}}</div>
        <div  
          class="flex-content-bottom"
        >登记时间：{{item.creationTime | date('%Y-%m-%d %T')}}放疗号：{{item.radiotherapyNum}} 治疗技师：{{ChiefDoctorsForRead(item.chiefDoctorId)}}</div>
      </div>
      <div class="flex-content-btn">
        <Button @click="showpatientResource(item.locationId,item.radiotherapyNum)" type="primary">处理</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import url from '@/lib/url';
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import moment from "moment";

class Item {
  birthDay: String;
  chiefDoctorId: Number;
  creationTime: Date;
  id: Number;
  patientName: String;
  photographPath: String;
  radiotherapyNum: String;
  sex: Number;
  treatmentMethod: Number;
}

@Component({
  components: {}
})
export default class patientItemCard extends AbpBase {
  @Prop({ type: Object }) item: Item;
  @Prop({ type: String }) routerName: string;

  data() {
    return {};
  }
  get url() {
    return url;
  }
  get TreatmentMethod() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.TreatmentMethod;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict"))
      .PatientInfo.TreatmentMethod;
  }

  TreatmentMethodForRead(id) {
    if (this.TreatmentMethod && this.TreatmentMethod.length) {
      let readItem = this.TreatmentMethod.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
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
  async showpatientResource(locationId, radiotherapyNum) {
    // let success = await this.$store.dispatch({
    //   type: "patientResource/getDiagnosisInfoAndListDto",
    //   data: { radiotherapyNum: radiotherapyNum }
    // });
    // if (success) {

    this.$store.dispatch(
      "targetingApplication/getExaminePatientListQueryAsync",
      { locationId: locationId, radiotherapyNum: radiotherapyNum }
    );

    this.$router.push({
      name: "targetResource",
      params: { name: this.routerName }
    });
    // this.$router.push({
    //   name: "applicationResultResource"
    // });
    // }
  }
}
</script>

<style scoped lang="less">
.flex-container {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #f3f3f3;
  margin-left: 30px;
}
.flex-img {
  width: 100px;
  height: 100px;
  padding: 10px 0px;
}
.flex-content {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin-left: 30px;
}
.flex-content-btn {
  display: -webkit-flex;
  display: flex;
  width: 200px;
  height: 30px;
  margin-top: 30px;
}
.flex-content-top {
  width: 150px;
  height: 50%;
  padding-top: 10px;
  margin-bottom: 10px;
}

.flex-content-top-name {
  width: 100px;
  height: 100%;
  color: #115581;
  font-size: 24px;
  font-weight: 600;
}
.flex-content-top-detail {
  width: 50%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  color: #515a6e;
}
.flex-content-bottom {
  width: 800px;
  height: 50%;
  color: #515a6e;
  font-size: 14px;
}
</style>
