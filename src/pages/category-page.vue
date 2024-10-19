<template>
  <div class="container">
    <app-cards-information v-if="cardsData && cardsData.length" :cardsData="cardsData"></app-cards-information>
    <p v-else>Нічого не знайдено.</p>
    <div class="d-flex flex-column align-items-center gap-4 mb-5">
      <app-pagination></app-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppCardsInformation from  "@/components/cards-information"
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
  },
  methods: {
    async fetchCategoryData(searchSelected = false) {
      try {
        let response;
        const params = {};

        if (this.prm === 'brands') {
          if (this.btnSearTerm) {
            response = await axios.get(`/brands`, { params });
          } else if (this.query) {
            params.name = this.query.toLowerCase();
            response = await axios.get(`/brands`, { params });
          } else {
            response = await axios.get(`/brands`);
          }
        } else {
          if (this.query) {
            params.name = this.query.toLowerCase();
            response = await axios.get(`/categories`, { params });
          } else {
            response = await axios.get(`/categories`);
          }
        }

        if (response.data.length > 0 && !this.btnSearTerm) {
          response.data.forEach((category) => {
            this.cardsData.push(...category.products);
          });

          if(this.prm !== 'brands') {
            this.cardsData = this.shuffleArray(this.cardsData);
          }

          if (searchSelected && this.selectedItem) {
            this.cardsData = this.cardsData.filter(product => product.id === +this.selectedItem);
          }

        } else {
          if (this.btnSearTerm) {
            this.cardsData = response.data;

            const allProducts = this.cardsData.flatMap(product => product.products);
            this.filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(this.btnSearTerm.toLowerCase())
            );

            this.cardsData = this.filteredProducts
          }

        }
      } catch (error) {
        console.error("Помилка при завантаженні категорії:", error);
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  },
  created() {
    this.fetchCategoryData(this.selectedItem !== undefined);
  },
  watch: {
    query: 'fetchCategoryData',
    selectedItem(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchCategoryData(true);
      }
    },
    btnSearTerm: 'fetchCategoryData',
  }
};
</script>

<style scoped>

</style>
