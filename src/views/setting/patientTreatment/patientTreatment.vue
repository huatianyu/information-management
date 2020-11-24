
<template>
  <v-row class="purple-input pa-7">
    <v-col>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </v-col>
  </v-row>
</template>
