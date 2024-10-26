<template>
  <div class="container">
    <app-cards-information v-if="cardsDataFromStore && cardsDataFromStore && cardsDataFromStore.length" :cardsData="cardsDataFromStore"></app-cards-information>
    <app-pagination></app-pagination>
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
      cardsDataFromStore: [],
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
    },

    samsung() {
      return this.$store.getters.getSamsung;
    },
    xiaomi() {
      return this.$store.getters.getXiaomi;
    },
    dyson() {
      return this.$store.getters.getDyson;
    },
    baseus() {
      return this.$store.getters.getBaseus;
    },
  },
  methods: {
    fetchBrandsFromStore() {
      const params = {};
      this.query ? params.name = this.query.toLowerCase() : null;
      this.$store
          .dispatch("fetchAllBrandsData", { query: params.name})
          .then(() => {
            this.displaySpecificCards();
          })

    },
    fetchCategoriesFromStore() {
      if (this.btnSearTerm) {
        return;
      }
      const params = {};
      this.query ? params.name = this.query.toLowerCase() : null;
      this.$store
          .dispatch("fetchCategoriesData", { category: null, queryParam: (this.selectedItem ? null  : params.name) || null })
          .then(() => {
            this.displaySpecificCards();
          });
    },
    displaySpecificCards() {
      switch (this.query) {
        case "xiaomi":
          this.cardsDataFromStore = this.xiaomi;
          break;
        case "samsung":
          this.cardsDataFromStore = this.samsung;
          break;
        case "dyson":
          this.cardsDataFromStore = this.dyson;
          break;
        case "baseus":
          this.cardsDataFromStore = this.baseus;
          break;
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
            this.cardsDataFromStore = this.getDeviceById;
          } else {
            this.cardsDataFromStore = this.allCategories;
          }
      }
    },
  },
  watch: {
    query: {
      handler() {
        if(this.prm !== 'brands') {
          this.fetchCategoriesFromStore();
        }

      },
      immediate: true,
    },
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

          this.cardsDataFromStore = this.selectedBrandsBySearchBtn
        }
      },
      immediate: true,
    },
    selectedItem: {
      handler(newVal) {
        if (newVal && newVal.trim()) {
          this.cardsDataFromStore = this.getDeviceById;
        }
      },
      immediate: true,
    },
    getDeviceById: {
      handler(newVal) {
        if (newVal && newVal.length) {
          this.cardsDataFromStore = newVal;
        }
      },
      immediate: true,
    },

  },
  created() {
    this.prm === 'brands' ? this.fetchBrandsFromStore() : this.fetchCategoriesFromStore();

    if (this.selectedItem) {
      this.cardsDataFromStore = this.getDeviceById;
    }
  },
};
</script>

<style scoped>

</style>
