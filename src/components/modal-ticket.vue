<script>
  export default {
    name: 'modal',
    props: {
      ticket: Object
    },
    methods: {
      close() {
        this.$emit('close');
      },
    }
  };
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop modal-backdrop-ticket">
      <div class="modal modal-ticket" role="dialog"  aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h5>Ticket details</h5>
            <button type="button" class="btn-close"  @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <table class="table table-sm">
            <tbody>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Ticket No</th>
                <td>{{ ticket.ticket }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Requestor Id</th>
                <td>{{ ticket.Requestor }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Requestor Seniority</th>
                <td>{{ ticket.RequestorSeniority }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">IT Owner</th>
                <td>{{ ticket.ITOwner }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Filed Against</th>
                <td>{{ ticket.FiledAgainst }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Ticket Type</th>
                <td>{{ ticket.TicketType }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Severity</th>
                <td>{{ ticket.Severity }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Priority</th>
                <td>{{ ticket.Priority }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">No. of days</th>
                <td>{{ ticket.daysOpen }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Satisfaction rating</th>
                <td>{{ ticket.Satisfaction }}</td>
              </tr>
              <tr>
                <th class="text-left px-2 font-weight-bold" scope="row">Ticket Creation Date</th>
                <td>{{ ticket["Ticket Creation Date"] }}</td>
              </tr>
            </tbody>
          </table>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">            
            <button
              type="button" class="btn-green" @click="close" aria-label="Close modal" >Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style>
    @import '../assets/css/modal.css';
</style>