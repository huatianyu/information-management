<template>
  <div>
    <ul style="list-style-type:none">
      <li v-for="item,i in columns">
        <div class="listCard">
          <div
            class="flex-container"
            :style="{backgroundColor:item.selected? '#c5c8ce':''}"
            @click="selectedItem(item)"
          >
            <div class="list-icon">
              <img class="list-icom-img" src="../../../../images/usericon.jpg" />
            </div>
            <div style="display:flex;justify-content:space-between">
              <ul style="list-style-type:none ;margin-left:20px;margin-top:10px;color:#999EAA">
                <li style="line-height: 20px;margin-bottom: 10px;">
                  <b>模板名称:</b> 模板一
                </li>
                <li style="line-height: 20px;margin-bottom: 10px;">
                  <b>简介:</b>简介信息简介信息简介信息简介信息简介信息简介信息简介信息简介信息简介信息简介信息简介信息简介信息简介信息
                </li>
                <li style="line-height: 20px;margin-bottom: 10px;">
                  <b>适用场景:</b> 适用场景适用场景适用场景适用场景适用场景适用场景适用场景适用场景
                </li>
              </ul>
            </div>
          </div>
          <div class="list-icon-rightTriangle"></div>
        </div>
      </li>
    </ul>
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
import { Select } from "iview";

class Item {
  title: String;
  key: String;
  selected: Boolean;
}

@Component({
  components: {}
})
export default class Template extends AbpBase {
  selectItem: Item;
  columns: Item[] = [
    {
      title: "consentTemplate1",
      key: "actions",
      selected: false
    },
    {
      title: "consentTemplate2",
      key: "actions",
      selected: false
    }
  ];

  selectedItem(item) {
    item.selected = !item.selected;
    if (item.selected) {
      this.$emit("on-selectItem", item);
    } else {
      this.$emit("on-selectItem", null);
    }

    this.columns.forEach(element => {
      if (element !== item) {
        element.selected = false;
      }
    });
  }
}
</script>

<style scoped>
ul li {
  line-height: 82px;
  margin-bottom: 10px;
}

.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.listCard {
  border: 1px solid #dcdee2;
  position: relative;

  /* box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); */
  /* background : radial-gradient(#627582, transparent); */
  border-radius: 5px;
  width: 100%;
}
.list-icon {
  height: 120px;
  width: 90px;
  /* background : radial-gradient(#627582, transparent); */
}

.list-icon-rightTriangle {
  width: 0px;
  height: 0px;
  border-width: 8px;
  position: absolute;
  top: 55px;
  left: 90px;
  border-style: dashed dashed dashed solid;
  /* background : radial-gradient(#627582, transparent); */
  /* border-color: transparent transparent transparent #20638f; */
}
.list-icom-img {
  margin: 20px 15px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
}
</style>

