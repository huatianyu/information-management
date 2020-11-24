
<template>
  <div>
    <Card dis-hover style="margin-bottom:10px">
      <Row>
        <Col span="2">
          <B>{{title}}</B>
        </Col>
        <Col span="21">
          <search-button-group
            :selectBtn="selectBtn"
            @title-selected="selected"
            @sort-selected="sortSelected"
            :btnList="btnList"
          ></search-button-group>
        </Col>
        <Col span="1">
          <Button v-if="showBackBtn" @click="goback" type="primary">返回</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import VueRouter from "vue-router";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
import Patient from "./../../store/entities/patient";
import searchButtonGroup from "./searchButtonGroup.vue";

@Component({
  components: {
    searchButtonGroup
  }
})
export default class HeaderBar extends AbpBase {
  @Prop({ type: Array }) btnList: Array<any>;
  @Prop() title: string;
  @Prop() selectBtn: string;
  @Prop({ default: false }) showBackBtn: boolean;

  selected(id) {
    this.$emit("title-selected", id);
  }
  sortSelected(state, item) {
    this.$emit("sort-selected", state, item);
  }
  goback() {
    this.$router.go(-1); //返回上一层
  }
}
</script>