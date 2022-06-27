<template>
  <div class="">
    <h3>Event: {{ ticket.event.name }}</h3>
    <button
      type="button"
      v-if="ticket.account.id == account.id"
      @click="deleteTicket"
      class="btn btn-outline-danger bg-light"
    >
      Delete
    </button>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteTicket() {
        try {
          if (await Pop.confirm()) {
            await ticketsService.deleteTicket(props.ticket.id)
            Pop.toast('Ticket Deleted', 'success')
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style>
.hide {
  display: none;
}
.accountInfo:hover + .hide {
  display: block;
}

.acc-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
</style>