<template>
 <div class="container my-5">
   <div class="d-flex justify-content-between">
     <h1>Ordering page</h1>
     <div>
       <a>Clear an ordering</a>
     </div>
   </div>
 </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ordering-page",
  components: {},
  computed: {
    ...mapState({
      orderingData: (state) => state.orderingData,
    }),
  },

  data() {
    return {}
  },

  mounted() {
    this.$store.commit('loadOrderingData');
  }
}
</script>

<style scoped>

</style>
