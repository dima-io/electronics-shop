<template>
  <div class="container">
    <pre>{{ getDeviceById }}</pre>
    <pre>{{ cardsDataFromStore }}</pre>
    <app-cards-information v-if="!selectedBrandsBySearchBtn && cardsDataFromStore && cardsDataFromStore.length" :cardsData="cardsDataFromStore"></app-cards-information>
    <app-cards-information v-if="selectedBrandsBySearchBtn && selectedBrandsBySearchBtn.length" :cardsData="selectedBrandsBySearchBtn"></app-cards-information>
    <div class="d-flex flex-column align-items-center gap-4 mb-5">
      <app-pagination></app-pagination>
    </div>
  </div>
</template>

<script>
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
    },
    selectedBrandsBySearchBtn() {
      return this.$store.getters.getSelectedBrandsBySearchBtn;
    },
    getDeviceById() {
      return this.$store.getters.getDeviceById({ brand: this.query, id: this.selectedItem });
    }
  },
  methods: {
    fetchCategoriesFromStore() {
      if (this.btnSearTerm) {
        return;
      }
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
        case "btnSearTerm":
          this.cardsDataFromStore = this.selectedBrandsBySearchBtn;
          break;
        default:
          if (this.btnSearTerm) {
            this.cardsDataFromStore = this.selectedBrandsBySearchBtn;
          } else if (this.selectedItem) {
            this.cardsDataFromStore = this.getDeviceById; // Оновлено
          } else {
            this.cardsDataFromStore = this.allCategories;
          }
      }
    },
  },
  watch: {
    query: ["fetchCategoriesFromStore"],
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
    },
    btnSearTerm: {
      handler(newVal) {
        if (newVal && newVal.trim()) {
          this.$store.dispatch("findBrandsByBtnSearTerm", { searchedData: newVal });
        }
      },
      immediate: true,
    },
    selectedItem: {
      handler(newVal) {
        if (newVal && newVal.trim()) {
          this.cardsDataFromStore = this.getDeviceById; // Оновлено
        }
      },
      immediate: true,
    },
    getDeviceById: {
      handler(newVal) {
        if (newVal && newVal.length) { // Додана перевірка на наявність елементів
          this.cardsDataFromStore = newVal; // Оновлено
        }
      },
      immediate: true,
    }
  },
  created() {
    this.fetchCategoriesFromStore();
    // Додано для ініціалізації даних при створенні компонента
    if (this.selectedItem) {
      this.cardsDataFromStore = this.getDeviceById; // Додано
    }
  },
};
</script>

<style scoped>

</style>
