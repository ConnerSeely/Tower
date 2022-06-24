import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
    async createTicket(body) {
        const res = await api.post('api/tickets', body)
        logger.log('created ticket', res.data)
        AppState.accountTickets.push(res.data)
        AppState.tickets.push(res.data)
        AppState.activeEvent.capacity--
    }

    async getTickets(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('getting tickets', res.data)
        AppState.tickets = res.data
    }

    // async getTicket(id) {
    //     const res = await api.get('api/tickets/' + id)
    //     logger.log('getting ticket', res.data)
    //     AppState.activeEvent = res.data
    // }

    // async editTicket(body) {
    //     const res = await api.put('api/tickets/' + body.id, body)
    //     logger.log('editing ticket', res.data)
    //     AppState.activeEvent = res.data
    // }
}

export const ticketsService = new TicketsService()