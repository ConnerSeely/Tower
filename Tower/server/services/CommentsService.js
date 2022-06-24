import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class CommentsService {
    async getByEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }
    async getById(id) {
        const comment = await dbContext.Comments.findById(id).populate('creator', 'name picture')
        if (!comment) {
            throw new BadRequest("invalid Id")
        }
        return comment
    }
    async create(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment

    }
    async delete(eventId, userId) {
        const comment = await this.getById(eventId)
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden("You do not have permissions.")
        }
        await comment.remove()
    }

}

export const commentsService = new CommentsService()