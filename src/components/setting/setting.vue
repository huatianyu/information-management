<template>
  <div class="lock-screen-btn-con">
    <Tooltip :content="L('系统设置')" placement="bottom">
      <Icon style="margin-top:2px" :size="24" type="md-settings" />
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import AbpBase from "../../lib/abpbase";
import Cookies from "js-cookie";
@Component
export default class LockScreen extends AbpBase {

  mounted() {

  }
}
</script>

