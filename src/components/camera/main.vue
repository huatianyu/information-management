<template >
  <!-- Modal.cameraModel(v-model="visible" title="拍照" :maskClosable="false" :closable="false" width='800')
    div.content
      scan-doc(ref="scanDoc" @on-imgDataChange="onImgDataChange")
      //- img-operation(ref="imgOperation" @updateImgData="updateImgData" :initImgData="initImgData").right
    Button(slot="footer" @click="visible=false") 取消
    Button(slot="footer" type="primary" @click="okHandler") 确认
  -->

  <Modal
    @on-cancel="cancelUpload"
    @on-ok="okHandler"
    title="拍照"
    v-model="visible"
    :maskClosable="false"
    class="cameraModel"
    :closable="false"
    width="800"
  >
    <div class="content">
      <scan-doc ref="scanDoc" @on-imgDataChange="onImgDataChange"></scan-doc>
    </div>
  </Modal>
</template>

<script>
import scanDoc from "./scan-doc";
import imgOperation from "./img-operation";
import _ from "lodash";

export default {
  components: { scanDoc, imgOperation },
  data() {
    return {
      visible: false,
      initImgData: []
    };
  },
  // watch: {
  //   visible(nv) {
  //     if (!nv) {
  //       this.reset();
  //     }
  //   }
  // },
  mounted() {
    this.$refs.scanDoc.$watch(
      "imgDataArr",
      nv => {
        this.initImgData = nv;
      },
      { deep: true }
    );
  },
  methods: {
    show() {
      this.visible = true;
    },
    /* 桥接：点击某个截取的图像时，将该图像画到canvas中 */
    onImgDataChange(imgdata) {
      if (imgdata) {
        this.$refs.imgOperation.setCanvasImg(imgdata);
      }
    },
    /* 桥接：将修改后的图像信息更新到图像列中 */
    updateImgData(imgdata) {
      this.$refs.scanDoc.updateImgData(imgdata);
    },
    /* 将所有处理完毕的图像传到上级 */
    okHandler() {
      // var fd = new FormData();
      // var blob = this.dataURItoBlob(this.initImgData[0].base);
      //
      this.$emit("getImgOperation", _.cloneDeep(this.initImgData));

      // // fd.append("source_from", "webpage_upload"); //在formdata加入需要的参数
      // // fd.append("formFile", blob);
      this.$store.dispatch({
        type: "patient/uploadBase64",
        data: { base64string: this.initImgData[0].base }
      });
      this.visible = false;
    },
    cancelUpload() {
      if (this.initImgData[0].base) {
        this.$store.commit("patient/changeImgSrc", null);
      }
    },
    // /* 重置 */
    // reset() {
    //   // this.$refs.scanDoc.reset();
    //   // this.$refs.imgOperation.reset();
    // },

    dataURItoBlob(dataURI) {
      //图片转成Buffer

      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  }
};
</script>

<style lang="less">
.cameraModel {
  .content {
    width: 100%;
    height: 30rem;
    overflow-y: auto;
    .left,
    .right {
      width: 50%;
      height: 100%;
      overflow-y: auto;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
}
</style>
