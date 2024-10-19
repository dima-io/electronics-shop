<template>
    <div class="container desktop">
      <div class="row">
        <div class="col-lg-2 col-sm-2">
        <span class="topnav__logo">
          <router-link to="/">XXX</router-link>
        </span>
        </div>
        <div class="col-lg-5 col-sm-10 align-content-center">
          <div class="d-flex">
            <div class="me-4">
              <div class="topnav__contact-item fw-bold">098 214 66 57</div>
              <div class="topnav__contact-worktime">З 9:00 до 21:00</div>
            </div>

            <div class="topnav__social-icons align-content-center">
                <a href=""> <i class="bi bi-instagram me-2 social-icon"></i></a>
                <a href=""> <i class="bi bi-whatsapp me-2 social-icon"></i></a>
                <a href=""><i class="bi bi-facebook me-2 social-icon"></i></a>
                <a href=""> <i class="bi bi-youtube me-2 social-icon"></i></a>
            </div>
          </div>
        </div>
        <div class="col-lg-5 align-items-center d-flex justify-content-end">
          <div class="topnav__social-icons">



            <i><span class="text-danger">{{ orderingDataLength }}</span></i>
            <i class="order-icon bi bi-cart me-2" @click="openPopup()">
            </i>
            <a href="#" class="topnav__user"><i class="bi bi-person me-1"></i>Dmytro</a>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE VIEW -->

    <div class="mobile-view container mt-sm-3 d-flex mobile justify-content-between mobile">
      <div class="topnav__logo align-items-center mobile">
        <a href="#" v-show="!menuOpen">mta</a>
      </div>
      <div>
        <i v-if="!menuOpen" @click="menuOpen = !menuOpen" class="bi bi-list icon mobile"></i>
        <i v-if="menuOpen" @click="menuOpen = !menuOpen" class="bi bi-x icon mobile"></i>
      </div>
    </div>

    <div :class="['mobile-view menu mobile', { open: menuOpen }]">
      <nav class="nav flex-column h-100">
        <a class="nav-link fw-light" aria-current="page" href="#"><i class="bi bi-person me-3"></i>Dmytro</a>
        <a class="nav-link fw-light" href="#"><i class="bi bi-heart me-3"></i>Обране</a>
        <a class="nav-link fw-light" href="#"><i class="bi bi-percent me-3"></i>Акції</a>
        <a class="nav-link fw-light"><i class="bi bi-headset me-3"></i>Технічна підтримка</a>
      </nav>
      <div class="ms-3 mt-3">
        <button type="button" class="city-button"><i class="bi bi-geo-alt ms-1"></i>Kyiv</button>
      </div>
    </div>


  <!-- Popup menu -->

  <OrderingPopup @close="isModalVisible = false" :show="isModalVisible"></OrderingPopup>

</template>

<script>
import {mapGetters} from "vuex";
import OrderingPopup from "@/components/ordering-popup";

export default {
  name: "top-nav-menu",
  components: {OrderingPopup},
  computed: {
    ...mapGetters(['orderingDataLength'])
  },
  methods: {
    openPopup() {
      this.isModalVisible = true;
      document.body.classList.add('modal-open');
    },
  },

  data() {
    return {
      visible: false,
      menuOpen: false,
      isModalVisible: false
    }
  }
}
</script>

<style scoped>
 .mobile-view.menu {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    visibility: hidden;
  }

  .mobile-view.menu.open {
    opacity: 1;
    z-index: 1050;
    visibility: visible;
  }

  .mobile .nav-link {
    font-size: 26px;
  }

  .mobile .topnav__logo {
    line-height: 1;
  }

  .topnav__logo {
    font-weight: 600;
    font-size: 48px;
    text-decoration: none;
  }

  .topnav__logo > a {
    text-decoration: none;
    color: #053672;
  }

  .topnav__contact-item {
    font-size: 19px;
  }

  .topnav__contact-worktime {
    font-size: 0.75rem;
    font-weight: 400;
  }

  .topnav__social-icons i{
    font-size: 21px;
    color: #000;
  }

  .topnav__user {
    font-size: 21px;
    text-decoration: none;
    color: #000;
  }

  .city-button {
    border-radius: 50px;
    background: 0 0;
    color: #333;
    border: 2px solid #333;
    padding-top: 6px;
    padding-bottom: 6px;
    max-width: 180px;
    width: auto;
  }

  .icon {
    font-size: 36px;
    z-index: 9999;
  }

.order-icon {
  cursor: pointer;
}

  @media (max-width: 992px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }

  @media(min-width: 992px) {
    .desktop {
      display: block;

    }
    .mobile {
      display: none;
    }
  }

 .social-icon {
   display: inline-block;
   color: #000;
   transition: transform 0.3s ease, color 0.3s ease;
 }
 .social-icon:hover {
   transform: rotate(30deg);
 }

 .bi-instagram:hover {
   color: #bd6060;
 }
 .bi-whatsapp:hover {
   color: #25a125;
 }

 .bi-facebook:hover {
   color: #053672;
 }

 .bi-youtube:hover {
   color: darkred;
 }
</style>
