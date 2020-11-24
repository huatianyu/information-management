<template >
  <div class="patient-info">
    <div class="patient-info-item-text">
      <h2>知情同意书-模板二</h2>
      <h4>姓名：王老五 性别:男 年龄:47岁 放疗号:190328019</h4>
      <br />
      <h4>住院号：1234123 病区:胸外科 联系电话：13721212121</h4>
      <br />
      <h4>临床诊断:胸线瘤术后，需要对胸部进行放射治疗。</h4>
      <br />
      <h4>治疗潜在风险。放射治疗期间可发生的一些风险，具体的放疗方案根据不同患者的情况有所不同。</h4>
      <br />
      <h4>放射期间及放疗后可能出现以下某些方面的并发症及后遗症：</h4>
      <div v-for="item in infoList">
        <div>{{ item.content}}</div>
      </div>
      <br />
      <h4>在放射治疗期间医师可以根据患者的病情对于放射治疗实施方案做出调整，经患者本人或法定代理人签字同意后实施。</h4>
      <br />
      <h4>对于上述可能出现的并发症或意外情况我表示理解，同意接受该项治疗，并愿意承担因此而带来的各项风险。</h4>
      <br />
      <div style="display:flex;width:100%;justify-content:space-around">
        <div style="display:flex;justify-content:space-around ;width:80%">
          <div style="width:80%">
            <h4>患者或法定代理人签名</h4>
            <h4>与患者本人关系</h4>
          </div>
          <div style="width:80%">
            <h4>医师签名</h4>
            <h4>上级医生签名</h4>
            <h4>谈话地点</h4>
          </div>
        </div>
      </div>
      <br />
      <div style="display:flex;width:100%;justify-content:space-around">
        <div style="display:flex;justify-content:space-around ;width:80%">
          <div style="width:80%">
            <h4>年 月 日 时 分</h4>
          </div>
          <div style="width:80%">
            <h4>年 月 日 时 分</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import consentTemplate from "./template.vue";

@Component({
  components: { consentTemplate }
})
export default class consent extends AbpBase {
  selectTemplate = false;
  selectItem: any;
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
  determine() {
    this.$router.push({
      name: "historyProgram"
    });
  }

  selectItemChange(item) {
    this.selectItem = item;
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
</style>










