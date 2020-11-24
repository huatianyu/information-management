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
      <!-- <v-img
        src="https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg"
        :gradient="sidebarOverlayGradiant"
        height="100%"
      > -->
        <v-list>
          <v-list-item>
            <v-container>
              <v-row justify="center">
                <v-col md="9">
                  <v-list-item-avatar>
                    <v-img src="./../../assets/header-logo.png"></v-img>
                  </v-list-item-avatar>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>

          <v-list-item link v-if="menuWidth==260">
            <v-list-item-content>
              <v-list-item-title class="title">切换患者</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav height="800" width="260">
          <template v-for="menuItem in menuList">
            <v-list-item-group>
              <v-list-item
                active-class="primary"
                v-for="child in menuItem.children"
                @click="handleChange(child.name)"
              >
                <v-list-item-icon v-if="menuWidth==260">
                  <v-icon v-text="child.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-icon v-if="menuWidth==80" v-text="child.icon"></v-icon>
                  <v-list-item-title v-if="menuWidth==260" v-text="child.meta.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </template>
        </v-list>
      <!-- </v-img> -->
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
  get sidebarOverlayGradiant() {
    return "rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.74)";
  }
  get menuWidth() {
    return this.$store.state.app.menuWidth;
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