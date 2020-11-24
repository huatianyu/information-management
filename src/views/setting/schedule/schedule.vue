<template>
  <v-row class="px-7">
    <v-col>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </v-col>
  </v-row>
</template>
