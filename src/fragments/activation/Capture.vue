<template>
  
</template>
<script>
export default {
  data() {
    return {
      camera: null,
      canvas: null,
      imgSrc: null,
    }
  },
  computed: {
    isPhotoTaken() {
      return this.imgSrc ? true : false;
    },

  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.camera = this.$refs.camera;
    // this.createCameraElement();
    document.addEventListener("beforeunload", this.stopCameraStream)
  },
  unmounted() {
    this.stopCameraStream();
    document.removeEventListener("beforeunload", this.stopCameraStream)
  },
  methods: {
    initCanvas() {
      this.canvas.setAttribute("width", this.camera.videoWidth);
      this.canvas.setAttribute("height", this.camera.videoHeight);
    },
    createCameraElement() {
      this.imgSrc = null;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.camera.srcObject = stream;
          this.camera.play()
        })
        .catch(error => {
          console.log(error);
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "May the browser didn't support or there is some errors.",
            timer: 3000,
            showConfirmButton: false,
          })
        });
    },
    stopCameraStream() {
      let tracks = this.camera.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    },
    takePhoto() {
      const context = this.canvas.getContext("2d");

      context.drawImage(this.camera, 0, 0, this.camera.videoWidth, this.camera.videoHeight);
      this.imgSrc = this.canvas.toDataURL("image/png");
      this.stopCameraStream();
    },
    onTabChange() {
      if (document.visibilityState === "visible") {
        this.createCameraElement();
      }else{
        this.stopCameraStream();
      }
    },
  },
}
</script>
<style>
  
</style>