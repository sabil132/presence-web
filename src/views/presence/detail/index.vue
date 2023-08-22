<template>
	<MiscCard
    title="Detail Presence"
    title-action="Back"
    :action="backToPresence"
  >
    <div class="grid grid-cols-2">
      <div class="flex flex-col">
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Full Name</label>
          <p>{{ data.name }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Unit</label>
          <p>{{ data.unit }}</p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Position</label>
          <p>{{ data.position }}</p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Join Date</label>
          <p>{{ $moment(data.date_entry).format('DD MMMM YYYY') }} </p>
        </div>
        <div class="mt-4">
          <label class="text-slate-400 font-medium">Length Of Working</label>
          <p>{{ $moment().diff(data.date_entry, 'days') }} Day</p>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-6 mt-4">
      <h1 class="text-slate-400 font-medium">History Presence</h1>
      <span class="border-t border-solid w-[87%]"></span>
    </div>
    <DatatableTableWrapper class="mt-0">
      <template #header>
        <DatatableTableHead
          class="px-4"
          :button-link="btnCreate"
          :button-show-search="false"
          :button-show-filter="false"
        />
      </template>
      <DatatableTableBody
        class="my-4"
        :headers="tableHead"
        :data-list="data.presence"
        :with-actions="false"
      >
      <template #cell(date)="{ data }">
        {{ $moment(data).format('DD MMMM YYYY') }}
      </template>
      <template #cell(working_hours)="{ data }">
        {{ data }} {{ data? 'Hours' : '-' }}
      </template>
      <template #cell(clock_in)="{ data }">
        {{ $moment(data).format('HH:mm') }}
      </template>
      <template #cell(clock_out)="{ data }">
        {{ $moment(data).format('HH:mm') }}
      </template>
      </DatatableTableBody>
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
          column: 'date',
          displayName: 'Date',
        },
        {
          column: 'clock_in',
          displayName: 'Time In',
        },
        {
          column: 'clock_out',
          displayName: 'Time Out',
        },
        {
          column: 'working_hours',
          displayName: 'Working Hours',
        },
      ],
      data: []
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

      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/presence/${this.$route.params.id}/${this.$route.params.month}`, {
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
        this.$store.global.$patch({
          isLoading: false,
        })
      })
    },
    backToPresence() {
      this.$router.push('/presence')
    },
  },
}
</script>`