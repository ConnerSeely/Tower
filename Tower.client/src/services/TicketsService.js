import { applyStyles } from "@popperjs/core"
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

    async getAccountTickets() {
        const res = await api.get('account/tickets')
        logger.log('getting tickets for account', res.data)
        AppState.accountTickets = res.data
    }
    async deleteTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log('deleting ticket', res.data)
        AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
        AppState.accountTickets = AppState.accountTickets.filter(t => t.id != ticketId)
    }
}

export const ticketsService = new TicketsService()