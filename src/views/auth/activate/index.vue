<template>
  <LoginSideImage />
  <div class="flex flex-col min-h-full grow w-full lg:w-3/5 bg-white">
    <div class="flex justify-center items-start h-full md:items-center">
      <div class="flex flex-col mx-5 lg:mx-0 lg:w-[60%]">
        <div class="flex flex-col w-full mb-14">
          <h1 class="text-4xl font-bold text-powergreen-primary mt-10 lg:mt-0">Activation Account</h1>
          <p class="mt-1 text-md text-gray-500">please insert your password to activate your account</p>
        </div>
        <!-- <div class="flex flex-col mb-20"> -->
          <!-- form step -->
          <!-- <div class="relative flex items-center justify-center">
            <div class="flex flex-col items-center absolute left-0 -top-3 z-10">
              <span class="flex items-center justify-center w-7 h-7 rounded-full bg-powergreen-primary text-white font-semibold">
                1
              </span>
              <p class="text-gray-500 text-sm">capture image</p>
            </div>
            <div class="relative w-[70%] h-[5.6px] flex justify-center border border-powergreen-primary rounded-full -left-1">
              <span 
                class="h-1 rounded-full bg-powergreen-primary absolute left-0" 
                :class="{
                  'w-1/2': step === 'capture',
                  'w-full': step === 'password',
                }"
              />
            </div>
            <div class="flex flex-col items-center absolute right-0 -top-3 z-10">
              <span class="flex items-center justify-center w-7 h-7 rounded-full bg-powergreen-primary text-white font-semibold">
                2
              </span>
              <p class="text-gray-500 text-sm">create password</p>
            </div>
          </div> -->
        <!-- </div> -->

        <!-- Capture -->
        <!-- <template v-if="step === 'capture'">
          <div class="camera-box">  
            <video
              ref="camera"  
              class="bg-slate-500 w-full"
              :class="{'hidden': isPhotoTaken}"
              @canplay="initCanvas"
            />
            <img 
              v-if="isPhotoTaken" 
              :src="input.imgSrc"
            />
            <canvas 
              id="photoTaken" 
              ref="canvas" 
              class="bg-slate-500 w-full hidden"
            />
          </div>
          <div class="w-full flex mt-5">
            <button
              v-if="!isPhotoTaken"
              type="submit"
              class="w-full md:ml-0 font-bold py-2.5 px-14 rounded-md flex items-center justify-center text-white bg-powergreen-primary"
              @click="takePhoto"
              >
              <span class="text-base">Capture</span>
            </button>
          </div>
          <div class="flex w-full space-x-3">
            <button
              v-if="isPhotoTaken"
              type="submit"
              class="w-full md:ml-0 font-bold py-2.5 px-14 rounded-md flex items-center justify-center text-white bg-powergreen-primary"
              @click="createCameraElement"
            >
              <span class="text-base">Change</span>
            </button>
            <button
              v-if="isPhotoTaken"
              type="submit"
              class="w-full md:ml-0 font-bold py-2.5 px-14 rounded-md flex items-center justify-center text-white bg-powergreen-primary"
              @click="step = 'password'"
            >
              <span class="text-base">Next</span>
            </button>
          </div>
        </template> -->

        <!-- Form Password -->
        <template v-if="step === 'password'">
          <VeeForm
            ref="form"
            v-slot="{ meta }"
            :validation-schema="schema"
            @submit="activate"
          >

            <!-- password Field -->
            <VeeField
              v-slot="{ field }"
              v-model="input.password"
              name="password"
              cc
            >
              <FormPasswordfield
                v-bind="field"
                id="password"
                v-model="input.password"
                label="Password"
                placeholder=""
                class="w-full"
              />
              <ErrorMessage
                class="text-xs text-red-600"
                name="password"
              />
            </VeeField>

            <!-- password Field -->
            <VeeField
              v-slot="{ field }"
              v-model="input.confirmPassword"
              name="confirmPassword"
            >
              <FormPasswordfield
                v-bind="field"
                id="confirmPassword"
                v-model="input.confirmPassword"
                label="Confirm Password"
                placeholder=""
                class="w-full mt-3"
              />
              <ErrorMessage
                class="text-xs text-red-600"
                name="confirmPassword"
              />
            </VeeField>
            
            <!-- Login Button -->
            <div class="w-full flex mt-5">
              <button
                type="submit"
                class="w-full md:ml-0 font-bold py-2.5 px-14 rounded-md flex items-center justify-center text-white"
                :class="{
                  '!bg-gray-400 cursor-not-allowed': !meta.valid,
                  'bg-powergreen-primary': meta.valid,
                }"
                :disabled="!meta.valid"
              >
                <span class="text-base">Activate Account</span>
              </button>
            </div>
          </VeeForm>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import LoginSideImage from "@/fragments/auth/LoginSideImage.vue";
import Capture from "@/fragments/activation/Capture.vue";
import FormPassword from "@/fragments/activation/FormPassword.vue";

export default {
  components: {
    LoginSideImage,
    Capture,
    FormPassword
  },
  data() {
    return {
      step: 'password',
      imgSrc: null,
      input: {
        imgSrc: '',
        password: '',
        confirmPassword: ''
      },
      schema: {
        password: 'required',
        confirmPassword: 'required|match:@password'
      }
    }
  },
  computed:{
    isPhotoTaken() {
      return this.input.imgSrc ? true : false
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.camera = this.$refs.camera;
    // this.createCameraElement();
    // document.addEventListener("beforeunload", this.stopCameraStream)
  },
  unmounted() {
    // this.stopCameraStream();
    // document.removeEventListener("beforeunload", this.stopCameraStream)
  },
  methods: {
    // initCanvas() {
    //   this.canvas.setAttribute("width", this.camera.videoWidth);
    //   this.canvas.setAttribute("height", this.camera.videoHeight);
    // },
    // createCameraElement() {
    //   this.input.imgSrc = null;

    //   const constraints = (window.constraints = {
    //     audio: false,
    //     video: true,
    //   });

    //   navigator.mediaDevices
    //     .getUserMedia(constraints)
    //     .then(stream => {
    //       this.camera.srcObject = stream;
    //       this.camera.play()
    //     })
    //     .catch(error => {
    //       this.$swal({
    //         toast: true,
    //         position: "top-end",
    //         icon: "error",
    //         title: "May the browser didn't support or there is some errors.",
    //         timer: 3000,
    //         showConfirmButton: false,
    //       })
    //     });
    // },
    // stopCameraStream() {
    //   let tracks = this.camera.srcObject.getTracks();

    //   tracks.forEach(track => {
    //     track.stop();
    //   });
    // },
    // takePhoto() {
    //   const context = this.canvas.getContext("2d");

    //   context.drawImage(this.camera, 0, 0, this.camera.videoWidth, this.camera.videoHeight);
    //   this.input.imgSrc = this.canvas.toDataURL("image/png");
    //   this.stopCameraStream();
    // },
    activate() {
      // const formData = new FormData();

      axios.patch(`${import.meta.env.VITE_LIVE_URL}/api/auth/activate/${this.$route.query.token}`, {
        password: this.input.password
      })
      .then(res => {
        const { meta } = res.data;

        if(meta.status === 'success'){
          this.$swal({
            title: 'Success',
            text: meta.message,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push({ name: 'login' })
          })
        }
      })
      .catch(err => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to activate account, Please try again later!",
          timer: 3000,
          showConfirmButton: false,
        })
      })
    }
  },
};
</script>
