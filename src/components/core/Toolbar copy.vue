<template>
  <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-btn v-else dark class="default v-btn--simple">
          {{ title }}
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
      </v-toolbar-title>
    </div>
    <v-spacer />
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="搜索"
          hide-details
          color="purple"
        />
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        <!-- <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
          <router-link v-ripple slot="activator" class="toolbar-items" to="/notifications">
            <v-badge color="error" overlap>
              <template slot="badge">{{ notifications.length }}</template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
        </router-link>-->

        <v-menu bottom right   content-class="dropdown-menu"  transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-badge color="error" overlap>
              <template slot="badge">{{ notifications.length }}</template>
              <v-icon v-on="on" color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </template>
          <v-card>
            <!-- <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title v-text="notification" />
              </v-list-tile>
            </v-list>-->
          </v-card>
        </v-menu>
        <!-- <v-icon color="tertiary">mdi-account</v-icon> -->

        <v-menu v-model="menu"  class="toolbar-items" :close-on-content-click="false" :nudge-width="200">
          <template v-slot:activator="{ on }">
            <v-icon color="tertiary" v-on="on">mdi-account</v-icon>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>孙大庆</v-list-item-title>
                  <v-list-item-subtitle>主治医师</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item @click="eventSelected('loginout')">
                <v-list-item-title>注销</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    notifications: [
      "测试数据1",
      "测试数据2",
      "测试数据3",
      "测试数据4",
      "测试数据5"
    ],
    fav: true,
    menu: false,
    message: false,
    hints: true,
    title: null,
    responsive: false,
    responsiveInput: false,

    items: [
      { title: "test" },
      { title: "test" },
      { title: "test" },
      { title: "注销" }
    ],
    closeOnContentClick: true
  }),

  watch: {
    $route(val) {
      this.title = val.meta.title;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    eventSelected(name) {
      this.$emit("event-selected", name);
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  }
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
