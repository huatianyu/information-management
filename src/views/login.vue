<template>
  <div class="main">
    <!-- <v-img height="100%" :src="'../../img/icons/newrt-logo.png'"></v-img> -->

    <v-card class="logingPosition">
      <v-avatar class="mx-auto d-block" size="130">
        <div class="logo-background">
          <div class="logo"></div>
        </div>
      </v-avatar>
      <div class="text-position">
        <div class="tenant-title">{{'XXXXXXX医院'}}</div>
        <div class="tenant-title">{{'放疗科'}}</div>
        <v-form class="my-0" ref="loginForm">
          <v-row class="my-0">
            <v-col cols="12" lg="12" md="12" sm="12" xl="12">
              <v-text-field
                label="用户名"
                dark
                type="text"
                required
                v-model="loginModel.userNameOrEmailAddress"
                :rules="[rules.requiredName]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" xl="12">
              <v-text-field
                label="密码"
                dark
                type="password"
                :rules="[rules.requiredPasssword, rules.min]"
                v-model="loginModel.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xl="6">
              <v-checkbox dark v-model="loginModel.rememberMe" label="记住用户名?"></v-checkbox>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" xl="6">
              <v-btn large color="#eeeded00" elevation="0" class="forgetpassword">{{L('忘记密码?')}}</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div class="loginBtn">
          <v-btn width="100%" height="60" color="#57A7DA" @click="login">{{L('LogIn')}}</v-btn>
        </div>
        <div class="company">Copy Right 2018-2019 新瑞阳光粒子医疗装备(无锡)有限公司</div>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import iView from "iview";
import AbpBase from "../lib/abpbase";
@Component({
  components: {}
})
export default class Login extends AbpBase {
  loginModel = {
    userNameOrEmailAddress: "",
    password: "",
    rememberMe: false
  };
  showChangeTenant: boolean = false;
  async login() {
    if ((this.$refs.loginForm as any).validate()) {
      this.$Message.loading({
        content: this.L("LoginPrompt"),
        duration: 0
      });
      await this.$store.dispatch({
        type: "app/login",
        data: this.loginModel
      });
      sessionStorage.setItem(
        "rememberMe",
        this.loginModel.rememberMe ? "1" : "0"
      );
      location.reload();
    }
  }
  get tenant() {
    return this.$store.state.session.tenant;
  }
  data() {
    return {
      rules: {
        requiredName: value => !!value || "请输入用户名",
        requiredPasssword: value => !!value || "请输入密码",
        min: v => v.length >= 6 || "请输入6位有效密码"
      }
    };
  }

  created() {}
}
</script>
<style scoped>
.logo {
  position: absolute;
  top: -75px;
  height: 130px;
  width: 130px;
  background-color: #01545f;
  border-radius: 65px;
  border: 10px #01454a solid;
  background: url("../../public/img/icons/newrt-logo.png");
  background-size: cover;
}

.logo-background {
  position: absolute;
  height: 75px;
  width: 150px;
  border-radius: 0px 0px 75px 75px;
  /* background-color: #01545f;

  border: 10px #025662 solid; */
}
.logingPosition {
  border-radius: 10px;
  -webkit-align-items: center;
  align-items: center;
  width: 780px;
  height: 520px;
  padding: 0px 140px 0px 140px;
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.main {
  display: flex;
  height: 900px;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}
.tenant-title {
  font-size: 18px;
  line-height: 18px;
  -webkit-align-self: center; /* Safari 7.0+ */
  align-self: flex-end;

  color: #fff;
  text-align: center;
}
.loginBtn {
  position: relative;
  top: -20px;
}
.company {
  margin-top: 0px;
  height: 20px;
  -webkit-align-self: center; /* Safari 7.0+ */
  align-self: flex-end;
  color: #fff;
  font-size: 12px;
  text-align: center;
}
.forgetpassword {
  float: right;
  font-size: 14px;
  margin-top: 3px;
}
.text-position {
  position: relative;
  top: -40px;
  left: 10px;
}
</style>
