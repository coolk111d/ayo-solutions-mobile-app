<template>
  <h5 class="title">Categories</h5>
<div class="container">
                <swiper
    :slides-per-view="2.3"
    :space-between="0"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="category of categories" :key="category.name">
                    <div class="services-slider"  v-bind:style="{'background-image':'url('+ env + '/storage/' + category.image + ')' }" @click="() => router.push('/food')">
                        <h5 class="service-title" :key="i">{{category.name }}</h5>
                    </div> 
    </swiper-slide>
  </swiper>
  
</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default defineComponent({
  name: 'CategorySlider',
  data(){
    return{
      categories: [],
    }
  },
  created() {
      axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/merchant-categories/` 
            }).then(res => {
                this.categories = res.data;
            }).catch(err => {
                console.log(err);
            });
  },
  components: { Swiper, SwiperSlide },
  setup() {
    const env = process.env.VUE_APP_ROOT_API;
    const onSwiper = (swiper) => {
      return;
      };
      const onSlideChange = () => {
        return;
      };
    const router = useRouter();
    return { router, onSwiper, onSlideChange, env }
}
})
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.container {
    padding: 5px 0px 20px;
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
ion-slide:first-child {
    margin-left: 10px; 
}
.services-slider {
    padding: 10px 20px;
    margin-left: 10px;
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
