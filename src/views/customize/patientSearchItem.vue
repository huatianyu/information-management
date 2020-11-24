<template>
  <div>
    <Form ref="pagerequest">
      <div class="flex-container">
        <div class="flex-content" :style="'height:' + height+ 'px' +':' + ';' ">
          <div class="flex-content-top">{{title}}</div>
          <div class="flex-content-bottom">
            <Row>
              <Col span="24">
                <FormItem>
                  <Input
                    :size="size"
                    v-if="type!='select'"
                    :type="type"
                    :rows="2"
                    :placeholder="'请输入'+ title"
                    v-model="value"
                  ></Input>

                  <Select v-else v-model="model1" style="width:200px">
                    <Option
                      v-for="item in selectList"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row v-if="signature">
              <Col offset="21" span="3">{{'医生:'+ signature}}</Col>
            </Row>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";

@Component({
  components: {}
})
export default class patientSearchItem extends AbpBase {
  @Prop() public title!: string;
  @Prop({ type: String, default: "text" }) public type!: string;
  @Prop() public placeholder!: string;
  @Prop() public height!: number;
  @Prop() public size!: string;
  @Prop() public value: string;
  @Prop() public signature: string;

  @Watch("value")
  async changeCurrentValue(newTxt: boolean, oldTxt: boolean) {
    this.$emit("input", newTxt);
  }
  data() {
    return {
      selectList: [
        {
          value: "0",
          label: "张三"
        },
        {
          value: "1",
          label: "李四"
        },
        {
          value: "2",
          label: "王五"
        }
      ],
      model1: ""
    };
  }
}
</script>

<style scoped lang="less">
.flex-container {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #f3f3f3;
}

.flex-content {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-left: 10px;
}

.flex-content-top {
  width: 100%;
  height: 20%;
}

.flex-content-bottom {
  width: 100%;
  height: 50%;
  color: #999eaa;
  font-weight: 600;
  font-family: "仿宋";
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
