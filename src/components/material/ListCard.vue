<template>
  <div>
    <v-card v-bind="$attrs" :style="styles" v-on="$listeners">
      <helper-offset
        v-if="hasOffset"
        :inline="inline"
        :full-width="fullWidth"
        :offset="offset"
      >
        <v-card
          v-if="!$slots.offset"
          :color="color"
          :class="`elevation-${elevation}`"
          class="v-card--material__header"
          dark
        >
          <!-- <v-card-title v-text="title"></v-card-title>

        <v-card-text v-text="text"></v-card-text>
        <v-card-actions>
          <v-btn :color="color" @click="showMore()">更多</v-btn>
          </v-card-actions>-->

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title font-weight-light mb-2">{{
                title
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-icon title="更多" v-if="showMordBtn" @click="showMore()"
              >mdi-format-list-bulleted-square</v-icon
            >
          </v-list-item>
        </v-card>
        <!-- <slot v-else name="offset" /> -->
      </helper-offset>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-divider v-if="$slots.actions" class="mx-3" />

      <v-list dense>
        <template v-for="(item, index) in items">
          <v-list-item
            @click="showPatientDetail(item.id, item.radiotherapyNum)"
          >
            <v-list-item-avatar>
              <v-img
                :src="url + 'upload/' + item.photographPath"
                lazy-src="./../../../public/static/noImage.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                '姓名:' + item.patientName
              }}</v-list-item-title>
              <v-list-item-subtitle
                >日期:
                {{ item.startTime | date('%Y-%m-%d %T') }}</v-list-item-subtitle
              >
              <v-list-item-subtitle>{{
                '状态：' + item.state
              }}</v-list-item-subtitle>
              <v-divider dark></v-divider>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import Card from './Card';
import Item from '../../store/entities/review/projectLocationDetailed';
import url from '@/lib/url';

export default {
  inheritAttrs: false,

  props: {
    ...Card.props,
    url: {
      type: String,
      default: url,
    },
    subText: {
      type: String,
      default: undefined,
    },
    showMordBtn: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    smallValue: {
      type: String,
      default: undefined,
    },
    items: {
      type: Array[Item],
      default: undefined,
    },
  },

  data() {
    return {};
  },

  methods: {
    showMoreReviewTargetingApplication() {
      this.$store.commit(
        'targetResource/setRouterName',
        'reviewTargetingApplication'
      );
      this.$router.push({
        name: 'moreTargetApplication',
      });
    },
    showMoreReviewPlanApplication() {
      this.$store.commit('targetResource/setRouterName', 'planApplication');
      this.$router.push({
        name: 'morePlanApplication',
      });
    },
    showMoreApprovePlan() {
      this.$store.commit('targetResource/setRouterName', 'approvePlan');
      this.$router.push({
        name: 'moreApprovePlan',
      });
    },
    showMoreApprovaltTreatment() {
      this.$store.commit('targetResource/setRouterName', 'approvaltTreatment');
      this.$router.push({
        name: 'moreApprovaltTreatment',
      });
    },
    showMoreExamineLocationResult() {
      this.$store.commit(
        'targetResource/setRouterName',
        'examineLocationResult'
      );
      this.$router.push({
        name: 'moreExamineLocationResult',
      });
    },

    showMore() {
      this.$store.commit('targetResource/setCurrentColor', this.color);
      switch (this.subText) {
        case 'reviewTargetingApplication':
          this.showMoreReviewTargetingApplication();
          break;
        case 'planApplication':
          this.showMoreReviewPlanApplication();
          break;

        case 'approvePlan':
          this.showMoreApprovePlan();
          break;
        case 'approvaltTreatment':
          this.showMoreApprovaltTreatment();
          break;
        case 'examineLocationResult':
          this.showMoreExamineLocationResult();
          break;
      }
    },

    showPatientDetail(id, radiotherapyNum) {
      this.$store.commit('targetResource/setCurrentColor', this.color);
      switch (this.subText) {
        case 'reviewTargetingApplication':
          this.showTarget(id, radiotherapyNum);
          break;
        case 'planApplication':
          this.showPlan(id, radiotherapyNum);
          break;
        case 'examineLocationResult':
          this.showExamineLocationResult(id, radiotherapyNum);
          break;
        case 'approvePlan':
          this.showApprovePlan(id, radiotherapyNum);
          break;
        case 'approvaltTreatment':
          this.showApprovaltTreatment(id, radiotherapyNum);
          break;
      }
    },
    showTarget(id, radiotherapyNum) {
      this.$store.commit('targetResource/setRouterName', this.subText);
      this.$store.dispatch('targetResource/getExaminePatientListQueryAsync', {
        id: id,
        radiotherapyNum: radiotherapyNum,
      });

      this.$router.push({
        name: this.subText,
      });
    },

    showPlan(id, radiotherapyNum) {
      // this.$store.commit("targetResource/setRouterName", this.cardName);
      this.$store.dispatch('targetResource/getPlanOrder', {
        id: id,
        radiotherapyNum: radiotherapyNum,
      });

      this.$store.commit('targetResource/setRouterName', this.subText);
      this.$router.push({
        name: this.subText,
      });
    },

    showExamineLocationResult(id, radiotherapyNum) {
      this.$store.dispatch('targetResource/getExamineResultQueryAsync', {
        LocationId: id,
        RadiotherapyNum: radiotherapyNum,
      });
      this.$store.commit('targetResource/setRouterName', this.subText);
      this.$router.push({
        name: this.subText,
      });
    },

    showApprovePlan(id, radiotherapyNum) {
      // 临时接口 待修改
      // this.$store.dispatch("targetResource/test", {
      //   id: id,
      //   radiotherapyNum: radiotherapyNum
      // });
      this.$store.dispatch('targetResource/getApprovingPlanInfoAsync', {
        id: id,
        radiotherapyNum: radiotherapyNum,
      });
      // this.$store.commit("targetResource/setRouterName", this.subText);
      this.$store.commit('targetResource/test', {
        id: id,
        radiotherapyNum: radiotherapyNum,
      });

      this.$router.push({
        name: this.subText,
      });
    },

    showApprovaltTreatment(id, radiotherapyNum) {
      // this.$store.commit("targetResource/setRouterName", this.cardName);
      // this.$store.dispatch("targetResource/getPlanOrder", {
      //   id: id,
      //   radiotherapyNum: radiotherapyNum
      // });

      this.$store.dispatch('targetResource/getApprovedTreatmentInfoAsync', {
        id: id,
        radiotherapyNum: radiotherapyNum,
      });
      // this.$store.commit("targetResource/setRouterName", this.subText);
      this.$store.commit('targetResource/test', {
        id: id,
        radiotherapyNum: radiotherapyNum,
      });
      this.$router.push({
        name: this.subText,
      });
    },
  },
  computed: {
    hasOffset() {
      return (
        this.$slots.header || this.$slots.offset || this.title || this.text
      );
    },

    styles() {
      if (!this.hasOffset) return null;

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`,
      };
    },
  },
};
</script>

<style lang="scss">
.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background: rgba(255, 255, 255, 0) !important;

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
}
</style>
