<template>
  <div>
    <div class="cropper-example cropper-first">
      <cropper
        :src="exampleImageSrc"
        :changeProfilePicture="changeProfilePicture"
        @on-crop="handleCroped"
        @on-changeProfilePicture-change="myChangeProfilePicture"
      ></cropper>
    </div>
  </div>
</template>

<script>
import Cropper from "../../../components/cropper";
import { Component, Vue, Inject, Prop } from "vue-property-decorator";

// import { uploadImg } from '@/api/data'
export default {
  name: "cropper_page",

  components: {
    Cropper
  },
  props: {
    changeProfilePicture: Boolean
  },

  data() {
    return {
      exampleImageSrc: ""
    };
  },

  methods: {
    myChangeProfilePicture(val) {
      this.$emit("on-show", val);
    },
    handleCroped(blob) {
      const formData = new FormData();
      formData.append("formFile", blob);
      let self = this;

      this.blobToDataURL(blob, function callback(data) {
        self.$store.dispatch({
          type: "patient/uploadBase64",
          data: { base64string: data }
        });
      });
      // uploadImg(formData).then(() => {
      //   this.$Message.success("Upload success~");
      // });
    },

    blobToDataURL(blob, callback) {
      let a = new FileReader();
      a.onload = function(e) {
        callback(e.target.result);
      };
      a.readAsDataURL(blob);
      a;
    }
  }
};
</script>

