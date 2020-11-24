<template >
  <div>
    <material-card
      color="#4dc9a875"
      ref="formValidate"
      title="预约"
      :showBackBtn="true"
      text="预约患者列表内容"
    >
      <div class="patient-info">
        <div class="patient-info-item-left">
          <div class="patient-info">
            <div class="patient-info-item">
              <img  class="img-flex-item1" :src="this.src='../../../../static/conversation.png'" />
            </div>
            <div class="patient-info-item-text">
              <div>
                <div class="name">{{"制定方案"}}</div>
                <div class="content">
                  <v-btn color="#016c6e00" @click="showDetail('showpatientProgram')">{{'制定方案'}}</v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="patient-info-item-right">
          <div class="patient-info-icon" v-for="(info ,index) in prescriptions">
            <div class="patient-info-item-text">
              <div @click="showHistoryPatientProgram(info.id)">
                <div class="icon">
                  <Icon type="md-archive" />
                </div>
                <div class="icon-btn">{{ info.title}}</div>
              </div>
            </div>
          </div>
          <!-- <div class="patient-info-icon">
            <div class="patient-info-item-text">
              <div>
                <div class="icon">
                  <Icon type="ios-filing" />
                </div>
                <div class="icon-btn">{{item.title}}</div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <div class="patient-info">
        <div class="patient-info-item-left">
          <div class="patient-info">
            <div class="patient-info-item">
              <img class="img-flex-item1" :src="this.src='../../../../static/edit-tools.png'" />
            </div>
            <div class="patient-info-item-text">
              <div>
                <div class="name">{{"同意书"}}</div>
                <div class="content">
                  <v-btn color="#016c6e00" @click="showDetail('showpatientConsent')">{{'签同意书'}}</v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="patient-info-item-right">
          <!-- <div class="patient-info-icon" v-for="info in prescriptions">
            <div class="patient-info-item-text">
              <div @click="showHistoryDetail(info.remarks)">
                <div class="icon">
                  <Icon type="md-archive" />
                </div>
                <div class="icon-btn">{{info.remarks}}</div>
              </div>
            </div>
          </div>-->
          <!-- <div class="patient-info-icon">
            <div class="patient-info-item-text">
              <div>
                <div class="icon">
                  <Icon type="ios-filing" />
                </div>
                <div class="icon-btn">{{item.title}}</div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <div class="patient-info">
        <div class="patient-info-item-left">
          <div class="patient-info">
            <div class="patient-info-item">
              <img class="img-flex-item1" :src="this.src='../../../../static/notebook.png'" />
            </div>
            <div class="patient-info-item-text">
              <div>
                <div class="name">{{"定位"}}</div>
                <div class="content">
                  <v-btn color="#016c6e00" @click="showDetail('showpatientPosition')">{{'申请定位'}}</v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="patient-info-item-right">
          <div class="patient-info-icon" v-for="info in ctsimOrders">
            <div class="patient-info-item-text">
              <div @click="showHistoryPatientPosition(info.locationId)">
                <div class="icon">
                  <Icon type="md-archive" />
                </div>
                <div class="icon-btn">{{ info.title}}</div>
              </div>
            </div>
          </div>
          <!-- <div class="patient-info-icon">
            <div class="patient-info-item-text">
              <div>
                <div class="icon">
                  <Icon type="ios-filing" />
                </div>
                <div class="icon-btn">{{item.title}}</div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <div class="patient-info">
        <div class="patient-info-item-left">
          <div class="patient-info">
            <div class="patient-info-item">
              <img class="img-flex-item1" :src="this.src='../../../../static/telegram.png'" />
            </div>
            <div class="patient-info-item-text">
              <div>
                <div class="name">{{"计划"}}</div>
                <div class="content">
                  <v-btn color="#016c6e00" @click="showDetail('showpatientPlan')">{{'申请计划'}}</v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="patient-info-item-right">
          <div class="patient-info-icon" v-for="info in planOrders">
            <div class="patient-info-item-text">
              <div @click="showHistoryPatientPlan(info.id)">
                <div class="icon">
                  <Icon type="md-archive" />
                </div>
                <div class="icon-btn">{{ info.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </material-card>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PatientResource from "../../../store/entities/patientTreatment/patientResource";
import { Alert } from "iview";

@Component({
  components: {}
})
export default class diagnosticBlock extends AbpBase {
  get photographPath() {
    return this.$store.state.patientResource.patientResource.patientInfo.patient
      .photographPath;
  }

  get prescriptions() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.patientResource.diagnosisSets
        .prescriptions,
      "DIAGNOSTICBLOCK-PRESCRIPTIONS",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }
  get planOrders() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.patientResource.diagnosisSets
        .planOrders,
      "DIAGNOSTICBLOCK-PLANORDERS",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }

  get ctsimOrders() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.patientResource.diagnosisSets
        .ctsimOrders,
      "DIAGNOSTICBLOCK-CTSIMORDERS",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }

  get patient() {
    return Util.getUpdatePageObj(
    this.$store.state.patientResource.patientResource.leftPatients.patient,
      "DIAGNOSTICBLOCK-PATIENT",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }

  showDetail(name) {
    switch (name) {
      case "showpatientConsent":
        this.showpatientConsent();
        break;
      case "showpatientProgram":
        this.showpatientProgram();
        break;
      case "showpatientPosition":
        this.showpatientPosition();
        break;
      case "showpatientPlan":
        this.showpatientPlan();
        break;
      default:
        break;
    }
  }
  showHistoryDetail(name) {
    switch (name) {
      case "同意书":
        this.showpatientConsent();
        break;
      case "制定方案":
        this.showpatientProgram();
        break;
      case "定位":
        this.showpatientPosition();
        break;
      default:
        break;
    }
  }
  showpatientConsent() {
    this.$router.push({
      name: "consent"
    });
  }
  async showpatientProgram() {
    let success = await this.$store.dispatch({
      type: "patientResource/getPatientTop",
      data: { radiotherapyNum: this.patient.radiotherapyNum }
    });
    if (success) {
      this.$router.push({
        name: "program"
      });
    }
  }
  async showHistoryPatientProgram(id) {
    let success = await this.$store.dispatch({
      type: "patientResource/getPrescription",
      data: { radiotherapyNum: this.patient.radiotherapyNum, id: id }
    });
    if (success) {
      this.$router.push({
        name: "historyProgram"
      });
    }
  }

  async showHistoryPatientPosition(id) {
    let success = await this.$store.dispatch({
      type: "targetingApplication/persionListQueryAsync",
      data: { radiotherapyNum: this.patient.radiotherapyNum, LocationId: id }
    });
    if (success) {
      this.$router.push({
        name: "historyTargetingApplication"
      });
    }
  }

  async showHistoryPatientPlan(id) {
    let success = await this.$store.dispatch("planApplication/getPlanOrder", {
      RadiotherapyNum: this.patient.radiotherapyNum,
      Id: id
    });

    if (success) {
      this.$router.push({
        name: "historyPlanApplication"
      });
    }
  }

  async showpatientPosition() {
    let success = await this.$store.dispatch({
      type: "targetingApplication/persionListQueryAsync",
      data: { radiotherapyNum: this.patient.radiotherapyNum, LocationId: -1 }
    });
    if (success) {
      this.$router.push({
        name: "creatTargetingApplication"
      });
    }
  }

  async showpatientPlan() {
    let success = await this.$store.dispatch("planApplication/getPlanOrder", {
      RadiotherapyNum: this.patient.radiotherapyNum,
      Id: 0
    });
    if (success) {
      this.$router.push({
        name: "creatPlanApplication"
      });
    }
  }
}
</script>


