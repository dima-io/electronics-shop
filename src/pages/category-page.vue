<template>
  <div class="container">
    <app-cards-information v-if="cardsDataFromStore && cardsDataFromStore.length" :cardsData="cardsDataFromStore"></app-cards-information>
    <h3>Directly from axios</h3>
    <app-cards-information v-if="cardsData && cardsData.length" :cardsData="cardsData"></app-cards-information>
    <p v-else>Нічого не знайдено.</p>
    <div class="d-flex flex-column align-items-center gap-4 mb-5">
      <app-pagination></app-pagination>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import AppCardsInformation from "@/components/cards-information";
import AppPagination from "@/components/pagination";

export default {
  name: "category-page",
  components: {
    AppPagination,
    AppCardsInformation
  },
  props: ["prm"],
  data() {
    return {
      cardsData: [],
      cardsDataFromStore: []
    };
  },
  computed: {
    query() {
      return this.$route.query.name;
    },
    selectedItem() {
      return this.$route.query.selectedItem;
    },
    btnSearTerm() {
      return this.$route.query.btnSearTerm;
    },
    smartphones() {
      return this.$store.getters.getSmartphones;
    },
    laptops() {
      return this.$store.getters.getLaptops;
    },
    powerSupplies() {
      return this.$store.getters.getPowerSupplies;
    },
    televisions() {
      return this.$store.getters.getTelevision;
    },
    allCategories() {
      return this.$store.getters.getAllCategories;
    }
  },
  methods: {
    // shuffleArray(array) {
    //   for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    //   }
    //   return array;
    // },

    fetchDataFromStore() {
      const params = {};
      this.query ? params.name = this.query.toLowerCase() : null;
      this.$store
          .dispatch("fetchCategoriesData", { category: null, queryParam: params.name || null })
          .then(() => {
            this.displaySpecificCards();
          });
    },

    displaySpecificCards() {
      switch (this.query) {
        case "smartphones":
          this.cardsDataFromStore = this.smartphones;
          break;
        case "laptops":
          this.cardsDataFromStore = this.laptops;
          break;
        case "power-supplies":
          this.cardsDataFromStore = this.powerSupplies;
          break;
        case "televisions":
          this.cardsDataFromStore = this.televisions;
          break;
        default:
          this.cardsDataFromStore = this.allCategories;
      }
    },

    // async fetchCategoryData(searchSelected = false) {
    //   try {
    //     let response;
    //     const params = {};
    //
    //     if (this.prm === "brands") {
    //       if (this.btnSearTerm) {
    //         response = await axios.get(`/brands`, { params });
    //       } else if (this.query) {
    //         params.name = this.query.toLowerCase();
    //         response = await axios.get(`/brands`, { params });
    //       } else {
    //         response = await axios.get(`/brands`);
    //       }
    //     }
    //
    //     if (response.data.length > 0 && !this.btnSearTerm) {
    //       if (this.prm !== "brands") {
    //         this.cardsData = this.shuffleArray(this.cardsData);
    //       }
    //
    //       if (searchSelected && this.selectedItem) {
    //         this.cardsData = this.cardsData.filter(product => product.id === +this.selectedItem);
    //       }
    //     } else {
    //       if (this.btnSearTerm) {
    //         this.cardsData = response.data;
    //         const allProducts = this.cardsData.flatMap(product => product.products);
    //         this.filteredProducts = allProducts.filter(product =>
    //             product.name.toLowerCase().includes(this.btnSearTerm.toLowerCase())
    //         );
    //         this.cardsData = this.filteredProducts;
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Помилка при завантаженні категорії:", error);
    //   }
    // },
  },

  created() {
    // this.fetchCategoryData(this.selectedItem !== undefined);
    this.fetchDataFromStore();
  },

  watch: {
    query: ["fetchCategoryData", "fetchDataFromStore"], // Додано спостереження
    smartphones(newVal) {
      if (newVal) {
        this.displaySpecificCards();
      }
    },
    laptops(newVal) {
      if (newVal) {
        this.displaySpecificCards();
      }
    },
    powerSupplies(newVal) {
      if (newVal) {
        this.displaySpecificCards();
      }
    },
    televisions(newVal) {
      if (newVal) {
        this.displaySpecificCards();
      }
    }
  }
};
</script>

<style scoped>

</style>
