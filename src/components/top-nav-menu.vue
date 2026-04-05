<template>
  <!-- DESKTOP -->
  <div class="container desktop">
    <div class="row align-items-center">
      <div class="col-lg-2 col-sm-2">
        <span class="topnav__logo">
          <router-link to="/">Tech<span class="logo-accent">Hub</span></router-link>
        </span>
      </div>

      <div class="col-lg-5 col-sm-10">
        <div class="d-flex align-items-center">
          <div class="me-4">
            <div class="topnav__contact-item fw-bold">098 214 66 57</div>
            <div class="topnav__contact-worktime">З 9:00 до 21:00</div>
          </div>

          <div class="topnav__social-icons">
            <a href=""><i class="bi bi-instagram me-2 social-icon"></i></a>
            <a href=""><i class="bi bi-whatsapp me-2 social-icon"></i></a>
            <a href=""><i class="bi bi-facebook me-2 social-icon"></i></a>
            <a href=""><i class="bi bi-youtube me-2 social-icon"></i></a>
          </div>
        </div>
      </div>

      <div class="col-lg-5 d-flex justify-content-end align-items-center">
        <div class="topnav__social-icons">
          <i><span class="text-danger">{{ orderingDataLength }}</span></i>
          <i class="order-icon bi bi-cart me-2" @click="openPopup()"></i>
          <a href="#" class="topnav__user">
            <i class="bi bi-person me-1"></i>Dmytro
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- MOBILE -->
  <div class="mobile-view container d-flex justify-content-between d-lg-none align-items-center px-3 py-2">
    <div class="topnav__logo">
      <router-link to="/" v-show="!menuOpen">
        Tech<span class="logo-accent">Hub</span>
      </router-link>
    </div>

    <div class="d-flex align-items-center">
      <i v-if="!menuOpen" @click="menuOpen = true" class="bi bi-list icon"></i>
      <i v-else @click="menuOpen = false" class="bi bi-x icon"></i>
    </div>
  </div>

  <!-- MOBILE MENU -->
  <div :class="['mobile-view menu', { open: menuOpen }]">
    <nav class="nav flex-column h-100 pt-4">
      <a class="nav-link fw-light" href="#">
        <i class="bi bi-person me-3"></i>Dmytro
      </a>
      <a class="nav-link fw-light" href="#">
        <i class="bi bi-heart me-3"></i>Обране
      </a>
      <a class="nav-link fw-light" href="#">
        <i class="bi bi-percent me-3"></i>Акції
      </a>
      <a class="nav-link fw-light">
        <i class="bi bi-headset me-3"></i>Технічна підтримка
      </a>
    </nav>

    <div class="ms-3 mt-3">
      <button type="button" class="city-button">
        <i class="bi bi-geo-alt ms-1"></i>Kyiv
      </button>
    </div>
  </div>

  <!-- POPUP -->
  <OrderingPopup @close="isModalVisible = false" :show="isModalVisible" />
</template>

<script>
import { mapGetters } from "vuex";
import OrderingPopup from "@/components/ordering-popup";

export default {
  name: "top-nav-menu",
  components: { OrderingPopup },

  computed: {
    ...mapGetters(["orderingDataLength"]),
  },

  methods: {
    openPopup() {
      this.isModalVisible = true;
      document.body.classList.add("modal-open");
    },
  },

  data() {
    return {
      menuOpen: false,
      isModalVisible: false,
    };
  },
};
</script>

<style scoped>
/* ===== LOGO ===== */
.topnav__logo {
  font-weight: 600;
  font-size: 48px;
}

.topnav__logo a {
  text-decoration: none;
  color: #053672;
  white-space: nowrap;
}

.logo-accent {
  background: orange;
  padding: 0 4px;
}

/* ===== MOBILE HEADER ===== */
.mobile-view {
  border-bottom: 1px solid #eee;
  background: #fff;
}

/* ===== MOBILE MENU ===== */
.mobile-view.menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  opacity: 0;
  transition: 0.3s ease;
  visibility: hidden;
}

.mobile-view.menu.open {
  opacity: 1;
  visibility: visible;
  z-index: 1050;
}

/* ===== TEXT ===== */
.topnav__contact-item {
  font-size: 19px;
}

.topnav__contact-worktime {
  font-size: 0.75rem;
}

/* ===== ICONS ===== */
.topnav__social-icons i {
  font-size: 21px;
  color: #000;
}

.topnav__user {
  font-size: 21px;
  text-decoration: none;
  color: #000;
}

.icon {
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* ===== BUTTON ===== */
.city-button {
  border-radius: 50px;
  background: none;
  border: 2px solid #333;
  padding: 6px 12px;
}

/* ===== HOVER EFFECTS ===== */
.social-icon {
  display: inline-block;
  transition: 0.3s;
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

/* ===== RESPONSIVE ===== */
@media (max-width: 992px) {
  .desktop {
    display: none;
  }

  .topnav__logo {
    font-size: 26px;
  }
}

@media (min-width: 992px) {
  .mobile-view {
    display: none;
  }
}
</style>