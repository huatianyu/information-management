<template>
  <material-card :style="color=='#002d2175'?'box-shadow: #f3f3f32b 0px 10px 8px 0px;':''"  v-bind="$attrs" class="v-card--material-stats" v-on="$listeners">
    <v-card :elevation="10" slot="offset" :class="`elevation-${elevation}`" :color="color" class="pa-4" dark>
      <v-icon size="40">{{ icon }}</v-icon>
    </v-card>
    <div class="text-xs-right" >
      <p
        @click="showMore()"
        :style="'color:#fff'"
        class="category font-weight-light"
        v-text="title"
      />
      <h3 class="title display-1 font-weight-light">{{ value }}</h3>
    </div>
    <!-- <template slot="actions">
      <v-row no-gutters>
        <v-col cols="12">
          <v-list dense>
            <template v-for="(item, index) in items">
              <v-list-item @click="showPatientDetail(item.id,item.radiotherapyNum)">
                <v-list-item-avatar>
                  <v-img
                    src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                    lazy-src="./../../../public/static/noImage.png"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="500"
                    max-height="300"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{'姓名:'+item.patientName}}</v-list-item-title>
                  <v-list-item-subtitle>{{'扫描设备:'+item.scanningEquipment}}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{'放疗号：'+item.radiotherapyNum}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
      </v-row>
      <v-icon :color="subIconColor" size="20" class="mr-2">{{ subIcon }}</v-icon>
      <span :class="subTextColor" class="caption font-weight-light" v-text="subText" />
    </template>-->
  </material-card>
</template>

<script>
import Card from "./Card";
import Item from "../../store/entities/review/projectLocationDetailed";

export default {
  inheritAttrs: false,

  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true
    },
    subIcon: {
      type: String,
      default: undefined
    },
    subIconColor: {
      type: String,
      default: undefined
    },
    subTextColor: {
      type: String,
      default: undefined
    },
    subText: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      default: undefined
    },
    smallValue: {
      type: String,
      default: undefined
    },
    items: {
      type: Array[Item],
      default: undefined
    }
  },

  data() {
    return {};
  },
  methods: {
    showMoreReviewTargetingApplication() {
      this.$store.commit(
        "targetResource/setRouterName",
        "reviewTargetingApplication"
      );
      this.$router.push({
        name: "moreTargetApplication"
      });
    },
    showMoreReviewPlanApplication() {
      this.$store.commit("targetResource/setRouterName", "planApplication");
      this.$router.push({
        name: "morePlanApplication"
      });
    },

    showMore() {
      switch (this.subText) {
        case "reviewTargetingApplication":
          this.showMoreReviewTargetingApplication();
          break;
        case "planApplication":
          this.showMoreReviewPlanApplication();
          break;
      }
    },

    showPatientDetail(id, radiotherapyNum) {
      switch (this.subText) {
        case "reviewTargetingApplication":
          this.showTarget(id, radiotherapyNum);
          break;
        case "planApplication":
          this.showPlan(id, radiotherapyNum);
          break;
      }
    },
    showTarget(id, radiotherapyNum) {
      this.$store.commit("targetResource/setRouterName", this.subText);
      this.$store.dispatch("targetResource/getExaminePatientListQueryAsync", {
        id: id,
        radiotherapyNum: radiotherapyNum
      });

      this.$store.commit("targetResource/setRouterName", this.subText);

      this.$router.push({
        name: this.subText
      });
    },

    showPlan(id, radiotherapyNum) {
      // this.$store.commit("targetResource/setRouterName", this.cardName);
      this.$store.dispatch("targetResource/getPlanOrder", {
        id: id,
        radiotherapyNum: radiotherapyNum
      });
      this.$store.commit("targetResource/setRouterName", this.subText);
      this.$router.push({
        name: this.subText
      });
    }
  }
};
</script>

<style lang="scss">
.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background: rgba(202, 137, 137, 0) !important;
  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 16px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
  .font-weight-light {
    color: #fff;
  }
  .text-xs-right {
    padding-right: 10px;
  }
}
</style>
