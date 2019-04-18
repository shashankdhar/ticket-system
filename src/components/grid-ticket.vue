<!-- component template -->
<template>
  <section class="table-responsive">
      <form class="form-inline card-content align-items-right">
          <div class="col-sm-12">
            <div class="form-group float-right pl-1">
                <input type="text" name="query" v-model="filterKey" class="search form-control pr-2" placeholder="Search" />              
            </div> 
            <div class="form-group float-right">
              <nav aria-label="Page navigation example">
                <ul class="pagination">                  
                  <li class="page-item pl-1" :class="{ disabled: currentPage === 1 }">
                    <a @click="setPage(1)" class="page-link" href="#">First</a>
                  </li>
                  <li class="page-item pl-1" :class="{ disabled: currentPage === 1 }" >
                    <a @click=movePages(-1) class="page-link" href="#">Previous</a>
                  </li>
                  <li class="page-item pl-1" :class="{ disabled: currentPage == totalPages }">
                    <a @click=movePages(1) class="page-link" href="#">Next</a>
                  </li>
                  <li class="page-item px-1" :class="{ disabled: currentPage === totalPages }">
                    <a @click="setPage(totalPages - 1)" class="page-link" href="#">Last</a>
                  </li>
                  <li class="page-item">
                    <input type="number" min="1" class="form-control pagesearch" v-model="currentNewPage" />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
      </form>
      <table class="table table-striped table-bordered table-hover table-sm">
        <thead>
          <tr>
            <th v-for="(key,value) in ColMapData" @click="sortBy(value)" :class="{ active: sortKey == value }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[value] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredTickets" @click="showModal(entry)">
            <td v-for="(key,value) in ColMapData">
              {{entry[value]}}
            </td>
          </tr>
        </tbody>
      </table>
      <modal v-show="isModalVisible" @close="closeModal" :ticket="cticket" /> 
  </section>
</template>

<script>

import modal from '@/components/modal-ticket.vue';
import * as AppConstants from "../constant";

export default {
  components: {
    modal
  },
  props: {
    tickets: Array,
    columns: Array
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    var ColMapData = AppConstants.MAP_TABLE_DATA;
    return {
      sortKey: '',
      sortOrders: sortOrders,
      ColMapData: ColMapData,
      startRow: 0,
      rowsPerPage: 8,
      currentPage: 1,
      currentNewPage: 1,
      filterKey: '',
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
            return String(row[key]).toLowerCase().match(filterKey)
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
  watch: {
    currentNewPage() {
        this.setPage(this.currentNewPage);
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      this.setPage(1);
    },
    movePages: function(amount) {
      this.currentPage = this.currentPage + amount;
      this.currentNewPage = this.currentPage;      
      var newStartRow = this.startRow + (amount * this.rowsPerPage);
      if (newStartRow >= 0 && newStartRow < this.tickets.length) {
        this.startRow = newStartRow;
      }
    },
    setPage: function(pageNumber) {
      this.movePages(pageNumber - this.currentPage);
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