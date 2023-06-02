<template>
  <MiscCard title="Detail Employee" title-action="Back" :action="backToEmployee">
    <div class="grid grid-cols-2">
      <div class="flex flex-col">
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Name</label>
          <p>{{ data.name }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Place Of Birth</label>
          <p>{{ data.place_of_birth }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Date Of Birth</label>
          <p>{{ $moment(data.date_of_birth).format('DD MMMM YYYY') }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Gender</label>
          <p>{{ data.gender }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Marital Status</label>
          <p>{{ data.marital_status }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Phone</label>
          <p>{{ data.phone }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Email</label>
          <p>{{ data.email }}</p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Role</label>
          <p>{{ data.role }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Unit</label>
          <p>{{ data.Unit?.name }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Position</label>
          <p>{{ data.Position?.name }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Date Entry</label>
          <p>{{ $moment(data.date_entry).format('DD MMMM YYYY') }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Is Active</label>
          <MiscBadge
            v-if="!data.is_active"
            color="#EA9291"
            roundedMd
          >
            <p class="text-white">Inactive</p>
          </MiscBadge>
          <MiscBadge
            v-else
            color="#1fa446"
            roundedMd
          >
            <p class="text-white">Active</p>
          </MiscBadge>
        </div>
      </div>
    </div>
  </MiscCard>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$store.global.$patch({
        isLoading: true,
      })

      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/employee/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
        .then(res => {

          const { meta, data } = res.data;

          if (meta.status === 'success') {
            this.data = data;
          }
        })
        .catch(err => {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Failed to fetch data, please try again later",
            timer: 3000,
            showConfirmButton: false,
          })
        })
        .finally(() => {
          this.$store.global.$patch({
            isLoading: false,
          })
        })
    },
    backToEmployee() {
      this.$router.push('/employee')
    },
  },
}
</script>`