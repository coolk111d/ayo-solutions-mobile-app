<template>

  <h5 class="title">Categories</h5>
<div class="container">
  <ion-slides pager="true" :options="categoryOpts">
                <ion-slide>
                    <div class="services-slider ayo-service-food" @click="() => router.push('/food')">
                        <h5 class="service-title">{{ slide1 }}</h5>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-express" @click="() => router.push('/food')">
                        <h5 class="service-title">{{ slide2 }}</h5>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-sameday" @click="() => router.push('/food')">
                        <h5 class="service-title">{{ slide3 }}</h5>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-handyman" @click="() => router.push('/food')">
                        <h5 class="service-title">{{ slide4 }}</h5>
                    </div>
                </ion-slide>

                <ion-slide>
                    <div class="services-slider ayo-service-store" @click="() => router.push('/food')">
                        <h5 class="service-title">{{ slide5 }}</h5>
                    </div>
                </ion-slide>
    </ion-slides>
</div>
</template>

<script lang="ts">
import { IonSlides, IonSlide } from '@ionic/vue';
import { useRouter } from 'vue-router';
export default {
  name: 'CategorySlider',
  components: { IonSlides, IonSlide },
  props: {
    slide1: String,
    slide2: String,
    slide3: String,
    slide4: String,
    slide5: String
  },
  setup() {
    const categoryOpts = {
      initialSlide: 0,
      speed: 300,
      loop: 1,
      pagination: 0,
      slidesPerView: 2.2,
    };
    const router = useRouter();
    return { router, categoryOpts }
}
}
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

.container {
    padding: 5px 0px 30px;
}
.container p {
  color: #07185C;
  font-size: 12px;
  margin-top: -.5em;
}
h5.service-title {
  color: #fff;
  text-shadow: 1px 1px 3px rgb(0 0 0);
  font-weight: 600;
  font-size: 13px;
}

.ayo-service-food {
    background: url('/assets/images/categories/fast-food.png');
}
.ayo-service-express {
    background: url('/assets/images/categories/milk-tea.jpg');
}
.ayo-service-sameday {
    background: url('/assets/images/categories/pet-food.jpg');
}
.ayo-service-handyman {
    background: url('/assets/images/categories/bakeshops.jpg');
}
.ayo-service-store {
    background: url('/assets/images/categories/groceries.jpg');
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
    align-items: flex-end;
    background-color: #ecc7b5 !important;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    border-radius: 5px;
  }
</style>
