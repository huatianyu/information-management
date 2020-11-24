<template >
  <div>
    <v-tabs dark color="white" v-model="tab" background-color="#4dc9a875" centered icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        标签一
        <v-icon>mdi-animation</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        标签二
        <v-icon>mdi-animation</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        标签三
        <v-icon>mdi-animation</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items class="pa-2 py-8" v-model="tab">
      <v-tab-item value="tab-1">
        <v-card flat>
          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="射线类型" class="purple-input pa-0" :disabled="true" value="光子" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="能量" class="purple-input pa-0" :disabled="true" value="6MV" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="治疗方式"
                class="purple-input pa-0"
                :disabled="true"
                value="三维适形"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="处方剂量"
                class="purple-input pa-0"
                :disabled="true"
                value="6000cGy"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="分割次数"
                class="purple-input pa-0"
                :disabled="true"
                value="30次"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field dark label="靶区处方剂量" class="purple-input pa-0" :disabled="true" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="靶区" class="purple-input pa-0" :disabled="true" value="GTV" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="最大剂量"
                class="purple-input pa-0"
                :disabled="true"
                value="202cGy"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="最小剂量"
                class="purple-input pa-0"
                :disabled="true"
                value="198cGy"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="平均剂量"
                class="purple-input pa-0"
                :disabled="true"
                value="200cGy"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="体积(%)>="
                class="purple-input pa-0"
                :disabled="true"
                value="200"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field dark label="危机器官限制剂量" class="purple-input pa-0" :disabled="true" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="危机器官名称"
                class="purple-input pa-0"
                :disabled="true"
                value="脊髓"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="危机器官剂量体积(%)<="
                class="purple-input pa-0"
                :disabled="true"
                value="2121"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="限制剂量" class="purple-input pa-0" :disabled="true" value="50cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="危机器官名称" class="purple-input pa-0" :disabled="true" value="脊髓" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark
                label="危机器官剂量体积(%)<="
                class="purple-input pa-0"
                :disabled="true"
                value="43435"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="限制剂量" class="purple-input pa-0" :disabled="true" value="50cGy" />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否剂量验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否射野验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否复位验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-card flat>
          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="射线类型" class="purple-input pa-0" :disabled="true" value="光子" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="能量" class="purple-input pa-0" :disabled="true" value="6MV" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="治疗方式" class="purple-input pa-0" :disabled="true" value="三维适形" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="处方剂量" class="purple-input pa-0" :disabled="true" value="6000cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="分割次数" class="purple-input pa-0" :disabled="true" value="30次" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field dark label="靶区处方剂量" class="purple-input pa-0" :disabled="true" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="靶区" class="purple-input pa-0" :disabled="true" value="GTV" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="最大剂量" class="purple-input pa-0" :disabled="true" value="202cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="最小剂量" class="purple-input pa-0" :disabled="true" value="198cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="平均剂量" class="purple-input pa-0" :disabled="true" value="200cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="体积(%)>=" class="purple-input pa-0" :disabled="true" value="200" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field dark label="危机器官限制剂量" class="purple-input pa-0" :disabled="true" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="危机器官名称" class="purple-input pa-0" :disabled="true" value="脊髓" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark
                label="危机器官剂量体积(%)<="
                class="purple-input pa-0"
                :disabled="true"
                value="2121"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field  dark label="限制剂量" class="purple-input pa-0" :disabled="true" value="50cGy" />

              <v-label>50cGy</v-label>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="危机器官名称" class="purple-input pa-0" :disabled="true" value="脊髓" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark
                label="危机器官剂量体积(%)<="
                class="purple-input pa-0"
                :disabled="true"
                value="43435"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="限制剂量" class="purple-input pa-0" :disabled="true" value="50cGy" />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否剂量验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否射野验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否复位验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <v-card flat>
          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="射线类型" class="purple-input pa-0" :disabled="true" value="光子" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="能量" class="purple-input pa-0" :disabled="true" value="6MV" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="治疗方式" class="purple-input pa-0" :disabled="true" value="三维适形" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="处方剂量" class="purple-input pa-0" :disabled="true" value="6000cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="分割次数" class="purple-input pa-0" :disabled="true" value="30次" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field dark label="靶区处方剂量" class="purple-input pa-0" :disabled="true" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="靶区" class="purple-input pa-0" :disabled="true" value="GTV" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="最大剂量" class="purple-input pa-0" :disabled="true" value="202cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="最小剂量" class="purple-input pa-0" :disabled="true" value="198cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="平均剂量" class="purple-input pa-0" :disabled="true" value="200cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="体积(%)>=" class="purple-input pa-0" :disabled="true" value="200" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-text-field dark label="危机器官限制剂量" class="purple-input pa-0" :disabled="true" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field  dark label="危机器官名称" class="purple-input pa-0" :disabled="true" value="脊髓" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark
                label="危机器官剂量体积(%)<="
                class="purple-input pa-0"
                :disabled="true"
                value="2121"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="限制剂量" class="purple-input pa-0" :disabled="true" value="50cGy" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="危机器官名称" class="purple-input pa-0" :disabled="true" value="脊髓" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                label="危机器官剂量体积(%)<="
                class="purple-input pa-0"
                :disabled="true"
                value="43435"
              />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="限制剂量" class="purple-input pa-0" :disabled="true" value="50cGy" />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否剂量验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否射野验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field dark label="是否复位验证" class="purple-input pa-0" :disabled="true" value="是" />
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
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
export default class TargetInfoCard extends AbpBase {
  data() {
    return {
      tab: null
    };
  }
}
</script>











