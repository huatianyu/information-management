<template>
  <div>
    <Table highlight-row border :columns="columns5" :data="data5"></Table>
    <!-- <Page
      show-sizer
      class-name="fengpage"
      :total="totalCount"
      class="margin-top-10"
      @on-change="changePage"
      @on-page-size-change="pagesizeChange"
      :page-size="pageSize"
      :current="currentPage"
    ></Page> -->
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
export default class AccountsTable extends AbpBase {
  data() {
    return {
      columns5: [
        {
          title: "Actions",
          key: "actions"
        },
        {
          title: "UserName",
          key: "userName",
          sortable: true
        },

        {
          title: "Delete",
          key: "delete"
        }
      ],
      data5: [
        {
          userName: "John Brown",
          actions: 18,
          delete: "test"
        },
        {
          userName: "Jim Green",
          actions: 24,
          delete: "test"
        },
        {
          userName: "Joe Black",
          actions: 30,
          delete: "test"
        },
        {
          userName: "Jon Snow",
          actions: 26,
          delete: "test"
        }
      ]
    };
  }
}
</script>

<style>
</style>

