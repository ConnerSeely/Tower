<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-10 p-0">
        <router-view />
      </div>
      <div class="col-2 p-0">
        <Sidebar />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
