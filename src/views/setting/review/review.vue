<template >
  <v-row class="purple-input pa-7">
    <v-col>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: {}
})
export default class Review extends AbpBase {}
</script>


<style scoped>
.header-btn {
  display: flex;
}
</style>









