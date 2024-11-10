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
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import { scrollToTop } from "@/common-methonds"

export default {
  name: "app-pagination",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["currentPage", "totalPages", "size", "numberOfElements"]),
    ...mapGetters(["getTotalPages"]),
    ...mapMutations(["setNumberOfElements"])
  },
  methods: {
    ...mapActions(["changePage", "changeSize", "clearState"]),

    updatePages(number) {
      this.changeSize(number);
      this.changePage(1);
      scrollToTop();
    },
    changePageFunc(num) {
      this.changePage(num);
      scrollToTop();
    },

  },
  mounted() {
    this.changePage(1);
  },
  unmounted() {
    this.clearState()
  }
}
</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>
