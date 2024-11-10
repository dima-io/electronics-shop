<template>
  <app-carousel></app-carousel>
  <div class="home-content">
    <app-four-cards
        :flag="'categories'"
        :cardList="categories"
    >
      <template #default="{ card, flag }">
        <div v-if="flag === 'categories'" class="d-flex">
          <div class="categories-section__icon me-3">
            <i class="bi" :class="card.icon"></i>
          </div>
          <div class="categories-section__text" v-if="card.title" v-html="card.title"></div>
        </div>
      </template>
      <template #getAllCategories>
        <div class="d-flex justify-content-center">
          <button
              type="button"
              class="btn btn-lg btn btn-outline-primary all-categories"
              @click="getAllCategories()"
          >
            Усі категорії
          </button>
        </div>
      </template>
    </app-four-cards>

    <app-four-cards
        :flag="'brands'"
        :cardList="brands"
        :title="'Обирай найкраще'"
    >
      <template #default="{ card, flag }">
        <div v-if="flag === 'brands'" class="d-flex justify-content-center brands__image-wrapper">
          <img class="brands__image" :src="card.imgUrl" alt="">
        </div>
      </template>
    </app-four-cards>



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
import AppCardsInformation from  "@/components/cards-information"
import AppFourCards from "@/components/four-cards";


export default {
  name: "home-page",
  components: {AppFourCards, AppCarousel, AppCardsInformation},
  methods: {
    getAllCategories() {
      this.$router.push({ name: 'Electronic', params: { prm: "categories"} })
    }
  },
  data() {
    return {
      brands: [
        {imgUrl: require('../../public/assets/images/xiaomiBrand.svg'), tech: 'xiaomi', param: 'brands'},
        {imgUrl: require('../../public/assets/images/samsungBrand.svg'), tech: 'samsung', param: 'brands'},
        {imgUrl: require('../../public/assets/images/dyson-logo.svg'), tech: 'dyson', param: 'brands'},
        {imgUrl: require('../../public/assets/images/baseus-logo.svg'), tech: 'baseus', param: 'brands'},
      ],

      categories: [
        {title: 'Смартфони, <br> телефони', param: 'categories', tech: 'smartphones', icon: 'bi-phone'},
        {title: 'Телевізор', param: 'categories', tech: 'televisions', icon: 'bi-tv'},
        {title: 'Ноутбуки', param: 'categories', tech: 'laptops', icon: 'bi-laptop'},
        {title: 'Електроживлення', param: 'categories', tech: 'power-supplies', icon: 'bi-battery-charging'},
      ]
    }
  },


  computed: {
    laptops() {
      return this.$store.getters.getLaptops?.slice(0,6);
    },
    powerSupplies() {
      return this.$store.getters.getPowerSupplies?.slice(0,6);
    },
    smartphones() {
      return this.$store.getters.getSmartphones?.slice(0,6);
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

.brands__image {
  width: 100%;
  max-height: 100%;
}

.brands__image-wrapper {
  max-height: 50px;
}

.categories-section__text {
  font-size: 16px;
  align-content: center;
}

.categories-section__icon i {
  font-size: 40px;
}
</style>
