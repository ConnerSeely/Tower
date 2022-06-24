import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
    async createEvent(body) {
        const res = await api.post('api/events', body)
        logger.log('created event', res.data)
        AppState.accountEvents.push(res.data)
        AppState.events.push(res.data)
    }

    async getEvents(query = '') {
        const res = await api.get('api/events' + query)
        logger.log('getting events', res.data)
        AppState.events = res.data
    }

    async getEvent(id) {
        const res = await api.get('api/events/' + id)
        logger.log('getting event', res.data)
        AppState.activeEvent = res.data
    }

    async editEvent(body) {
        const res = await api.put('api/events/' + body.id, body)
        logger.log('editing event', res.data)
        AppState.activeEvent = res.data
    }
}

export const eventsService = new EventsService()