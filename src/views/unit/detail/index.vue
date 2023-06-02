<template>
	<MiscCard
    title="Detail Unit"
    title-action="Back"
    :action="backToUnit"
  >
    <div class="grid grid-cols-2">
      <div class="flex flex-col">
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Name</label>
          <p>{{ data.name }}</p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Head Unit</label>
          <MiscBadge
            v-if="!data.Head_Unit"
            color="#EA9291"
            roundedMd
          >
            <p class="text-white">Not Yet Assigned</p>
          </MiscBadge>
          <p v-else>{{ data.Head_Unit.Employee.name }} </p>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-6 mt-4">
      <h1 class="text-slate-400 font-medium">Employee List</h1>
      <span class="border-t border-solid w-[87%]"></span>
    </div>
    <DatatableTableWrapper class="mt-0">
      <template #header>
        <DatatableTableHead
          class="px-4"
          :button-link="btnCreate"
        />
      </template>
      <DatatableTableBody
        class="my-4"
        :headers="tableHead"
        :data-list="listEmployee"
        :with-actions="false"
      />
    </DatatableTableWrapper>
  </MiscCard>
</template>
<script>
import axios from 'axios'

export default {
	data() {
    return {
      tableHead: [
        {
          column: 'name',
          displayName: 'Full Name',
        },
        {
          column: 'Position.name',
          displayName: 'Position',
        },
        {
          column: 'date_entry',
          displayName: 'Join Date',
        },
      ],
      data: [],
      listEmployee: []
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

      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/unit/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then(res => {

        const { meta, data } = res.data;

        if(meta.status === 'success') {
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
        this.fetchEmployee()
      })
    },
    fetchEmployee() {
      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/employee/unit/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      })
      .then(res => {

        const { meta, data } = res.data;

        if(meta.status === 'success') {
          this.listEmployee = data;
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
    backToUnit() {
      this.$router.push('/unit')
    },
  },
}
</script>`