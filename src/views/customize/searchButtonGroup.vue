<template>
  <div class="flex-container">
    <sort-btn
      :selectBtn="selectBtn"
      v-for="btn in btnList"
      :item="btn"
      :showSortBtn="btn.showSort"
      :title="btn.title"
      @title-selected="selected"
      @sort-selected="sortSelected"
    ></sort-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import sortBtn from "./sortBtn.vue";

@Component({
  components: { sortBtn }
})
export default class searchButtonGroup extends AbpBase {
  @Prop({ type: Array }) btnList: Array<any>;
  @Prop() selectBtn: string;

  data() {
    return {};
  }

  selected(id) {
    this.$emit("title-selected", id);
  }
  sortSelected(state, item) {
    this.$emit("sort-selected", state, item);
  }
}
</script>

<style scoped lang="less">
.flex-container {
  display: -webkit-flex;
  display: flex;
  
}
</style>
