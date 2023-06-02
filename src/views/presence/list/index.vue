<template>
	<DatatableTableWrapper>
    <template #header>
      <DatatableTableHead
        class="px-4"
        table-title="Presence List"
        :button-link="btnCreate"
      />
    </template>
    <DatatableTableBody
    class="my-4"
      :headers="tableHead"
      :data-list="data"
      :action-detail="btnDetail"
      with-actions
    >
      <template #cell(total_working_hours)="{ data }">
        {{ data }} Hours
      </template>
    </DatatableTableBody>
  </DatatableTableWrapper>
</template>
<script>
import axios from 'axios'

export default {
	data() {
    return {
      tableHead: [
        {
          column: 'employee.name',
          displayName: 'Name',
        },
        {
          column: 'total_working_hours',
          displayName: 'Total Working Hours',
        },
        {
          column: 'month',
          displayName: 'Month',
        },
        {
          column: 'year',
          displayName: 'Year',
        },
      ],
      data: [],
      filter: {
        date: this.$moment(),
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    btnDetail(params) {
      this.$router.push(`/presence/${params.employee.id}/${this.$moment(this.date).format('YYYY-MM')}`)
    },
	fetchData() {
    this.$store.global.$patch({
      isLoading: true,
    })

		axios.get(`${import.meta.env.VITE_LIVE_URL}/api/presence`, {
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
	}
  },
}
</script>`