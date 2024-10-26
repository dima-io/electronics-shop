<template>
  <div class="cards-information mb-lg-5" v-if="cardsData">
    <div class="section-title my-5" v-if="title">{{title}}</div>
    <div class="d-flex flex-wrap justify-content-sm-center justify-content-lg-start gap-lg-3 gap-md-4 gap-sm-1">
      <div v-for="card in cards"  :key="card.id" class="mb-4">
        <div class="card h-100 cards-information-block">
          <div class="card-body d-flex flex-column justify-content-between">
            <img
                @mouseenter="card.hovered = true"
                @mouseleave="card.hovered = false"
                class="card-img-top"
                alt="Card image"
                :src="card.hovered && card.hoverImage ? `/assets/images${card.hoverImage}` : `/assets/images${card.defaultImage}`"
            />
             <div class="cards-information__title">
               <a href="#">{{card.title}}</a>
             </div>
            <div class="card-information__additional-info">
              <div class="mt-3 fw-bolder cards-information__price"><span>{{card.price}} ₴</span>
              </div>
              <div class="d-flex mt-2">
                <div class="btn btn-outline-secondary icon-button cart-button" @click="addOrdering(card)">
                  <i class="bi bi-cart"></i>
                  <span class="cart-text">Купити</span>
                </div>
                <div class="btn btn-outline-secondary icon-button">
                  <i class="bi bi-heart"></i>
                </div>
                <div class="btn btn-outline-secondary icon-button">
                  <i class="bi bi-arrows"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="cards-information-block__cashback">
                  <span class="fw-bold">КЕШБЕК {{card.cashback}} ₴</span>
                </div>
                <div class="cards-information-block__stars">
                  <i v-for="i in Math.floor(card.rate)" :key="i" class="bi bi-star-fill"></i>
                  <i v-for="i in (5 - Math.floor(card.rate))" :key="'empty-' + i" class="bi bi-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "app-cards-information",
  props: {
    cardsData: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      cards: []
    }
  },

  methods: {
    ...mapActions(['addOrderingStuffs']),

    addOrdering(card) {
      this.addOrderingStuffs({ value: card });
    },


    updateCards() {
      if(this.cardsData.length > 0) {
        this.cards = this.cardsData?.map((card) => {
          return {
            id: card.id,
            title: card.name,
            link: card.link,
            price: card.price,
            rate: card.rate,
            cashback: card.cashback,
            defaultImage: card.imageUrl,
            hoverImage: card.imageUrl1,
            hovered: card.hovered
          };
        });
      }
    }

  },

  watch: {
    cardsData: {
      handler() {
        this.updateCards();
      },
      immediate: true,
    }
  },

}
</script>

<style scoped>

.section-title {
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
}
.cards-information__title a {
  color: #000;
  text-decoration: none;
  line-height: 1.25rem;
  white-space: normal;
  transition: all .1s linear;
  hyphens: auto;
  height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cards-information__title a:hover {
  color: #2c80e5;
  text-decoration: underline;
}
.icon-button {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  border-color: #c4c4c4 !important;
  transition: width 0.3s ease;
  overflow: hidden;
  position: relative;
}

.cards-information__price {
  font-size: 1.25rem;
  line-height: 1;
  display: inline-block;
  vertical-align: bottom;
}

.icon-button:first-child:hover {
  width: 250px;
}

.cart-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  transition: width 0.3s ease;
}

.cart-text {
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s ease;
  margin-left: 8px;
  font-size: 12px;
}

.cards-information-block {
  transition: transform .5s;
  width: 13rem;
}
.cards-information-block:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.cards-information-block:hover .cart-button {
  width: 210px;
}

.cards-information-block:hover .cart-button .cart-text {
  opacity: 1;
}

.cards-information-block__cashback{
  color: #2c80e5;
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 5px;
}

.cards-information-block__stars {
  color: #ffb700;
}

@media(max-width: 434px) {
  .cards-information-block {
    width: 9.3rem;
  }
}
@media(min-width: 576px) {
  .cards-information-block {
    width: 15.8rem;
  }
}

@media (min-width: 768px) {
  .cards-information-block[data-v-3c0180e2] {
    width: 20.5rem;
  }
}

@media (min-width: 992px) {
  .cards-information-block[data-v-3c0180e2] {
    width: 18.1rem;
  }
}
</style>
