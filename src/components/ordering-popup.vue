<template>
  <teleport to="#app">
  <div class="modal-form" v-if="show">
    <div class="modal-content-form">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-end">
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal()"></button>
        </div>
        <div class="modal-body">
          <div class="divider" v-for="orderingItem in orderingData" v-bind:key="orderingItem.id">
            <div class="d-flex py-4 justify-content-lg-between">
              <div class="d-flex">
                <img :src="`/assets/images${orderingItem.defaultImage}`" width="100" height="100" class="modal-img-form">
                <h5 class="modal-title d-block mr-5">{{orderingItem.title}}</h5>
              </div>
              <div class="d-flex quantity ms-5">
                <div class="quantity__button quantity__button_minus">-</div>
                <input type="text" class="quantity__input" value="1" name="quantity">
                <div class="quantity__button quantity__button_plus">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </teleport>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ordering-popup",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      orderingData: (state) => state.orderingData,
    }),
  },
  methods: {
      closeModal() {
        this.$emit('close');
        document.body.classList.remove('modal-open');
      }
  },
  mounted() {
    this.$store.commit('loadOrderingData');
  }
}
</script>

<style scoped>
.divider:not(:last-child) {
  border-bottom: 1px solid darkgrey;
}
.modal-form {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
  z-index: 3;
}

.modal-body {
  max-height: 60vh;
  overflow-y: auto;
  padding: 10px;
}

.quantity__input {
  width: 100%;
  text-align: center;
  font-size: .875rem;
  padding: 0 4px;
}

.modal-content-form {
  position: absolute;
  background-color: white;
  padding: 20px;
  min-width: 77%;
  top: 40.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  overflow-y: auto;
}

.modal-img-form {
  margin-right: 20px;
}

.quantity {
  -webkit-flex-basis: 85px;
  flex-basis: 85px;
  align-self: start;
  justify-content: space-around;
  background: #ebf3fc;
  border-radius: 15px;
}

.quantity__button_minus {
  padding: 4px 5px 5px 15px;
  text-align: right;
}

.quantity__button {
  line-height: 1;
  display: block;
  cursor: pointer;
  color: #2c80e5;
}

.quantity__input {
  background: transparent;
  border: none;
}
.quantity__button_plus {
  padding: 4px 15px 5px 5px;
  text-align: left;
}

input, button, select, optgroup, textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
</style>
