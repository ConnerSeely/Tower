<template>
  <div :title="ticket.account.name" class="rounded-pill accountInfo">
    <img class="img-fluid acc-img" :src="ticket.account.picture" alt="" />
  </div>
</template>

<script>
export default {
  props: { ticket: { type: Object, required: true } },
}
</script>

<style>
.hide {
  display: none;
}
.accountInfo:hover + .hide {
  display: block;
}

.acc-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
</style>