<template>
  <div>
    <Dropdown>
      <div @click="changeStatus" class="flex-container">
        <Button icon="md-contacts" type="primary" class="btn-margin btn-border">
          {{title}}
          <div class="flex-container-colume">
            <Icon v-if="showSortBtn" size="10" type="md-arrow-dropup" />
            <Icon v-else size="10" type="md-arrow-dropdown" />
          </div>
        </Button>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem>item1</DropdownItem>
        <DropdownItem>item2</DropdownItem>
        <DropdownItem>item3</DropdownItem>
        <DropdownItem>item4</DropdownItem>
        <DropdownItem>item5</DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
export default class InfoBtn extends AbpBase {
  @Prop({ default: "#20638F" }) upcolor: string;
  @Prop({ default: "#B3B3B3" }) downcolor: string;
  @Prop() title: string;
  @Prop({ default: true }) showSortBtn: boolean;

  data() {
    return {};
  }
  changeStatus() {
    this.showSortBtn = !this.showSortBtn;
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
  margin-top: 4px;
}
.btn-margin {
  margin-left: 10px;
}
.btn-border {
  border: 0px;
}
</style>
