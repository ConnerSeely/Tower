<template>
  <div
    class="d-flex flex-column event-card elevation-2 rounded p-2 m-1"
    @click="selectEvent"
  >
    <img class="event-img img-fluid" :src="event.coverImg" alt="" />
    <div>
      <h5>{{ event.name }}</h5>
      <h6>{{ event.location }}</h6>
      <h6>{{ formatDate(event.startDate) }}</h6>
      <h5>Capacity: {{ event.capacity }}</h5>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      selectEvent() {
        router.push({ name: 'EventDetails', params: { id: props.event.id } })
      },
      formatDate(rawDate) {
        let time = new Date(rawDate)
        let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let year = time.getUTCFullYear()
        return `${month} ${year}`
      }
    }
  }
}
</script>

<style>
.event-card {
  background-color: maroon;
  color: white;
}
</style>