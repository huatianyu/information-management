<template>
  <div id="app">
    <v-app>
      <v-img  :src="img" height="100%">
        <router-view></router-view>
      </v-img>
    </v-app>
    <core-footer />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import '@/styles/index.scss';
@Component({})
export default class App extends Vue {
  get sidebarOverlayGradiant() {
    return 'rgba(36, 60, 69, 0.7) ,rgba(36, 60, 69, 0.7)';
  }
  imgName: Number = 1;
  // img: String = '../img/icons/table-background1.jpg';

  get img() {
    return (
      '../img/icons/table-background' +
      this.$store.state.app.themeImage +
      '.jpg'
    );
  }

  //   mounted() {i
  //     let self = this;
  //     var i = 1;
  //     setInterval(function() {
  //       //  self.imgName = 2
  //       if (i <= 24) {
  //         self.img = '../img/icons/table-background'  + i + '.jpg';
  //         i++;
  //       } else {
  //         i = 1;
  //       }
  //     }, 5000);
  //   }
}
</script>

<style>
html,
body {
  width: 100%;
  background: #f0f0f0;
  overflow: hidden auto;
}
#app {
  height: calc(100vh);
  /* background-image: url("../public/img/icons/table-background.jpg"); */
  background-size: cover;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
input {
  background-color: transparent;
}
</style>
