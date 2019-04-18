<template>
  <main class="detail-wrapper">
    <nav class="navbar navbar-light">
      <span class="navbar-brand mb-0 h1">
        <img class="logo" :src=logo />
      </span>
      <button class="btn btn-outline-info" type="button" @click="Logout">Logout</button>
    </nav>
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
      <div class="card">
        <canvas id="chart4"></canvas>
      </div>
    </div>
    <div class="container-details">
      <div class="card card-ticket-table">
        <div class="col-sm-12">
            <gridTicket :tickets="gridData" :columns="gridColumns"></gridTicket> 
        </div>      
      </div>
    </div>
  </main>
</template>

<script>

import Chart from 'chart.js';
import gridTicket from '@/components/grid-ticket.vue';
import tickets from '@/assets/Sample Data.json';
import logo from '@/assets/logo.png';
import * as AppConstants from "../constant";
import router from '@/router';

const data_categories = { 'Software' : 0, 'Hardware' : 0, 'Systems' : 0, 'Access/Login' : 0 }
const data_severity = { '0': 0, '1' : 0, '2' : 0, '3' : 0, '4' : 0 }
const data_priority = { '0' : 0, '1' : 0, '2' : 0, '3' : 0 }
const data_satisfaction = { '0' : 0, '1' : 0, '2' : 0, '3' : 0 }

tickets.forEach(function(ticket) {
   if (data_categories.hasOwnProperty(ticket.FiledAgainst)) {
      data_categories[ticket.FiledAgainst] += 1; 
   }
   let severity = ticket.Severity.substring(0,1);
   if (data_severity.hasOwnProperty(severity)) {
      data_severity[severity] += 1; 
   }
   let satisfaction = ticket["Satisfaction"].substring(0,1);
   if (data_satisfaction.hasOwnProperty(satisfaction)) {
      data_satisfaction[satisfaction] += 1; 
   }
   let priority = ticket.Priority.substring(0,1);
   if (data_priority.hasOwnProperty(priority)) {
      data_priority[priority] += 1; 
   }

});

const arr_count_categories = [];
const arr_count_severity = [];
const arr_count_priority = [];
const arr_count_satisfaction = [];

for (let property in data_categories) {
    if (data_categories.hasOwnProperty(property)) {
        arr_count_categories.push(data_categories[property]);
    }
}

for (let property in data_severity) {
    if (data_severity.hasOwnProperty(property)) {
        arr_count_severity.push(data_severity[property]);
    }
}

for (let property in data_priority) {
    if (data_priority.hasOwnProperty(property)) {
        arr_count_priority.push(data_priority[property]);
    }
}

for (let property in data_satisfaction) {
    if (data_satisfaction.hasOwnProperty(property)) {
        arr_count_satisfaction.push(data_satisfaction[property]);
    }
}

export default {
  data () {
    return {
      searchQuery: '',
      gridColumns: ['ticket', 'Requestor', 'RequestorSeniority', 'ITOwner', 'FiledAgainst', 'TicketType', 'Severity', 'Priority'],
      gridData: tickets,
      chartData1: arr_count_categories,
      chartData2: arr_count_severity,
      chartData3: arr_count_satisfaction,
      chartData4: arr_count_priority,
      logo: logo,
    }
  },
  components: {
    gridTicket
  },
  mounted() {
    this.createChart('chart1', this.getChartdata('chart1'));
    this.createChart('chart2', this.getChartdata('chart2'));
    this.createChart('chart3', this.getChartdata('chart3'));
    this.createChart('chart4', this.getChartdata('chart4'));
  },
  methods: {
    getChartdata(chartId) {
      let type = '';
      let data_counts = [];
      let color = [];
      let labels = [];
      let title = '';
      let isLegendVisible = true;
      switch (chartId) {
        case 'chart1':
          type = 'pie';
          data_counts = this.chartData1;
          color = AppConstants.CHART1_COLOR;
          labels = AppConstants.CHART1_LABELS;
          title = 'Categories';
          break; 
        case 'chart2':
          type = "doughnut";
          data_counts = this.chartData2;
          color = AppConstants.CHART2_COLOR;
          labels = AppConstants.CHART2_LABELS;
          title = 'Severity';
          break;
        case 'chart3':
          type = "horizontalBar";
          data_counts = this.chartData3;
          color = AppConstants.CHART3_COLOR;
          labels = AppConstants.CHART3_LABELS;
          title = 'Priority';
          isLegendVisible = false;
          break;
        case 'chart4':
          type = "pie";
          data_counts = this.chartData4;
          color = AppConstants.CHART4_COLOR;
          labels = AppConstants.CHART4_LABELS;
          title = 'Satisfaction';
          break;
      }
      let data_chart = {
            type: type,
            data: {
                  datasets: [{
                      data: data_counts,
                      backgroundColor: color,
                      borderColor: color,
                      borderWidth:1                   
                  }],
                  labels: labels
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                  display: true,
                  text: title
              },
              legend: {
                  display: isLegendVisible,
              }
            }
      }
      return data_chart;
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
    Logout() {
      router.replace('/');
    }
  }
}
</script>
