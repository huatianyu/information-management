<template>
  <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
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
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon title="返回首页" color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge color="error" overlap>
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title v-text="notification" />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{on}">
            <v-list>
              <div style="margin:12px 0px 0px 10px">孙大庆</div>
              <div style="margin:0px 0px 5px 10px">医师</div>
            </v-list>
            <v-list-item-avatar>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571801070185&di=6a2fd84e9c3d336f273aa3f8f8a88dfd&imgtype=0&src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2013%2F0806%2F20130806082942771.jpg"
                v-on="on"
                alt="John"
              />
            </v-list-item-avatar>
          </template>
          <v-card dark>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571801070185&di=6a2fd84e9c3d336f273aa3f8f8a88dfd&imgtype=0&src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2013%2F0806%2F20130806082942771.jpg"
                    alt="John"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>孙大庆</v-list-item-title>
                  <v-list-item-subtitle>主治医师</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    :class="fav ? 'red--text' : ''"
                    icon
                    @click="fav = !fav"
                  >
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item @click="eventSelected('ChangeTheme')">
                <v-list-item-title>切换主题</v-list-item-title>
              </v-list-item>
              <v-list-item @click="eventSelected('ChangePassword')">
                <v-list-item-title>修改密码</v-list-item-title>
              </v-list-item>
              <v-list-item @click="eventSelected('LoginAttempts')">
                <v-list-item-title>登陆尝试</v-list-item-title>
              </v-list-item>
              <v-list-item @click="eventSelected('ChangeProfilePicture')">
                <v-list-item-title>修改头像</v-list-item-title>
              </v-list-item>
              <v-list-item @click="eventSelected('MySettings')">
                <v-list-item-title>设置</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item @click="eventSelected('ManageLinkedAccounts')">
              <v-list-item-title>ManageLinkedAccounts</v-list-item-title>
            </v-list-item>-->
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
import {mapMutations} from 'vuex';

export default {
  data: () => ({
    notifications: [
      '测试数据1',
      '测试数据2',
      '测试数据3',
      '测试数据4',
      '测试数据5',
    ],
    fav: true,
    menu: false,
    message: false,
    hints: true,
    title: null,
    responsive: false,
    responsiveInput: false,

    items: [{title: 'test'}, {title: 'test'}, {title: 'test'}, {title: '注销'}],
    closeOnContentClick: true,
  }),

  watch: {
    $route(val) {
      this.title = val.meta.title;
    },
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener('resize', this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    goback() {
      this.$router.go(-1); //返回上一层
    },
    eventSelected(name) {
      this.$emit('event-selected', name);
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    },
  },
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
h6 {
  color: #fff;
}
</style>
