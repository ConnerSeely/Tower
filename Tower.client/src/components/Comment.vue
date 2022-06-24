<template>
  <div class="d-flex">
    <div class="col-2">
      <img
        class="comment-img img-fluid rounded-pill"
        :src="comment.creator.picture"
        alt=""
      />
      <h6 class="text-light">{{ comment.creator.name }}</h6>
    </div>
    <div class="col-10">
      <p class="comment-body text-light">{{ comment.body }}</p>
      <i
        class="mdi mdi-delete"
        v-if="comment.creatorId == account.id"
        @click="deleteComment"
      ></i>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(props.comment.id)
            Pop.toast('Comment Deleted', 'success')
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style>
.comment-img {
  height: 75px;
  width: 75px;
}
.comment-body {
  background-color: #26060a;
}
.mdi-delete {
  background-color: white;
  color: black;
}
</style>