<!-- component template -->
<template>
  <section>
      <table>
        <thead>
          <tr>
            <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredHeroes" @click="openTicket">
            <td v-for="key in columns">
              {{entry[key]}}
            </td>
          </tr>
        </tbody>
      </table>
      <div id="page-navigation">
        <button @click=movePages(-1)>Back</button>

        <button @click=movePages(1)>Next</button>
      </div>
  </section>
</template>

<script>

export default {
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String,
    openTicket: Function
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
      rowsPerPage: 10
    }
  },
  computed: {
    filteredHeroes: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes.slice(this.startRow, this.startRow + this.rowsPerPage)
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
      if (newStartRow >= 0 && newStartRow < this.heroes.length) {
        this.startRow = newStartRow;
      }
    }
  }
}
</script>