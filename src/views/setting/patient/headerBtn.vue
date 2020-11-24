<template >
  <div>
    <info-btn title="病人管理"></info-btn>
    <info-btn title="医生管理"></info-btn>
    <info-btn title="初诊管理"></info-btn>
    <info-btn title="支付管理"></info-btn>
    <info-btn title="病房分配"></info-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
import timeline from "../../../views/setting/timeline/timeline.vue";
import infoBtn from "./infoBtn.vue";

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: { timeline, infoBtn }
})
export default class HeaderBtn extends AbpBase {}
</script>


<style scoped>
.btn {
  margin-left: 10px;
}
</style>










