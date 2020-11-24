<template>
  <v-card
    :dark="color == '#4dc9a875'"
    :color="color"
    class="pa-2"
    elevation="10"
  >
    <v-icon size="20">{{ icon }}</v-icon>
    <h4 class="font-weight-light">{{ value }}</h4>
  </v-card>
</template>
<script>
import Card from './Card';

export default {
  inheritAttrs: false,
  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.font-weight-light {
  color: #fff;
}

.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  color: rgba(202, 137, 137, 1) !important;
  .v-offset {
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 0 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 0 0 100%;
  }
  .font-weight-light {
    color: #fff;
  }
  .text-xs-right {
    padding-right: 10px;
  }
}
</style>
