<template>
  <v-hover v-slot:default="{hover}">
    <v-footer dark id="core-footer" absolute height="62">
      <v-expand-transition>
        <v-card 
          v-if="hover"
          light
          width="100%"
          class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text"
        >
          <v-row >
            <v-col offset="2" cols="10">
              <hr />
              <v-spacer />
              <span class="font-weight-light copyright"
                >2018-2019 新瑞阳光粒子医疗装备(无锡)有限公司
                版权所有,所有权利保留</span
              >
            </v-col>
          </v-row>
        </v-card>
      </v-expand-transition>
    </v-footer>
  </v-hover>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style>
#core-footer {
  z-index: 0;
  background-color: aliceblue;
    background-color: rgba(255, 255, 255, 0);

}
.copyright {
  color: wheat !important;
  float:right;
  height: 62px;
  position: relative;
  top:10px;
  padding: 0 10px;
}


</style>
