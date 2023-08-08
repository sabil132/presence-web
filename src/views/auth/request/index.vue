<template>
    <div class="flex flex-col min-h-full grow w-full lg:w-3/5 bg-white">
      <div class="flex justify-center items-start h-full md:items-center">
        <div class="flex flex-col mx-5 lg:mx-0 lg:w-[40%]">
          <div class="flex flex-col items-center w-full mb-14">
            <h1 class="text-3xl font-bold text-powergreen-primary mt-10 lg:mt-0">Request {{ user.is_approved ? "Approved" : "Rejected" }}</h1>
            <p class="mt-1 text-md text-gray-500">your has been approved requets by {{ user.name }} to change photo profile</p>
            <hr class="h-0.5 w-full bg-gray-300 mt-5" />
            <img src="https://cdn1-production-images-kly.akamaized.net/w-gJlNyXz1UJtpTJCxfKSGcHsA4=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3014611/original/039549300_1578373209-000_1NI02U.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.activate()
  },
  methods: {
    activate() {
      axios.patch(`${import.meta.env.VITE_LIVE_URL}/api/employee/request/${this.$route.params.id}`, {
        is_approved: this.$route.query.status
      })
      .then(res => {
        const { meta, data } = res.data;

        if(meta.status === 'success'){
          this.$swal({
            title: 'Success',
            text: meta.message,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.user = data
          })
        }
      })
      .catch(err => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to approve request",
          timer: 3000,
          showConfirmButton: false,
        })
      })
    }
  },
};
</script>
  