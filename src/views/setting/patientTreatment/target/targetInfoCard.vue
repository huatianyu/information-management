<template >
  <div>
    <Row :gutter="10">
      <Col span="12">
        <FormItem :label="L('固定部位')+':'" style="width:100%">
          <label>头部</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('体位')+':'" style="width:100%">
          <label>双手体侧</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('特殊要求')+':'" style="width:100%">
          <label>仰卧</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('固定装置')+':'" style="width:100%">
          <label>头颈面罩</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('备注')+':'" style="width:100%">
          <label></label>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col span="12">
        <FormItem :label="L('计划系统')+':'" style="width:100%">
          <label>Pinnacle</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('扫描设备')+':'" style="width:100%">
          <label>Philips Big Bore</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('扫描部位')+':'" style="width:100%">
          <label>肺部</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('扫描范围')+':'" style="width:100%">
          <label></label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('扫描方式')+':'" style="width:100%">
          <label>平扫</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('扫描厚度')+':'" style="width:100%">
          <label>3mm</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('扫描过程')+':'" style="width:100%">
          <label>头先进</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('碘过敏试验')+':'" style="width:100%">
          <label>阳性</label>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem :label="L('其他要求')+':'" style="width:100%">
          <label></label>
        </FormItem>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";

@Component({
  components: {}
})
export default class TargetInfoCard extends AbpBase {}
</script>






