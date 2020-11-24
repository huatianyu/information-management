<template >
  <div id="printConsent" class="form-height">
    <material-card color="#4dc9a875" title="制定方案" :showBackBtn="true" text="知情同意书">
      <div v-bind:is="consentTemplate"></div>
      <v-card elevation="0">
        <v-row class="purple-input pa-7">
          <v-btn color="#4dc9a875" @click="agree()">同意</v-btn>
          <v-btn color="#4dc9a875" @click="disagree()">不同意</v-btn>
          <v-btn color="#4dc9a875" @click="selectTemplateClick">选择模板</v-btn>
          <v-btn color="#4dc9a875" v-print="'#printConsent'">打印</v-btn>
          <v-btn color="#4dc9a875" @click="goback">返回</v-btn>
        </v-row>
      </v-card>
    </material-card>
    <Modal v-model="selectTemplate" width="760" :closable="false" @on-ok="determine()">
      <div slot="header" class="flex-container">
        <h3>选择模板</h3>
      </div>
      <consent-template-list @on-selectItem="selectItemChange"></consent-template-list>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import consentTemplateList from "./template.vue";
import consentTemplate1 from "./consentTemplate1.vue";
import consentTemplate2 from "./consentTemplate2.vue";

@Component({
  components: { consentTemplateList, consentTemplate1, consentTemplate2 }
})
export default class consent extends AbpBase {
  selectTemplate = false;
  selectItem: any;
  consentTemplate = "consentTemplate1";
  get radiotherapyNum() {
    return this.$store.state.patientResource.patientResource.radiotherapyNum;
  }
  get sessionId() {
    return this.$store.state.patientResource.patientResource.sessionId;
  }

  data() {
    return {
      infoList: [
        {
          content:
            "1.放射性脑水肿、脑疝、脑坏死、颅高压、记忆力减退、精神异常等。"
        },
        {
          content: "2．放射性脊椎炎所致的偏瘫、截瘫、周围神经感觉及运动障碍。"
        },
        {
          content:
            " 3．唾液腺损伤所致的口干、口腔溃疡、龋齿、牙龈炎、张口困难、牙齿脱落、颌骨坏死等。"
        },
        {
          content:
            "4．放射性皮炎（色素沉着或脱皮），皮肤及软组织纤维化或溃疡，甚至可致头颈及肢体的功能障碍。"
        },
        {
          content: "5．颈部放射所致的甲状腺功能低下，喉部干燥，气管软化等。"
        },
        {
          content: "6．放射性鼻黏膜充血、萎缩、粘连，鼻塞，鼻腔干燥等。"
        },
        {
          content: "7．放射性泪囊炎、眼炎，晶体混浊，白内障，视力减退甚或失明。"
        },
        {
          content: "8．放射性中耳炎所致的疼痛、溢液、溢脓，听力减退甚或丧失。"
        },
        {
          content: " 9．放射性肺炎、肺纤维化所致的咳嗽、呼吸困难及肺功能减退。"
        },
        {
          content: "10．放射性食管炎、纵隔炎、心肌炎、心包炎等。"
        },
        {
          content:
            "11．放射性肠炎所致的腹痛、腹泻、大便习惯改变、肠粘连、肠梗阻、肠穿孔等。"
        },
        {
          content: "12．放射性骨坏死、骨关节炎、关节腔积液、关节僵化等。"
        },
        {
          content: "13．放射性盆腔炎、卵巢、睾丸放射后所致的炎症及功能的丧失."
        },
        {
          content:
            "14．放射性损伤淋巴管或血管所致的炎症及相应区域的水肿、坏死。"
        },
        {
          content: "15．儿童、少年放疗所致的生长发育障碍和畸形。"
        },
        {
          content: "16．妊娠期放疗所致的流产、畸胎、死胎及产后并发症。"
        },
        {
          content: "17．老年患者放疗所致的骨折，诱发心脑血管疾病。"
        },
        {
          content: "18．放射治疗所致的血细胞下降。"
        },
        {
          content: "19．指（趾）甲炎及脱落。"
        },
        {
          content: "20．放射治疗所致的第二原位癌。"
        },
        {
          content:
            "21．腔内放疗后的放射性膀胱炎、直肠炎，严重者可致穿孔，以及放疗后的阴道狭窄，宫腔积液（脓）。"
        },
        {
          content: ""
        }
      ]
    };
  }
  goback() {
    this.$router.push("diagnosticBlock");
  }

  selectTemplateClick() {
    this.selectTemplate = true;
  }
  // 选中模板确定生效
  async determine() {
    this.consentTemplate = this.selectItem.title;
  }
  activated() {
    this.$store.dispatch({
      type: "consent/getSinglePatient",
      data: { radiotherapyNum: this.radiotherapyNum }
    });
  }
  selectItemChange(item) {
    this.selectItem = item;
  }

  async agree() {
    var success = await this.$store.dispatch({
      type: "patientResource/iinformedAgreedAsync",
      data: {
        sessionId: "0",
        radiotherapyNum: this.radiotherapyNum
      }
    });
    if (success) {
      this.$Message.success("操作成功");
    }
  }

  async disagree() {
    var success = await this.$store.dispatch({
      type: "patientResource/iinformedDisagreeAsync",
      data: {
        sessionId: "0",
        radiotherapyNum: this.radiotherapyNum
      }
    });
    if (success) {
      this.$Message.success("操作成功");
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
  margin-left: 100px;
}

.patient-info-item-text {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  color: #999eaa;
  font-family: "仿宋";
  font-size: 16px;
}

.patient-info-item-text h2 {
  text-align: center;
}
.form-height {
  height: calc(80vh) !important;
  overflow: auto;
  padding: 0px 20px;
}
</style>










