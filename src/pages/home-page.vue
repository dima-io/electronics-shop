<template>
  <app-carousel></app-carousel>
  <div class="home-content">
    <app-categories></app-categories>
    <app-brands></app-brands>


    <app-cards-information
        class="container"
        v-if="powerSupplies && powerSupplies.length"
        :cards-data="powerSupplies"
        title="Підживи свої гаджети"
    ></app-cards-information>

    <app-cards-information
        class="container"
        v-if="smartphones && smartphones.length"
        :cards-data="smartphones"
        title="Техніка, що завжди під рукою"
    ></app-cards-information>

<app-cards-information
    class="container"
    v-if="laptops && laptops.length"
    :cards-data="laptops"
    title="Весь світ в твоїх руках"
>
</app-cards-information>
  </div>
</template>

<script>
import AppCarousel from "@/components/carousel";
import AppBrands from "@/components/app-brands";
import AppCardsInformation from  "@/components/cards-information"
import AppCategories from "@/components/app-categories";


export default {
  name: "home-page",
  components: {AppBrands, AppCarousel, AppCardsInformation, AppCategories},

  computed: {
    laptops() {
      return this.$store.getters.getLaptops.slice(0,6);
    },
    powerSupplies() {
      return this.$store.getters.getPowerSupplies.slice(0,6);
    },
    smartphones() {
      return this.$store.getters.getSmartphones.slice(0,6);
    }
  },

  created() {
    this.$store.dispatch('fetchCategoriesData', { category: 'laptops', queryParam: 'laptops' });
    this.$store.dispatch('fetchCategoriesData', { category: 'power-supplies', queryParam: 'power-supplies' });
    this.$store.dispatch('fetchCategoriesData', { category: 'smartphones', queryParam: 'smartphones' });
  }
}
</script>

<style scoped>

@media (max-width: 768px) {
    .home-content {
      top: 0;
      margin-top: 50px;
    }
  }
</style>
