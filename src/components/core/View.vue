<template>
  <div>
    <v-content>
      <!-- <v-img
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571908136057&di=a9f04e32d4a2470d100e5cb7ba10770c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F577249ac2b495.jpg"
      :gradient="sidebarOverlayGradiant"
      height="100%"
      >-->
      <div id="core-view">
        <div class="main-view">
          <core-toolbar @event-selected="eventSelected" />
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </div>
      </div>
      <v-dialog v-model="ChangeTheme">
        <!-- <v-card>
          <v-card-title>
            <v-row>
              <v-col offset="2"> <span>切换主题</span></v-col>
            </v-row>
          </v-card-title>
          <v-pagination
            dark
            color="green"
            circle
            v-model="page"
            :length="24"
          ></v-pagination>
      <Filter></Filter>

          <v-btn class="green" text @click="ChangeTheme = false">
            关闭
          </v-btn>
        </v-card> -->

        <Core-filter></Core-filter>
      </v-dialog>
      <Modal v-model="changePassword" width="360">
        <div slot="header" class="flex-container">
          <h3>修改密码</h3>
        </div>
        <ChangePassword></ChangePassword>
      </Modal>
      <Modal v-model="loginAttempts" width="660">
        <div slot="header" class="flex-container">
          <h3>登录尝试</h3>
        </div>
        <LoginAttempt></LoginAttempt>
      </Modal>
      <Modal v-model="changeProfilePicture" width="660">
        <div slot="header" class="flex-container">
          <h3>修改头像</h3>
        </div>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">上传头像照片</Button>
        </Upload>
      </Modal>
      <Modal v-model="mySettings" width="660">
        <div slot="header" class="flex-container">
          <h3>我的设置</h3>
        </div>
        <mySetting></mySetting>
      </Modal>
    </v-content>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import AbpBase from './../../lib/abpbase';
import util from './../../lib/util';
import AccountsTable from '../../views/main/accountsTable.vue';
import ChangePassword from '../../views/main/changePassword.vue';
import LoginAttempt from '../../views/main/loginAttempt.vue';
import MySetting from '../../views/main/mySetting.vue';
import Filter from '@/components/core/Filter.vue';

@Component({
  components: {AccountsTable, ChangePassword, LoginAttempt, MySetting, Filter},
})
export default class View extends AbpBase {
  page: Number = 1;
  @Watch('page')
  changePage(newTxt: Number, oldTxt: Number) {
    this.$store.commit('app/ChangeTheme', newTxt);
  }
  manageLinkedAccounts = false;
  ChangeTheme = false;
  changePassword = false;
  linkeNewAccount = false;
  loginAttempts = false;
  changeProfilePicture = false;
  mySettings = false;
  get pageTagsList() {
    return this.$store.state.app.pageOpenedList as Array<any>;
  }
  get sidebarOverlayGradiant() {
    return 'rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.44)';
  }
  //退出登录
  eventSelected(name) {
    switch (name) {
      case 'ChangeTheme':
        this.ChangeTheme = true;
        break;
      case 'ManageLinkedAccounts':
        this.manageLinkedAccounts = true;
        break;
      case 'ChangePassword':
        this.changePassword = true;
        break;
      case 'LoginAttempts':
        this.loginAttempts = true;
        break;
      case 'ChangeProfilePicture':
        this.changeProfilePicture = true;
        break;
      case 'MySettings':
        this.mySettings = true;
        break;
      case 'loginout':
        this.$store.commit('app/logout', this);
        util.abp.auth.clearToken();
        location.reload();
        break;
    }
  }
}
</script>

<style scoped lang="scss">
.v-card__title {
  color: #eee;
}
#core-view {
  overflow-y: visible;
  background-color: #eee;
  height: calc(100vh);
  background: rgba(255, 255, 255, 0);
}
.main-view {
  height: calc(90vh);
}
</style>
