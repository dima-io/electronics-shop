<template>
  <header class="mt-2">
  </header>
  <div class="main">
    <router-view></router-view>
  </div>
    <app-footer></app-footer>
</template>

<script>


export default {
  name: 'App',


}
</script>

<style>
body.modal-open {
  overflow: hidden;
}
</style>
