<template>
  <div>
    <Form  label-position="left" :label-width="100">
      <FormItem label="名:">
        <Input></Input>
      </FormItem>
      <FormItem label="姓:">
        <Input></Input>
      </FormItem>
      <FormItem label="邮箱:">
        <Input></Input>
      </FormItem>
       <FormItem label="电话号码:">
        <Input></Input>
      </FormItem>
        <FormItem label="用户名:">
        <Input disabled ></Input>
        不能改变管理员名称
      </FormItem>
    </Form>
  </div>
</template>
<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
  Model
} from "vue-property-decorator";
import AbpBase from "@/lib/abpbase";

@Component({
  components: {}
})
export default class MySetting extends AbpBase {
  data() {
    return {};
  }
}
</script>

