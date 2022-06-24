import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService";


class TicketsService {
    async getById(ticketId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('account', 'name picture').populate('event');
        if (!ticket) {
            throw new BadRequest('Improper ID')
        }
        return ticket
    }
    async getByAccountId(accountId) {
        const tickets = dbContext.Tickets.find({ accountId: accountId })
        tickets.populate('account', 'name picture');
        tickets.populate('event');
        if (!tickets) {
            throw new BadRequest('Improper ID')
        }
        return tickets
    }
    getByEventId(eventId) {
        const tickets = dbContext.Tickets.find({ eventId: eventId })
        tickets.populate('account', 'name picture');
        tickets.populate('event');
        if (!tickets) {
            throw new BadRequest('Improper ID')
        }
        return tickets
    }
    async create(body) {
        const event = await eventsService.getById(body.eventId)
        if (event.capacity == 0) {
            throw new BadRequest('Sold Out')
        }
        event.capacity -= 1
        await event.save()
        const ticket = await dbContext.Tickets.create(body)
        await ticket.populate('account', 'name picture');
        await ticket.populate('event');
        return ticket
    }
    async delete(ticketId, userId) {
        const ticket = await this.getById(ticketId)
        if (ticket.accountId.toString() != userId) {
            throw new BadRequest("Ain't your ticket bro")
        }
        const event = await eventsService.getById(ticket.eventId)
        event.capacity += 1
        await event.save()
        await ticket.remove()
    }

}

export const ticketsService = new TicketsService