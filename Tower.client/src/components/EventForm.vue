<template>
  <form id="event-form">
    <label>Event Name</label>
    <input
      v-model="editable.name"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Cover Image</label>
    <input
      v-model="editable.coverImg"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label for="events">Type:</label>
    <select v-model="editable.type" name="events" id="events">
      <option value="convention">Convention</option>
      <option value="sport">Sport</option>
      <option value="digital">Digital</option>
      <option value="concert">Concert</option></select
    ><br />

    <label>Location</label>
    <input
      v-model="editable.location"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Start Date</label>
    <input
      v-model="editable.startDate"
      type="date"
      aria-describedby="helpId"
      required
    />
    <label>Capacity</label>
    <input
      v-model="editable.capacity"
      type="number"
      aria-describedby="helpId"
      required
    />
    <label>Description</label>
    <textarea v-model="editable.description" required />
    <button type="button" data-bs-dismiss="modal">cancel</button>
    <button v-if="!event" type="button" @click="createEvent">Create!</button>
    <button v-else type="button" @click="editEvent">Save!</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { watchEffect } from '@vue/runtime-core'
import { eventsService } from '../services/EventsService'
import { useRouter } from 'vue-router'
import EventDetailsPageVue from '../pages/EventDetailsPage.vue'
export default {
  props: { event: { type: Object, required: false } },
  setup(props) {
    const editable = ref({})
    const router = useRouter()
    watchEffect(() => {
      editable.value = { ...props.event }
    })
    return {
      props,
      editable,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          Pop.toast('Event Created!')
          router.push({ name: 'EventDetails', params: { id: event.id } })
          Modal.getOrCreateInstance(document.getElementById('create-event')).hide()
        } catch (error) {
          Pop.error(error)
        }
      },
      async editEvent() {
        try {
          await eventsService.editEvent(editable.value)
          Pop.toast('Event updated!')
          Modal.getOrCreateInstance(document.getElementById('edit-event')).hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_eventForm.scss";
</style>