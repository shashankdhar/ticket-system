<!-- component template -->
<template>
  <section class="table-responsive">
      <form class="form-inline card-content align-items-right">
          <div class="col-sm-12 offset-md-6 col-md-6">
            <div class="form-group float-right">
              <input type="text" name="query" v-model="filterKey" class="search form-control" placeholder="Search" />
            </div> 
            <div class="form-group float-right">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage == 0 }" ><a @click=movePages(-1) class="page-link" href="#">Previous</a></li>
                  <li v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber == totalPages - 1 || pageNumber == 0" class="page-item">
                     <a class="page-link" href="#" @click="setPage(pageNumber - 1)"  :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages - 1 && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 0 && Math.abs(pageNumber - currentPage) > 3)}">{{ pageNumber }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage == totalPages - 1 }"><a @click=movePages(1) class="page-link" href="#">Next</a></li>
                </ul>
              </nav>
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

import modal from '@/components/modal-ticket.vue';

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
      currentPage: 0,
      isModalVisible: false,
      resultCount: 0,
      cticket: {}
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
      this.resultCount = tickets.length;
      return tickets.slice(this.startRow, this.startRow + this.rowsPerPage)
    },
    totalPages: function() {
      return Math.ceil(this.resultCount / this.rowsPerPage)
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
      this.currentPage = this.currentPage - amount;
      var newStartRow = this.startRow + (amount * this.rowsPerPage);
      if (newStartRow >= 0 && newStartRow < this.tickets.length) {
        this.startRow = newStartRow;
      }
    },
    setPage: function(pageNumber) {
      this.movePages(pageNumber - this.currentPage);
      this.currentPage = pageNumber;
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