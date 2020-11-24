<template>
  <div>
    <div class="flex-container" @click="showPatientDetail(item.id,item.radiotherapyNum)">
      <div class="flex-img">
        <img height="100%" width="100%" src="../../../../images/usericon.jpg" />
      </div>
      <div class="flex-content">
        <ul>
          <li>
            <span class="right-time">{{item.birthDay}} 11:12:52</span>
            <span class="patient-name">{{item.patientName}}</span>
          </li>
          <li>扫描部位：{{item.scanningLocation}} 设备：{{item.scanningEquipment}} 技师：{{item.chiefDoctorId}}</li>
        </ul>
        <!-- <div class="flex-content-top">
          <div class="flex-content-top-name">{{item.patientName}}</div>
          <div class="flex-content-top-time">{{item.birthDay}} 11:12:52</div>
        </div>
        <div class="flex-content-bottom">扫描部位：头颅 设备：CTSIM 技师：刘三好</div>-->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import Item from "../../../../store/entities/review/projectLocationDetailed";

@Component({
  components: {}
})
export default class ProjectPlanDetailed extends AbpBase {
  @Prop({ type: Item }) item: Item;
  @Prop({ type: String }) cardName: String;

  data() {
    return {};
  }
  showPatientDetail(id, radiotherapyNum) {
    // this.$store.commit("targetResource/setRouterName", this.cardName);
   this.$store.dispatch(
      "targetResource/getPlanOrder",
      { id: id, radiotherapyNum: radiotherapyNum }
    );
    
    this.$store.commit("targetResource/setRouterName", this.cardName);
    this.$router.push({
      name: this.cardName as string
    });
  }
}
</script>

<style scoped lang="less">
.flex-container {
  display: -webkit-flex;
  display: flex;
  color: #90a4ae;
  font-size: 14px;
  border-bottom: #e8e8e8 1px solid;
  padding-bottom: 5px;
  margin: 5px 5px 5px 5px;
}

.flex-img {
  width: 60px;
  height: 60px;
  margin: 0px 15px 0px 0px;
}

.flex-content {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 80%;
  height: 100%;
  font-weight: normal;
  color: #90a4ae;
  line-height: 200%;
}
.flex-content ul {
  list-style: none;
  margin: 5px 0px 0px 0px;
}

.flex-content span.patient-name {
  font-size: 18px;
  font-weight: bold;
  color: #115581;
}

.flex-content span.right-time {
  float: right;
  font-size: 12px;
}

/* .flex-content-top {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  width: 100%;
}

.flex-content-top-name {
  width: 50%;  
  color: #115581;
  font-weight: bold;
}
.flex-content-top-time {
  width: 50%;
  height: 100%;
}

.flex-content-bottom {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  width: 100%;  
} */
</style>
