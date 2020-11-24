<template>
  <div class="settingCard">
    <div class="avatar-img setting-flex-container">
      <div class="flex-item1">
        <div class="user-name">{{userName}}</div>
        <div class="user-name-description">医师</div>
        <div class="avatar">
          <img src="../../images/usericon.jpg" />
        </div>
      </div>
      <div class="flex-item2"></div>
    </div>
    <CellGroup @on-click="cellClick">
      <Cell class="cell" name="ManageLinkedAccounts" title="管理账号">
        <Icon type="ios-person" size="20" slot="icon" />
      </Cell>
      <Cell class="cell" name="ChangePassword" title="修改密码">
        <Icon type="ios-more-outline" size="20" slot="icon" />
      </Cell>
      <Cell class="cell" name="LoginAttempts" title="登陆尝试">
        <Icon type="ios-create-outline" size="20" slot="icon" />
      </Cell>
      <Cell class="cell" name="ChangeProfilePicture" title="修改头像">
        <Icon type="md-photos" size="20" slot="icon" />
      </Cell>
      <Cell class="cell" name="MySettings" title="设置">
        <Icon type="md-settings" size="20" slot="icon" />
      </Cell>
      <Cell class="cell" name="LoginOut" title="登出">
        <Icon type="ios-power" size="20" slot="icon" />
      </Cell>
    </CellGroup>
    <Modal v-model="manageLinkedAccounts" width="760" :closable="false">
      <div slot="header" class="flex-container">
        <h3>LinkedAccounts</h3>
        <Button type="primary" icon="md-add" @click="addLinkNewAccountClick">
          <span>LinkedAccounts</span>
        </Button>
      </div>
      <AccountsTable></AccountsTable>
    </Modal>
    <Modal v-model="changePassword" width="360">
      <div slot="header" class="flex-container">
        <h3>修改密码</h3>
      </div>
      <ChangePassword></ChangePassword>
    </Modal>
    <!-- <Modal v-model="linkeNewAccount" width="460">
      <div slot="header" class="flex-container">
        <h3>LinkeNewAccount</h3>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="TenancyName" prop="name">
          <Input placeholder="Enter your TenancyName"></Input>
        </FormItem>
        <FormItem label="UserName *" prop="mail">
          <Input placeholder="Enter your UserName"></Input>
        </FormItem>
        <FormItem label="Password *" prop="city">
          <Input placeholder="Enter your Password"></Input>
        </FormItem>
      </Form>
    </Modal>-->
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
  </div>
</template>
<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
  Model
} from "vue-property-decorator";
import AbpBase from "@/lib/abpbase";
import AccountsTable from "./accountsTable.vue";
import ChangePassword from "./changePassword.vue";
import LoginAttempt from "./loginAttempt.vue";
import MySetting from "./mySetting.vue";

@Component({
  components: { AccountsTable, ChangePassword, LoginAttempt, MySetting }
})
export default class Setting extends AbpBase {
  manageLinkedAccounts = false;
  changePassword = false;
  linkeNewAccount = false;
  loginAttempts = false;
  changeProfilePicture = false;
  mySettings = false;
  data() {
    return {
      loading: true
    };
  }

  get userName() {
    return this.$store.state.session.user
      ? this.$store.state.session.user.name
      : "";
  }

  cellClick(name) {
    switch (name) {
      case "ManageLinkedAccounts":
        this.manageLinkedAccounts = true;
        break;
      case "ChangePassword":
        this.changePassword = true;
        break;
      case "LoginAttempts":
        this.loginAttempts = true;
        break;
      case "ChangeProfilePicture":
        this.changeProfilePicture = true;
        break;
      case "MySettings":
        this.mySettings = true;
        break;
      case "LoginOut":
        this.eventSelected("loginout");
        break;
    }
  }

  eventSelected(name) {
    this.$emit("event-selected", name);
  }
  addLinkNewAccountClick() {
    this.linkeNewAccount = true;
  }
}
</script>

<style scoped>
.cell {
  background-color: rgb(17, 85, 129);
  color: #fff;
}

.cell:hover {
  background-color: rgb(32, 32, 32);
  color: #fff;
}
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.settingCard {
  border: 1px solid;
  border-color: rgb(17, 85, 129);

  border-radius: 5px;
}
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 3px solid #d7ecfb;
  position: relative;
  top: 20px;
  left: 140px;
}
.avatar-img {
  /* background-color: gray; */
  width: 100%;
  height: 100px;
}

.setting-flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100px;
  background-color: #fff;
}

.flex-item1 {
  background-color: rgb(17, 85, 129);
  width: 100%;
  height: 100%;
}
.flex-item2 {
  /* background-color: rgb(32, 32, 32); */
  width: 100%;
  height: 100%;
}
.flex-item3 {
  background-color: #fff;
  width: 100%;
  border: 1px solid #e8eaec;
  height: 100%;
}
.ui {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
.ui li {
  width: 70px;
  margin: 0 0px;
  float: left; /*该处换为display:inline-block;同样效果*/
}

.ui li a {
  width: 100%;
  padding: 0 20px;
  margin-left: -1px;
  font-size: 12px;
  color: #666;
  line-height: 32px;
  border: 1px solid #e8eaec;
  display: inline-block;
  border-right: 0px;
  border-bottom: 0px;
}
.user-name {
  height: 0px;
  position: relative;
  top: 40px;
  left: 70px;
  color: white;
  font-size: 19px;
}
.user-name-description {
  position: relative;
  top: 75px;
  left: 70px;
  width: 250px;
  color: #515a6e;
}
</style>

