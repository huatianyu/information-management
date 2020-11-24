
<template>
  <v-row class="purple-input pa-7">
    <v-col>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </v-col>
  </v-row>
</template>
