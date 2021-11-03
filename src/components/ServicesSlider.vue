<template>
  <h5 class="title">Services</h5>
<div class="container">
  <ion-slides pager="true" :options="servicesOpts">
                <ion-slide>
                    <div class="services-slider ayo-service-food" @click="() => router.push('/food')">
                        <h5 class="service-title">{{ slide1 }}</h5>
                        <p>Food Delivery</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-express" @click="() => router.push('/logistic')">
                        <h5 class="service-title">{{ slide2 }}</h5>
                        <p>National Logistics</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-sameday" @click="() => router.push('/courier')">
                        <h5 class="service-title">{{ slide3 }}</h5>
                        <p>Delivery Service</p>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-handyman" @click="() => router.push('/handyman')">
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
import { useRouter } from 'vue-router';
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
      speed: 300,
      loop: 1,
      pagination: 0,
      slidesPerView: 1.2,
    };
    const router = useRouter();
    return { router, servicesOpts }
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
  margin-top: 2em;
  color: #07185C;
  font-weight: 600;
}

.ayo-service-food {
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/icons/food.png');
}
.ayo-service-express {
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/icons/express.png');
    background-size: 65px !important;
}
.ayo-service-sameday {
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/icons/same-day.png');
    background-size: 75px !important;
}
.ayo-service-handyman {
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/icons/handyman.png');
}
.ayo-service-store {
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/icons/store.png');
    background-size: 80px !important;
}
ion-slide:first-child {
    margin-left: 10px;
}
.services-slider {
    padding: 10px 20px;
    margin-right: 10px;
    height: 17vh;
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ecc7b5 !important;
    background-repeat: no-repeat;
    background-size: 100px;
    background-position: 85% center;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.4);
    border-radius: 5px;
  }
</style>