<style scoped>
.patient-info {
  display: flex;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 0px;
  margin-top: -1px;
}
.patient-info-icon {
  display: flex;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100px;
  height: 100px;
  margin: 10px;
}
.patient-info-icon:hover {
  box-shadow: 5px 5px 5px #888888;
}
.patient-info-icon {
  box-shadow: 2px 2px 2px #888888;
}
.patient-info-item {
  width: 64px;
  height: 64px;
}
.patient-info-item-left {
  height: 120px;
  width: 20%;
  border: 5px #19be6b;
  padding: 20px 10px 10px 10px;
}

.patient-info-item-right {
  display: flex;
  display: -webkit-flex;
  display: flex;
  margin-right: 50px;
  height: 130px;
  width: 80%;
  border: 1px solid gray;
  /* -webkit-filter:brightness(1);
-o-filter:brightness(1);
-moz-filter:brightness(1); */
  filter: brightness(1);
  border-right: 3px;
  border-top: 0px;
  border-left: 0px;
  position: relative;
  left: -1px;
  overflow: auto hidden;
}

.patient-info-item-text {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  color: #fff;
  font-family: "仿宋";
  font-size: 16px;
}

.patient-info-item-text .name {
  font-size: 22px;
  color: #fff;
  margin-bottom: 5px;
  text-align: center;
  /* margin: 10px; */
  width: 100%;
}

.patient-info-item-text .content {
  margin-left: 25px;
  width: 100%;
}

.patient-info-item-text .icon {
  text-align: center;
  font-size: 40px;
}
.patient-info-item-text .icon-btn {
  text-align: center;
  font-size: 20px;
  min-width: 100px;
}
.img-flex-item1{
  margin-top: 15px;
  height: 60px;
  width: 60px;
}
</style>













