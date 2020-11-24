<style lang="less">
@import "../styles/menu.less";
</style>

<template>
  <Menu
    ref="sideMenu"
    :active-name="$route.name"
    :open-names="openNames"
    :theme="menuTheme"
    width="auto"
    @on-select="changeMenu"
  >
    <template v-for="item in menuList">
      <!-- <MenuItem v-if="item.children.length<=0" :name="item.children[0].name" :key="item.name"> -->
      <!-- <Icon :type="item.icon" :size="iconSize"></Icon> -->
      <!-- <span class="iconfont">{{item.icon}}</span>
        <span>{{ itemTitle(item) }}</span>
      </MenuItem>-->
      <!-- <Submenu v-if="item.children.length > 0" :name="item.name" :key="item.name">
        <template slot="title">
          <i class="iconfont" style="font-size:30px" v-html="item.icon"></i>
          <span>{{ itemTitle(item) }}</span>
        </template>
      </Submenu>-->
      <template v-for="child in item.children">
        <MenuItem :name="child.name" :key="child.name">
          <Icon :type="child.icon" :size="30"></Icon>
          <span v-if="shrink&sleep"><pre>{{ L(child.meta.title) }}</pre></span>
        </MenuItem>
      </template>
    </template>
  </Menu>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Inject,
  Prop,
  Emit,
  Watch
} from "vue-property-decorator";
import AbpBase from "../../../lib/abpbase";
import { Alert } from "iview";
@Component({})
export default class SidebarMenu extends AbpBase {
  name: string = "sidebarMenu";
  sleep: Boolean = true;

  @Prop({ type: Array }) menuList: Array<any>;
  @Prop({ type: Number }) iconSize: number;
  @Prop({ type: String, default: "dark" }) menuTheme: string;
  @Prop({ type: Boolean }) shrink: Boolean;
  @Prop({ type: Array }) openNames: Array<string>;
  itemTitle(item: any): string {
    return this.L(item.meta.title);
  }
  @Emit("on-change")
  changeMenu(active: string) {}

  @Watch("shrink")
  changeShrink(newTxt: string, oldTxt: string) {
    if (newTxt) {
      let self = this;
      setTimeout(function() {
        self.sleep = true;
      }, 200);
    } else {
      this.sleep = false;
    }
  }
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        (this.$refs.sideMenu as any).updateActiveName();
      }
    });
  }
}
</script>