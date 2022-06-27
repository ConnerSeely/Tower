<template>
  <div class="container-fluid container-header text-light vh-100">
    <div class="row">
      <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
    <div class="row">
      <h1>Tickets</h1>
      <div
        v-for="t in tickets"
        :key="t.id"
        class="col-8 d-flex ticket m-2 rounded elevation-2"
      >
        <Ticket :ticket="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await ticketsService.getAccountTickets()
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.events),
      tickets: computed(() => AppState.accountTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.container-header {
  background-color: #26060a;
}
.ticket {
  background-color: maroon;
}
</style>
