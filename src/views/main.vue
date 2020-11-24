<style lang="less">
@import './main.less';
</style>
<template>
  <div class="main">
    <div class="sidebar-menu-con">
      <core-drawer :menu-list="menuList" :before-push="beforePush" />
    </div>
    <div>
      <core-view />
    </div>
  
  </div>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import shrinkableMenu from '../components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from '../components/tags-page-opened.vue';
import breadcrumbNav from '../components/breadcrumb-nav.vue';
import fullScreen from '../components/fullscreen.vue';
import lockScreen from '../components/lockscreen/lockscreen.vue';
import notice from '../components/notices/notice.vue';
import util from '../lib/util';
import copyfooter from '../components/Footer.vue';
import LanguageList from '../components/language-list.vue';
import AbpBase from '../lib/abpbase';
import Setting from './main/setting.vue';
import Clock from '@/components/clock';
import setting from '@/components/setting/setting.vue';

@Component({
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    notice,
    copyfooter,
    LanguageList,
    Setting,
    Clock,
    setting,
  },
})
export default class Main extends AbpBase {
  shrink: boolean = false;

  get userName() {
    return this.$store.state.session.user
      ? this.$store.state.session.user.name
      : '';
  }
  get sidebarOverlayGradiant() {
    return 'rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.44)';
  }
  isFullScreen: boolean = false;
  messageCount: string = '0';

  get openedSubmenuArr() {
    return this.$store.state.app.openedSubmenuArr;
  }
  get menuList() {
    return this.$store.state.app.menuList;
  }
  get pageTagsList() {
    return this.$store.state.app.pageOpenedList as Array<any>;
  }
  get currentPath() {
    return this.$store.state.app.currentPath;
  }
  get lang() {
    return this.$store.state.app.lang;
  }
  get avatorPath() {
    return localStorage.avatorImgPath;
  }
  get cachePage() {
    return this.$store.state.app.cachePage;
  }
  get menuTheme() {
    return this.$store.state.app.menuTheme;
  }
  get mesCount() {
    return this.$store.state.app.messageCount;
  }
  get notFormPage() {
    return (
      this.$store.state.app.currentPageName === 'home' ||
      this.$store.state.app.currentPageName === 'patienttreatmentlist' ||
      this.$store.state.app.currentPageName === 'reviewList' ||
      this.$store.state.app.currentPageName === 'moreList'
    );
  }
  get menuWidth() {
    return this.$store.state.app.menuWidth;
  }

  set menuWidth(value) {
    this.$store.state.app.menuWidth = value;
  }

  init() {
    let pathArr = util.setCurrentPath(this, this.$route.name as string);
    this.$store.commit('app/updateMenulist');
    if (pathArr.length >= 2) {
      this.$store.commit('app/addOpenSubmenu', pathArr[1].name);
    }
    let messageCount = 3;
    this.messageCount = messageCount.toString();
    this.checkTag(this.$route.name);
  }

  leave() {
    if (this.notFormPage) {
      this.menuWidth = 260;
    } else {
      this.menuWidth = 80;
    }
  }
  toggleClick() {
    this.shrink = !this.shrink;
  }

  eventSelected(name: string) {
    if (name === 'loginout') {
      this.$store.commit('app/logout', this);
      util.abp.auth.clearToken();
      location.reload();
    }
  }
  handleClickUserDropdown(name: string) {
    if (name === 'ownSpace') {
      util.openNewPage(this, 'ownspace_index', null, null);
      this.$router.push({
        name: 'ownspace_index',
      });
    } else if (name === 'loginout') {
      this.$store.commit('app/logout', this);
      util.abp.auth.clearToken();
      location.reload();
    }
  }
  checkTag(name?: string) {
    let openpageHasTag = this.pageTagsList.some((item: any) => {
      if (item.name === name) {
        return true;
      } else {
        return false;
      }
    });
    if (!openpageHasTag) {
      util.openNewPage(
        this,
        name as string,
        this.$route.params || {},
        this.$route.query || {}
      );
    }
  }

  beforePush(name: string) {
    if (name === 'accesstest_index') {
      return false;
    } else {
      return true;
    }
  }

  @Watch('$route')
  routeChange(to: any) {
    this.$store.commit('app/setCurrentPageName', to.name);
    let pathArr = util.setCurrentPath(this, to.name);
    if (pathArr.length > 2) {
      this.$store.commit('app/addOpenSubmenu', pathArr[1].name);
    }
    this.checkTag(to.name);
    localStorage.currentPageName = to.name;

    if (this.notFormPage) {
      this.shrink = false;
    } else {
      this.shrink = true;
    }
  }
  @Watch('lang')
  langChange() {
    util.setCurrentPath(this, this.$route.name as string);
  }
  mounted() {
    this.init();
    this.$store.dispatch({
      type: 'app/getDictionariesModelInfoAsync',
    });
    this.$store.dispatch({
      type: 'patient/getChiefDoctors',
    });
  }
  created() {
    this.$store.commit('app/setOpenedList');
  }
}
</script>
<style scoped>
.topTriangle {
  width: 10px;
  height: 10px;
  border-width: 0 15px 15px;
  border-style: solid;
  border-color: transparent transparent#e9eba0;
  position: relative;
  top: 0px;
  left: 170px;
}

.clock-position {
  position: absolute;
  font-size: 14px;
  top: 25px;
  right: 120px;
}

.flex-item3 {
  width: 10%;
  height: 60px;
}
.icon-arow {
  margin: 0px;
  padding: 0px;
}
.tool-position {
  float: left;
  margin-right: 6px;
  margin-top: 20px;
}
.page-toTop {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
