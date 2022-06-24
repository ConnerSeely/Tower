import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/', this.create)
            .delete('/:id', this.delete)
    }
    async getById(req, res, next) {
        try {
            const ticket = await ticketsService.getById(req.params.id)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.create(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            await ticketsService.delete(req.params.id, req.userInfo.id)
            return res.send({ message: '-Ticket thrown in the furnace-' })
        } catch (error) {
            next(error);
        }
    }

}