<template>
	<DatatableTableWrapper>
    <template #header>
      <DatatableTableHead
        v-model="pagination"
        class="px-4"
        table-title="Employee List"
        button-title="Create Employee  "
        :button-link="btnCreate"
        :button-show-filter="false"
        button-show
      />
    </template>
    <DatatableTableBody
    class="my-4"
      :headers="tableHead"
      :data-list="data"
      :action-detail="btnDetail"
      :action-edit="btnEdit"
      :action-delete="btnDelete"
      with-actions
    >
      <template #cell(date_entry)="{ data }">
        {{ $moment(data).format('DD MMMM YYYY') }}
      </template>
      <template #cell(is_active)="{data}">
        <MiscBadge
            v-if="data === '-'"
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
          column: 'name',
          displayName: 'Name',
        },
        {
          column: 'role',
          displayName: 'Role',
        },
        {
          column: 'Position.name',
          displayName: 'Position',
        },
        {
          column: 'Unit.name',
          displayName: 'Unit',
        },
        {
          column: 'date_entry',
          displayName: 'Join Date',
        },
        {
          column: 'is_active',
          displayName: 'Status',
        }
      ],
      pagination: {
        search: '',
      },
      data: []
    }
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    btnCreate() {
      this.$router.push('/employee/create')
    },
    btnEdit(params) {
      this.$router.push(`/employee/edit/${params.id}`)
    },
    btnDelete(params) {
      this.$swal({
        title: 'Are you sure?',
        text: `You want to delete this employee`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1fa446',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(({ isConfirmed }) => {
        if(isConfirmed) {
          axios.delete(`${import.meta.env.VITE_LIVE_URL}/api/employee/${params.id}`, {
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
              timer: 1000,
              showConfirmButton: false,
            })
          })
        }
      })
    },
    btnDetail(param) {
      this.$router.push(`/employee/${param.id}`)
    },
    fetchData() {
      this.$store.global.$patch({
        isLoading: true,
      })

      axios.get(`${import.meta.env.VITE_LIVE_URL}/api/employee?name=${this.pagination.search || ''}`, {
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
          timer: 1000,
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