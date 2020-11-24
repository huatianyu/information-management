<template>
  <v-container fill-height fluid>
    <v-navigation-drawer
      id="app-drawer"
      v-model="inputValue"
      app
      floating
      persistent
      mobile-break-point="991"
      :width="menuWidth"
    >
      <v-list>
        <v-list-item class="pa-6">
          <v-img :src="'../../../../img/icons/large-newrt-logo.png'"></v-img>
        </v-list-item>
        <v-list-item link dark></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav height="800">
        <template v-for="menuItem in menuList">
          <v-list-item-group v-model="selectItem">
            <v-list-item
              dark
              active-class="#4dc9a875"
              v-for="child in menuItem.children"
              @click="handleChange(child.name)"
            >
              <v-list-item-icon>
                <v-img
                  height="20px"
                  width="20px"
                  :src="'../../../../img/icons/'+ child.icon +'.png'"
                ></v-img>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <pre class="menu-title-width"> {{child.meta.title}}</pre>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import List from "./List.vue";
import FormBasic from "../../../basicInfo/formBasic.vue";
import VueRouter from "vue-router";

@Component({
  components: {}
})
export default class Drawer extends AbpBase {
  @Prop({ type: Function }) beforePush: Function;
  @Prop({ type: Array }) menuList: Array<any>;
  selectItem: Number = 0;

  get sidebarOverlayGradiant() {
    return "rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 1)";
  }
  get menuWidth() {
    // return this.$store.state.app.menuWidth;
    return 200; //不收缩
  }
  get inputValue() {
    return this.$store.state.app.drawer;
  }
  set inputValue(val) {
    this.$store.state.app.drawer = val;
  }
  data() {
    return {
      item: 0
    };
  }

  handleChange(name: string) {
    alert()
    localStorage.setItem("CURRENTMENU", name);
    let willpush = true;
    if (this.beforePush !== undefined) {
      if (!this.beforePush(name)) {
        willpush = false;
      }
    }
    if (willpush) {
      this.$router.push({ name: name });
    }
  }
}
</script>
<style  scoped>
#app-drawer {
  background: rgba(19, 1, 1, 0.4);
}
.menu-title-width {
  font-size: 16px;
  font-family: "微软雅黑";
  margin-left: -5px;
}
</style>