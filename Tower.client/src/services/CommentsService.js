import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
    async createComment(body) {
        const res = await api.post('api/comments', body)
        logger.log('created comment', res.data)
        AppState.comments.push(res.data)
    }

    async getComments(eventId) {
        const res = await api.get('api/events/' + eventId + '/comments')
        logger.log('getting comments', res.data)
        AppState.comments = res.data
    }
    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        logger.log('deleting comment', res.data)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }
    // async editEvent(body) {
    //     const res = await api.put('api/events/' + body.id, body)
    //     logger.log('editing event', res.data)
    //     AppState.activeEvent = res.data
    // }
}
export const commentsService = new CommentsService()