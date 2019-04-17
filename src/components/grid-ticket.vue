<!-- component template -->
<template>
  <section class="table-responsive">
      <form class="form-inline card-content align-items-right">
          <div class="col-sm-12 offset-md-6 col-md-6">
            <div class="form-group float-right">
              <input type="text" name="query" v-model="filterKey" class="search form-control" placeholder="Search" />
            </div> 
            <div class="form-group float-right">
              <a href="#" class="btn" @click=movePages(-1)>Back</a>
              <a href="#" class="btn" @click=movePages(1)>Next</a>
            </div>          
          </div>
      </form>
      <table class="table table-striped table-bordered table-hover table-sm">
        <thead>
          <tr>
            <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredTickets" @click="showModal(entry)">
            <td v-for="key in columns">
              {{entry[key]}}
            </td>
          </tr>
        </tbody>
      </table>
      <modal v-show="isModalVisible" @close="closeModal" :ticket="cticket" /> 
  </section>
</template>

<script>

import modal from '@/components/modal-ticket.vue'

export default {
  components: {
    modal
  },
  props: {
    tickets: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      startRow: 0,
      rowsPerPage: 8,
      isModalVisible: false,
      cticket: null
    }
  },
  computed: {
    filteredTickets: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var tickets = this.tickets
      if (filterKey) {
        tickets = tickets.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        tickets = tickets.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return tickets.slice(this.startRow, this.startRow + this.rowsPerPage)
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    movePages: function(amount) {
      var newStartRow = this.startRow + (amount * this.rowsPerPage);
      if (newStartRow >= 0 && newStartRow < this.tickets.length) {
        this.startRow = newStartRow;
      }
    },
    showModal(ticket) {
      this.cticket = ticket;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>