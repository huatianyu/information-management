<template>
  <iframe
    class="iframe-ohifviewer"
    width="100%"
    :src="'http://10.101.1.232:9090/viewer/' + OHIFViewerName"
  ></iframe>
    <!-- <iframe
    class="iframe-ohifviewer"
    width="100%"
    :src="'http://59.44.27.81:8090/viewer/' + OHIFViewerName"
  ></iframe> -->
</template>
<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: {},
})
export default class OhifViewer extends AbpBase {
  @Prop() public OHIFViewerName: String;
}
</script>

<style scoped>
.header-btn {
  display: flex;
}
.iframe-ohifviewer {
  height: calc(100vh);
}
</style>
