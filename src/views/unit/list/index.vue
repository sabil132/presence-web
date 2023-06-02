<template>
	<DatatableTableWrapper>
    <template #header>
      <DatatableTableHead
        class="px-4"
        table-title="Unit List"
        button-title="Create Unit"
        :button-link="btnCreate"
        button-show
      />
    </template>
    <DatatableTableBody
    class="my-4"
      :headers="tableHead"
      :data-list="data"
      :action-detail="btnDetail"
      :action-delete="btnDelete"
      :action-edit="btnEdit"
      with-actions
    >
      <!-- <template #cell(Head_Unit.Employee.name)="{ data }">
        <MiscBadge
          v-if="!data"
          color="#EA9291"
          roundedMd
        >
          <span class="text-white">Not Assign</span>
        </MiscBadge>
      </template> -->
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
          column: 'name',
          displayName: 'Name',
        },
        {
          column: 'Head_Unit.Employee.name',
          displayName: 'Head Unit',
        }
      ],
      data: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    btnCreate() {
      this.$router.push('/unit/create')
    },
    btnEdit(params) {
      this.$router.push(`/unit/edit/${params.id}`)
    },
    btnDelete(params) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1fa446',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(({ isConfirmed }) => {
        if(isConfirmed) {
          axios.delete(`${import.meta.env.VITE_LIVE_URL}/api/unit/${params.id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
          })
          .then((res) => {
            const { meta } = res.data;

            if(meta.status === 'success'){
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Employee deleted successfully",
                timer: 1000,
                showConfirmButton: false,
              })
              .then(() => {
                this.fetchData()
              })
            }
          })
          .catch((err) => {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "Failed to delete employee",
              timer: 3000,
              showConfirmButton: false,
            })
          })
        }
      })
    },
    btnDetail(param) {
      this.$router.push(`/unit/${param.id}`)
    },
	fetchData() {
    this.$store.global.$patch({
      isLoading: true,
    })

		axios.get(`${import.meta.env.VITE_LIVE_URL}/api/unit`, {
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