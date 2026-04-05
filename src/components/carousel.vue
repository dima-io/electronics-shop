<template>
  <div id="carouselExampleIndicators" class="carousel" data-bs-ride="true">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="slide slide-1">
          <div class="slide__content">
            <span class="h1">Знайди свій стиль</span>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="slide slide-2">
          <div class="slide__content">
            <span class="h1">Забудь про дроти</span>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="slide slide-3">
          <div class="slide__content">
            <span class="h1">Залишайся на зв'язку з природою</span>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="slide slide-4">
          <div class="slide__content">
            <span class="h1">Зроби світ яскравим</span>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="slide slide-5">
          <div class="slide__content">
            <span class="h1">Зроби ніч яскравою</span>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "app-carousel"
}
</script>

<style scoped>
.slide {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 60px;
  min-height: 400px;
  background-size: cover;
  background-position: center center; /* важливо */
  background-repeat: no-repeat;
  color: white;
}



.slide-4 {
  background-image: url('../../public/assets/img/gross-camera.jpg');
}
.slide-2 {
  background-image: url('../../public/assets/img/airpods.jpg');
}

.slide-3 {
  background-image: url('../../public/assets/img/nature.jpg');
}

.slide-1 {
  background-image: url('../../public/assets/img/pen-phone.jpg');
}

.slide-5 {
  background-image: url('../../public/assets/img/night-camera.jpg');
}

.slide__content {
  text-align: center;
  max-width: 500px;
}
</style>
