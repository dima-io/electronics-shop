<template>

  <nav aria-label="Page pagination">
    <div class="d-flex justify-content-center">
      <div class="me-3">
        <ul class="pagination">
          <li :class="['page-item']">
            <a class="page-link" href="#" @click.prevent="changePageFunc(currentPage - 1)">Previous</a>
          </li>

          <li
              v-for="page in getTotalPages"
              :key="page"
              :class="['page-item', { 'active': currentPage === page }]"
          >
            <a class="page-link" href="#" @click.prevent="changePageFunc(page)">{{ page }}</a>
          </li>

          <li :class="['page-item']">
            <a class="page-link" href="#"  @click.prevent="changePageFunc(currentPage + 1)">Next</a>
          </li>
        </ul>
      </div>
      <div>
        <select class="form-select" aria-label="Default select example" @change="updatePages($event.target.value)">
          <option value="1">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "app-pagination",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["currentPage", "totalPages", "itemsPerPage"]),
    ...mapGetters(["getTotalPages"])
  },
  methods: {
    ...mapActions(["changePage", "changeItemPerPage"]),

    updatePages(number) {
      this.changeItemPerPage(number);
    },
    changePageFunc(num) {
      this.changePage(num);
    }

  },
  mounted() {
    this.changePage(1);
  },
}
</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>
