<template>
  <div>
    <Form  label-position="left" :label-width="100">
      <FormItem label="当前密码:">
        <Input></Input>
      </FormItem>
      <FormItem label="新密码:">
        <Input></Input>
      </FormItem>
      <FormItem label="重录新密码:">
        <Input></Input>
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
export default class ChangePassword extends AbpBase {
  data() {
    return {};
  }
}
</script>

<style>
</style>

