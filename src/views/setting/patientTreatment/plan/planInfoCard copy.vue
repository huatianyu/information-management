<template >
  <v-flex>
    <v-card>
    <v-tabs
      background-color="deep-purple accent-4"
      center-active
      dark
    >
      <v-tab>
        <v-row>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('射线类型')+':'" :labelWidth="130"> -->
            <v-label>光子</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('能量')+':'" :labelWidth="130"> -->
            <v-label>6MV</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('治疗方式')+':'" :labelWidth="130"> -->
            <v-label>三维适形</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('处方剂量')+':'" :labelWidth="130"> -->
            <v-label>6000cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('分割次数')+':'" :labelWidth="130"> -->
            <v-label>30次</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- <FormItem :v-label="L('靶区处方剂量')" :labelWidth="130"> -->
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('靶区')+':'" :labelWidth="130"> -->
            <v-label>GTV</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('最大剂量')+':'" :labelWidth="130"> -->
            <v-label>202cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('最小剂量')+':'" :labelWidth="130"> -->
            <v-label>198cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('平均剂量')+':'" :labelWidth="130"> -->
            <v-label>200cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('体积')+ '(%)>='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- <FormItem :v-label="L('危机器官限制剂量')" :labelWidth="130"> -->
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官名称')+':'" :labelWidth="130"> -->
            <v-label>脊髓</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官剂量体积')+ '(%)<='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('限制剂量')+':'" :labelWidth="130"> -->
            <v-label>50cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官名称')+':'" :labelWidth="130"> -->
            <v-label>脊髓</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官剂量体积')+ '(%)<='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('限制剂量')+'(%)<='+':'" :labelWidth="130"> -->
            <v-label>50cGy</v-label>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否剂量验证')+ ':'" :labelWidth="130"> -->
            <v-label>是</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否射野验证')+ ':'" :labelWidth="130"> -->
            <v-label>是</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否复位验证')+ ':'" :labelWidth="130"> -->
            <v-label>否</v-label>
          </v-col>
        </v-row>
      </v-tab>
      <v-tab>
        <v-row>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('射线类型')+':'" :labelWidth="130"> -->
            <v-label>光子</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('能量')+':'" :labelWidth="130"> -->
            <v-label>6MV</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('治疗方式')+':'" :labelWidth="130"> -->
            <v-label>三维适形</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('处方剂量')+':'" :labelWidth="130"> -->
            <v-label>6000cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('分割次数')+':'" :labelWidth="130"> -->
            <v-label>30次</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- <FormItem :v-label="L('靶区处方剂量')" :labelWidth="130"> -->
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('靶区')+':'" :labelWidth="130"> -->
            <v-label>GTV</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('最大剂量')+':'" :labelWidth="130"> -->
            <v-label>202cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('最小剂量')+':'" :labelWidth="130"> -->
            <v-label>198cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('平均剂量')+':'" :labelWidth="130"> -->
            <v-label>200cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('体积')+ '(%)>='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- <FormItem :v-label="L('危机器官限制剂量')" :labelWidth="130"> -->
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官名称')+':'" :labelWidth="130"> -->
            <v-label>脊髓</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官剂量体积')+ '(%)<='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('限制剂量')+':'" :labelWidth="130"> -->
            <v-label>50cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官名称')+':'" :labelWidth="130"> -->
            <v-label>脊髓</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官剂量体积')+ '(%)<='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('限制剂量')+'(%)<='+':'" :labelWidth="130"> -->
            <v-label>50cGy</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否剂量验证')+ ':'" :labelWidth="130"> -->
            <v-label>是</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否射野验证')+ ':'" :labelWidth="130"> -->
            <v-label>是</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否复位验证')+ ':'" :labelWidth="130"> -->
            <v-label>否</v-label>
          </v-col>
        </v-row>
      </v-tab>
      <v-tab>
        <v-row>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('射线类型')+':'" :labelWidth="130"> -->
            <v-label>光子</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('能量')+':'" :labelWidth="130"> -->
            <v-label>6MV</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('治疗方式')+':'" :labelWidth="130"> -->
            <v-label>三维适形</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('处方剂量')+':'" :labelWidth="130"> -->
            <v-label>6000cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('分割次数')+':'" :labelWidth="130"> -->
            <v-label>30次</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col span="24">
            <!-- <FormItem :v-label="L('靶区处方剂量')" :labelWidth="130"> -->
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('靶区')+':'" :labelWidth="130"> -->
            <v-label>GTV</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('最大剂量')+':'" :labelWidth="130"> -->
            <v-label>202cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('最小剂量')+':'" :labelWidth="130"> -->
            <v-label>198cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('平均剂量')+':'" :labelWidth="130"> -->
            <v-label>200cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('体积')+ '(%)>='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- <FormItem :v-label="L('危机器官限制剂量')" :labelWidth="130"> -->
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官名称')+':'" :labelWidth="130"> -->
            <v-label>脊髓</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官剂量体积')+ '(%)<='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('限制剂量')+':'" :labelWidth="130"> -->
            <v-label>50cGy</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官名称')+':'" :labelWidth="130"> -->
            <v-label>脊髓</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('危机器官剂量体积')+ '(%)<='+':'" :labelWidth="130"> -->
            <v-label></v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('限制剂量')+'(%)<='+':'" :labelWidth="130"> -->
            <v-label>50cGy</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否剂量验证')+ ':'" :labelWidth="130"> -->
            <v-label>是</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否射野验证')+ ':'" :labelWidth="130"> -->
            <v-label>是</v-label>
          </v-col>
          <v-col cols="12" md="4">
            <!-- <FormItem :v-label="L('是否复位验证')+ ':'" :labelWidth="130"> -->
            <v-label>否</v-label>
          </v-col>
        </v-row>
      </v-tab>
    </v-tabs>
        </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";

@Component({
  components: {}
})
export default class TargetInfoCard extends AbpBase {}
</script>











