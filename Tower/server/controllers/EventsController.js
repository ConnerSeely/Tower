import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";
import { ticketsService } from "../services/TicketsService";



export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/comments', this.getCommentsByEvent)
            .get('/:id/tickets', this.getByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }
    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll(req.query)
            res.send(events)
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const event = await eventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error);
        }
    }
    async getByEventId(req, res, next) {
        try {
            const tickets = await ticketsService.getByEventId(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async getCommentsByEvent(req, res, next) {
        try {
            const comments = await commentsService.getByEventId(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        req.body.creatorId = req.userInfo.id
        try {
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error);
        }
    }
    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.edit(req.body)
            return res.send(event)
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await eventsService.delete(req.params.id, req.userInfo.id)
            return res.send({ message: 'Deleted Event' })
        } catch (error) {
            next(error);
        }
    }
}