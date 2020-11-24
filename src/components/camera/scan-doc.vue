<template >
  <!-- div.scan-doc
    video(ref="video" :width="defaultWH.width+'px'" :height="defaultWH.height+'px'")
    canvas(ref="canvas" :width="defaultWH.width+'px'" :height="defaultWH.height+'px'")
    ul.btn-group
      li(@click="openCamera") 开启摄像头
      li(@click="getImg") 拍照
    div.imgData(v-for="(item,index) in imgDataArr")
  img.imgname(:src="item.base" alt="" @click.self="imgDataDetail(index)")-->

  <div class="scan-doc">
    <video ref="video" :width="defaultWH.width+'px'" :height="defaultWH.height+'px'"></video>
    <canvas ref="canvas" :width="defaultWH.width+'px'" :height="defaultWH.height+'px'"></canvas>
    <ul class="btn-group">
      <li @click="openCamera">开启摄像头</li>
      <li @click="getImg">拍照</li>
      <!-- <li @click="uploadHandler">上传</li> -->
    </ul>
    <div class="imgData" v-for="(item,index) in imgDataArr">
      <img class="imgname" :src="item.base" alt @click.self="imgDataDetail(index)">
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      defaultWH: {
        width: 600,
        height: 450
      },
      MediaStreamTrack: null,
      imgDataArr: [],
      initImgData: [],
      counter: 1
    };
  },
  methods: {
    /* 调用本地摄像头 */
    openCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false
          })
          .then(stream => {
            this.MediaStreamTrack =
              typeof stream.stop === "function"
                ? stream
                : stream.getTracks()[0];
            this.$refs.video.srcObject = stream;
            this.$refs.video.play();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },


    /* 关闭摄像头 */
    closeCamera() {
      this.MediaStreamTrack && this.MediaStreamTrack.stop();
      this.MediaStreamTrack = null;
    },
    /* 获取当前影像为某一图像 */
    getImg() {
      if (!this.MediaStreamTrack) return;
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.drawImage(
        this.$refs.video,
        0,
        0,
        this.defaultWH.width,
        this.defaultWH.height
      );
      let imgData = this.$refs.canvas.toDataURL("image/png");
      this.imgDataArr = [];
      this.imgDataArr.push({
        id: this.counter,
        base: imgData,
        mc: `图像${this.counter}`
      });
      this.counter++;
    },
    getLocalImg() {},
    /* 删除图像 */
    delImgData(index) {
      this.$Modal.confirm({
        title: "删除",
        content: "确认删除该图像？",
        width: 350,
        onOk: () => {
          this.imgDataArr.splice(index, 1);
        }
      });
    },
    /* 提交修改后更新对应修改的图像 */
    updateImgData(imgdata) {
      let findIndex = _.findIndex(
        this.imgDataArr,
        item => item.id === imgdata.id
      );
      this.$set(this.imgDataArr, findIndex, imgdata);
    },

    uploadHandler() {
      if (this.imgDataArr.length > 0) {
        this.$store.dispatch({
          type: "patient/uploadBase64",
          data: { base64string: this.imgDataArr[0].base }
        });
      }
    },
    /* 将点击的图像画入到操作图像的canvas中去 */
    imgDataDetail(index) {
      this.$emit("on-imgDataChange", _.cloneDeep(this.imgDataArr[index]));
    },
    /* 重置 */
    reset() {
      this.closeCamera();
      this.MediaStreamTrack = null;
      this.imgDataArr = [];
      this.counter = 1;
    }
  }
};
</script>

<style lang="less">
.scan-doc {
  video {
    position: absolute;
    background-color: #000;
    box-shadow: 1px 1px 10px 1px #aaa;
  }
  canvas {
    display: none;
  }
  .btn-group {
    list-style: none;
    float: right;
    width: 13%;
    margin-right: 1.5rem;
    margin-top: 5rem;
    li {
      text-align: center;
      border: 1px solid #aaa;
      margin: 2rem 0;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
    .label-li {
      width: 100rem;
      background-color: red;
    }
    label {
      // text-align: center;
      // border: 1px solid #aaa;
      // margin: 2rem 0;
      // cursor: pointer;
      // padding: 0.5rem 1rem;
      // border-radius: 8px;
      width: 100%;
    }
    input {
      display: none;
      height: 0;
    }
  }
  .imgData {
    cursor: pointer;
    width: 180px;
    height: 135px;
    overflow: hidden;
    position: relative;
    margin-right: 2.5rem;
    background-color: #000;
    float: left;
    &:hover {
      & > .mc {
        top: 0px;
      }
      & > .del {
        bottom: 0px;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .mc,
    .del {
      position: absolute;
      width: 100%;
      color: #fff;
      z-index: 1;
      font-size: 14px;
      background-color: #aaa;
      text-align: center;
    }
    .mc {
      top: -21px;
    }
    .del {
      bottom: -21px;
      &:hover {
        color: #c53929;
      }
    }
  }
}
</style>
