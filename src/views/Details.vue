<template>
  <main>
    <div class="container-details">
      <div class="card">
        <canvas id="chart1"></canvas>
      </div>
      <div class="card">
        <canvas id="chart2"></canvas>
      </div>
      <div class="card">
        <canvas id="chart3"></canvas>
      </div>
    </div>
    <div class="container-details">
      <div class="card card-ticket-table">
        <div id="search">
          Search <input name="query" v-model="searchQuery" />
        </div>
        <div class="card-content">
              <gridTicket :heroes="gridData" :columns="gridColumns" :open-ticket="showModal" :filter-key="searchQuery"></gridTicket>
              <modal v-show="isModalVisible" @close="closeModal" />       
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import Chart from 'chart.js';
import modal from '@/components/modal-ticket.vue'
import gridTicket from '@/components/grid-ticket.vue'
import tickets from '@/assets/Sample Data.json'

var gridData = Array(100).fill(null).map(function() {
  return Object.assign({}, tickets[Math.floor(Math.random() * 4)]);
});

const chart_options = {
  responsive: true,
  maintainAspectRatio: false
}

const pie_one = {
    type: 'pie',
    data: {
          datasets: [{
              data: [10, 20, 30],
              backgroundColor: [
                'red',
                'yellow',
                'blue']
          }],
          labels: [
              'Red',
              'Yellow',
              'Blue'
          ]
    },
    options: chart_options
}

const pie_two = {
    type: 'doughnut',
    data: {
          datasets: [{
              data: [10, 20, 30],
              backgroundColor: [
                'red',
                'yellow',
                'blue']
          }],
          labels: [
              'Red',
              'Yellow',
              'Blue'
          ]
    },
    options: chart_options
}

const pie_three = {
    type: 'bar',
    data: {
          datasets: [{
              data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
              backgroundColor: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
              label: 'Ticket Data'
          }],
          labels: [
              'January',
              'Febuary',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
          ]
    },
    options: chart_options
}

export default {
  data () {
    return {
      searchQuery: '',
      gridColumns: ['ticket', 'Requestor', 'Requestor', 'RequestorSeniority', 'FiledAgainst', 'TicketType', 'Severity', 'Priority'],
      gridData: gridData,
      chartData1: pie_one,
      chartData2: pie_two,
      chartData3: pie_three,
      isModalVisible: false
    }
  },
  components: {
    gridTicket,
    modal
  },
  mounted() {
    this.createChart('chart1', this.chartData1);
    this.createChart('chart2', this.chartData2);
    this.createChart('chart3', this.chartData3);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>
