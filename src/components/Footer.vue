<template>
  <div class="copyright">
     <h6>
    {{copyright}}  </h6>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    props:{
        copyright:String
    }
})
export default class Footer extends Vue{
  
}
</script>
<style scoped>
  .copyright{
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    color:#515a6e;
    font-size: 14px;
  }
</style>


