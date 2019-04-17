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
    <div class="modal-backdrop">
      <div class="modal modal-ticket" role="dialog"  aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h5>Ticket Details</h5>
            <button type="button" class="btn-close"  @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <table class="table table-bordered table-sm">
            <tbody>
              <tr>
                <th scope="row">Ticket No</th>
                <td>{{ ticket.ticket }}</td>
              </tr>
              <tr>
                <th scope="row">Requestor Id</th>
                <td>{{ ticket.Requestor }}</td>
              </tr>
              <tr>
                <th scope="row">Requestor Seniority</th>
                <td>{{ ticket.RequestorSeniority }}</td>
              </tr>
              <tr>
                <th scope="row">IT Owner</th>
                <td>{{ ticket.ITOwner }}</td>
              </tr>
              <tr>
                <th scope="row">Filed Against</th>
                <td>{{ ticket.FiledAgainst }}</td>
              </tr>
              <tr>
                <th scope="row">Ticket Type</th>
                <td>{{ ticket.TicketType }}</td>
              </tr>
              <tr>
                <th scope="row">Severity</th>
                <td>{{ ticket.Severity }}</td>
              </tr>
              <tr>
                <th scope="row">Priority</th>
                <td>{{ ticket.Priority }}</td>
              </tr>
              <tr>
                <th scope="row">daysOpen</th>
                <td>{{ ticket.daysOpen }}</td>
              </tr>
              <tr>
                <th scope="row">Satisfaction</th>
                <td>{{ ticket.Satisfaction }}</td>
              </tr>
              <tr>
                <th scope="row">Ticket Creation Date</th>
                <td>{{ ticket['Ticket Creation Date'] }}</td>
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
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 5px 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-header h5 {
      margin-top: 0.5rem;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    /*padding: 20px;*/
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    padding: 5px;
  }
</style>