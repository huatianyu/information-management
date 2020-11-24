<template>
  <div>
    <ul style="list-style-type:none">
      <li v-for="item in columns">
        <div class="listCard">
          <div class="flex-container">
            <div class="list-icon">
              <img class="list-icom-img" src="../../images/usericon.jpg" />
            </div>
            <div>
              <ul style="list-style-type:none ;margin-left:100px;margin-top:10px;color:#34bfa3">
                <li style="line-height: 20px;margin-bottom: 10px;">
                  <b>IpAddress:</b> 10.101.2.34
                </li>
                <li style="line-height: 20px;margin-bottom: 10px;">
                  <b>Browser:</b> Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36
                </li>
                <li style="line-height: 20px;margin-bottom: 10px;">
                  <b>Time:</b> 23 minutes ago (2019-05-17 01:25:06)
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

@Component({
  components: {}
})
export default class LoginAttempt extends AbpBase {
  data() {
    return {
      columns: [
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
        },
        {
          title: "Delete",
          key: "delete"
        },
        {
          title: "Delete",
          key: "delete"
        },
        {
          title: "Delete",
          key: "delete"
        }
      ]
    };
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
  border-color: #34bfa3;
  border-radius: 5px;
  width: 100%;
}
.list-icon {
  height: 120px;
  width: 90px;
  background-color: #34bfa3;
}

.list-icon-rightTriangle {
  width: 0px;
  height: 0px;
  border-width: 8px;
  position: absolute;
  top: 55px;
  left: 90px;
  border-style: dashed dashed dashed solid;
  border-color: transparent transparent transparent #34bfa3;
}
.list-icom-img {
  margin: 20px 15px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
}
</style>

