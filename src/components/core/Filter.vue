<template>
  <v-card>
    <v-row>
      <v-col v-for="(img, index) in images" :key="img" cols="2">
        <v-img :src="img" height="120" @click.native="setImage(index)">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row> </template
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    images: [],
  }),
  mounted() {
    this.images = this.backgroundImgArray();
  },
  methods: {
    backgroundImgArray() {
      for (let i = 1; i <= 24; i++) {
        this.images.push('../img/icons/table-background' + i + '.jpg');
      }
      return this.images;
    },
    setImage(index) {
      this.$store.commit('app/ChangeTheme', index + 1);
    },
  },
};
</script>

<style lang="scss">
.v-avatar,
.v-responsive {
  cursor: pointer;
}
</style>
