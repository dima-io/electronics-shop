<template>
  <div class="container mt-sm-3 mt-lg-0 mb-lg-3 search">
    <div class="row">
      <div class="col-lg-12">
        <div class="input-group">
          <input class="form-control form-control-lg"
                 type="text" placeholder="Пошук серед більше ніж 300 000 товарів"
                 aria-label="Search example"
                 v-model="searchTerm"
                 @input="filterProducts"
                 @keyup.enter="buttonSearch"
          >
          <button class="btn btn-primary" type="button" @click="buttonSearch"><i class="bi bi-search"></i></button>
        </div>
        <div class="list-group search-container p-2" v-if="filteredProducts.length > 0">
          <router-link
              :to="{ name: 'Electronic', params: { prm: 'categories' }, query: { name: product.brand, selectedItem: product.id }}"
              class="list-group-item list-group-item-action search__link"
              v-for="product in filteredProducts"
              :key="product.id"
              aria-current="true"
              @click="closeSearch(product)">
               {{ product.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-search",

  data() {
    return {
      products: [],
      filteredProducts: [],
      searchTerm: '',
      btnSearTerm: ''
    };
  },

  computed: {
    allCategories() {
      return this.$store.getters.getAllCategories;
    }
  },

  methods: {
    fetchProducts() {
      if (this.allCategories && this.allCategories.length) {
        this.products = this.allCategories.map(category => ({
          ...category,
          categoryName: category.name
        }));

      } else {
        console.warn("allCategories is empty or undefined");
      }
    },

    filterProducts() {
      if (this.searchTerm) {
        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredProducts = [];
      }
    },

    buttonSearch() {
      this.btnSearTerm = this.searchTerm;

      this.$router.push({
        name: 'Electronic',
        params: { prm: 'brands' },
        query: { btnSearTerm: this.btnSearTerm }
      });
      this.closeSearch();
    },

    closeSearch() {
      this.searchTerm = '';
      this.filteredProducts = [];
    }
  },

  async created() {
    try {
      await this.$store.dispatch('fetchCategoriesData', '');
      this.fetchProducts();
    } catch (error) {
      console.error("Помилка при завантаженні категорій:", error);
    }
  },

  watch: {
    allCategories: {
      handler() {
        this.fetchProducts();
      },
      immediate: true,
    }
  }
};
</script>

<style scoped>
.search__link {
  border: 0;
}

.search-container {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.list-group-item.active {
  z-index: 2;
  color: black;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background-color: inherit;
  border-color: inherit;
}

.list-group-item-action:hover {
  z-index: 1;
  color: var(--bs-list-group-action-hover-color);
  text-decoration: none;
  background-color: var(--bs-list-group-action-hover-bg);
}

</style>
