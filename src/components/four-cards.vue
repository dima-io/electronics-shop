<template>
  <div class="container categories-section mt-3">
          <h2 v-if="title" class="my-5 text-center brands__title">{{title}}</h2>
    <div class="d-flex flex-wrap justify-content-sm-center justify-content-lg-between">
      <div class="card mb-3 mx-lg-0 mx-md-3" v-for="(card, index) in cardList" :key="index">
        <router-link class="card-link" :to="{ name: 'Electronic', params: { prm: card.param}, query: {name: card.tech}}">
          <div class="card-body">
            <slot :card="card" :flag="flag"></slot>
            </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-four-cards",
  props: ['flag', 'cardList', 'title'],

  mounted() {
    console.log('data in four-cards component', this.cardList)
  }
}
</script>

<style scoped>
.card {
  transition: all 0.5s;
  width: 18rem;
}

@media (max-width: 768px) {
  .card {
    min-width: 100%
  }
}

.categories-section .card > a {
  text-decoration: none;
  color: black;
  text-transform: uppercase;
}

.categories-section .card:hover {
  transform: scale(1.1);
}

.brands__title {
  color: #333;
  font-size: 2.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .05rem;
  line-height: 3.2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

</style>

