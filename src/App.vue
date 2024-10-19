<template>
  <header class="mt-2">
    <top-nav-menu></top-nav-menu>
    <top-search></top-search>
    <app-breadcrums></app-breadcrums>
  </header>
  <div class="main">
    <router-view></router-view>
  </div>
    <app-footer></app-footer>
</template>

<script>


import TopNavMenu from "@/components/top-nav-menu";
import TopSearch from "@/components/top-search";
import AppFooter from "@/components/app-footer";
import AppBreadcrums from "@/components/breadcrums";

export default {
  name: 'App',
  components: {AppBreadcrums, AppFooter, TopSearch, TopNavMenu},

  data() {
    return {

    }
  },

  methods: {

  },

}
</script>

<style>
body.modal-open {
  overflow: hidden;
}
</style>
