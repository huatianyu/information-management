<template>
  <v-card v-bind="$attrs" :style="styles" v-on="$listeners">
    <helper-offset v-if="hasOffset" :inline="inline" :full-width="fullWidth" :offset="offset">
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <v-row>
          <v-col cols="9" md="10" sm="9" lg="11">
            <slot v-if="!title && !text" name="header" />
            <span v-else>
              <h4 class="title font-weight-light mb-2" v-text="title" />
              <p class="category font-weight-thin" v-text="text" />
            </span>
          </v-col>
          <v-col v-if="showBackBtn">
            <v-btn title="返回上一级" elevation="0" color="#21212100" @click="goback(status)">
              <v-icon>mdi-page-previous-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <slot v-else name="offset" />
    </helper-offset>
    <v-card-text>
      <slot />
    </v-card-text>
    <v-divider v-if="$slots.actions" class="mx-3" />
    <v-card v-if="$slots.actions">
      <slot name="actions" />
    </v-card>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    showBackBtn: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: undefined
    }
  },
  methods: {
    goback(status) {
      if (status) {
        this.$Modal.confirm({
          title: "提示信息",
          content: "<p>操作尚未保存，是否继续</p>",
          onOk: () => {
            this.$router.go(-1); //返回上一层
          },
          onCancel: () => {}
        });
      } else {
        this.$router.go(-1); //返回上一层
      }
    }
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
        marginTop: `${this.offset * 2}px`
      };
    }
  }
};
</script>

<style lang="scss">
.v-card--material {
  &__header {
    &.v-card {
      border-radius: 4px;
    }
  }
}
</style>
