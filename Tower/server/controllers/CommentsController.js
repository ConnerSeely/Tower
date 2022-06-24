import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";



export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/', this.create)
            .delete('/:id', this.delete)

    }
    async getById(req, res, next) {
        try {
            const comment = await commentsService.getById(req.params.id)
            return res.send(comment)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        req.body.creatorId = req.userInfo.id
        try {
            const comment = await commentsService.create(req.body)
            return res.send(comment)
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await commentsService.delete(req.params.id, req.userInfo.id)
            return res.send({ message: 'Deleted Comment' })
        } catch (error) {
            next(error);
        }
    }
}