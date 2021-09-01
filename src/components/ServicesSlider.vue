<template>
<div class="container">
  <h5 class="title">Services</h5>
  <ion-slides pager="true" :options="servicesOpts">
                <ion-slide>
                    <div class="services-slider ayo-service-food">
                        <h5 class="service-title">{{ slide1 }}</h5>
                        <p>Food Delivery</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-express">
                        <h5 class="service-title">{{ slide2 }}</h5>
                        <p>National Logistics</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-sameday">
                        <h5 class="service-title">{{ slide3 }}</h5>
                        <p>Delivery Service</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-handyman">
                        <h5 class="service-title">{{ slide4 }}</h5>
                        <p>Coming Soon</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-store">
                        <h5 class="service-title">{{ slide5 }}</h5>
                        <p>Coming Soon</p>
                    </div>
                </ion-slide>
    </ion-slides>
</div>
</template>

<script lang="ts">
import { IonSlides, IonSlide } from '@ionic/vue';
export default {
  name: 'ServicesSlider',
  components: { IonSlides, IonSlide },
  props: {
    slide1: String,
    slide2: String,
    slide3: String,
    slide4: String,
    slide5: String
  },
  setup() {
    const servicesOpts = {
      initialSlide: 0,
      speed: 700,
      loop: 1,
      pagination: 0,
      slidesPerView: 1.2,
    };
    return { servicesOpts }
}
}
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.container {
    padding: 5px 0;
}
.container p {
  color: #07185C;
  font-size: 12px;
  margin-top: -.5em;
}
h5.service-title {
  margin-top: 3em;
  color: #07185C;
  font-weight: 600;
}
.container h5.title {
    color: #feb041;
    padding: 0 10px;
}
.ayo-service-food {
    background: url('/assets/images/icons/food.png');
}
.ayo-service-express {
    background: url('/assets/images/icons/express.png');
    background-size: 65px !important;
}
.ayo-service-sameday {
    background: url('/assets/images/icons/same-day.png');
    background-size: 75px !important;
}
.ayo-service-handyman {
    background: url('/assets/images/icons/handyman.png');
}
.ayo-service-store {
    background: url('/assets/images/icons/store.png');
    background-size: 80px !important;
}
.services-slider {
    padding: 10px 20px;
    margin-right: 10px;
    height: 120px;
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ecc7b5 !important;
    background-repeat: no-repeat;
    background-size: 100px;
    background-position: 85% center;
  }
</style>
