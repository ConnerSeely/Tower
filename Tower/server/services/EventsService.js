import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class EventsService {
    async getAll(query = {}) {
        const events = await dbContext.Events.find(query)
        return events
    }

    async getById(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest("invalid Id")
        }
        return event
    }
    async create(eventData) {
        if (new Date(eventData.startDate) < new Date()) {
            throw new BadRequest('Invalid start date')
        }
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }
    async edit(body) {
        const original = await this.getById(body.id)
        if (original.creatorId.toString() != body.creatorId) {
            throw new Forbidden('You cannot edit this event.')
        }
        if (original.isCanceled != false) {
            throw new BadRequest('You cannot edit this event.')
        }
        original.name = body.name || original.name
        original.description = body.description || original.description
        original.coverImg = body.coverImg || original.coverImg
        original.location = body.location || original.location
        original.capacity = body.capacity || original.capacity
        original.type = body.type || original.type

        await original.save()
        return original
    }
    async delete(eventId, userId) {
        const event = await this.getById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("You do not have permissions.")
        }
        event.isCanceled = true
        await event.save()
    }
}

export const eventsService = new EventsService()