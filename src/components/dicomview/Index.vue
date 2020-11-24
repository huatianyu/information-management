<template>
<div>
  <div  id="dicomImage"></div>
</div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    show2: true
  }),
  mounted() {
    const _this = this;
    var element = document.getElementById("dicomImage");
    console.log("cornerstone:", cornerstone);
    console.log("dicomParser:", dicomParser);
    console.log("cornerstoneWADOImageLoader:", cornerstoneWADOImageLoader);
    cornerstone.enable(element);
      var url = 'wadouri:\\static\\dcm\\' + num + '.DCM'
    this.loadAndViewImage(url);
  },
  methods: {
    //当点击加载图像时 调用 loadAndViewImage 加载 Dicom 图像
    loadAndViewImage(imageId) {
      //找到 要放置 Dicom Image 的元素
      var element = document.getElementById("dicomImage");
      // cornerstone.loadAndCacheImage 函数 负责加载图形 需要 图像地址 imageId
      cornerstone.loadAndCacheImage(imageId).then(
        function(image) {
          var viewport = cornerstone.getDefaultViewportForImage(element, image);
          cornerstone.displayImage(element, image, viewport);
        },
        function(err) {
          console.dir(err);
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dicomImage {
  height: 88.5vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
