<template>
  <div>
    <div @click="changeStatus(item)" class="flex-container">
      <Button
        :style="{color:item.selected?'#5090D0':'#fff'} "
        size="small"
        class="btn"
        @click="btnClick(item)"
        :icon="this.upcolor == '#20638F'? 'md-arrow-dropup' :'md-arrow-dropdown'"
      >{{title}}</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";

@Component({
  components: {}
})
export default class SortBtn extends AbpBase {
  upcolor: String = "#20638F";
  downcolor: String = "#B3B3B3";
  @Prop() title: string;
  @Prop({ default: true }) showSortBtn: string;
  @Prop() item: any;
  @Prop({ default: false }) selected: Boolean;
  @Prop() selectBtn: string;

  data() {
    return {};
  }
  changeStatus(item) {
    let tempcolor = this.upcolor;
    this.upcolor = this.downcolor;
    this.downcolor = tempcolor;
    this.$emit("sort-selected", this.upcolor == "#20638F", item);
  }

  btnClick(item) {
    this.$emit("title-selected", item.id);
    if (this.showSortBtn) {
      item.selected = true;
    } else {
      item.selected = !item.selected;
    }
  }
}
</script>

<style scoped lang="less">
.flex-container {
  display: -webkit-flex;
  display: flex;
}
.flex-container-colume {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  float: right;
}

.btn {
  border: 0px;
  margin-left: 10px;
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0)
}
</style>
