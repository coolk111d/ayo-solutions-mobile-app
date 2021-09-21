<template>
<div class="container-menu">
                <!--<swiper
    :slides-per-view="3"
    :space-between="0"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
                    <a class="active">Rice Meal</a>
    </swiper-slide>
    <swiper-slide>
                    <a>Burger</a>
    </swiper-slide>
    <swiper-slide>
                    <a>Fries</a>
    </swiper-slide>
    <swiper-slide>
                    <a>Soup</a>
    </swiper-slide>
  </swiper>-->

  <ion-slides pager="true" :options="slideOpts">
    <ion-slide>
                    <a class="active">Rice Meal</a>
    </ion-slide>
    <ion-slide>
                    <a>Burger</a>
    </ion-slide>
    <ion-slide>
                    <a>Fries</a>
    </ion-slide>
    <ion-slide>
                    <a>Soup</a>
    </ion-slide>
    <ion-slide>
                    <a>Meal A</a>
    </ion-slide>
    <ion-slide>
                    <a>Meal B</a>
    </ion-slide>
    <ion-slide>
                    <a>Meal C</a>
    </ion-slide>
    <ion-slide>
                    <a>Addons</a>
    </ion-slide>
  </ion-slides>
  
</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from "vue";
import axios from "axios";
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/swiper-bundle.css';
import { IonSlides, IonSlide } from '@ionic/vue';
export default defineComponent({
  name: 'MenuCategorySlider',
  // data(){
  //   return{
  //     categories: [],
  //   }
  // },
  // created() {
  //     axios({
  //               method: "GET",
  //               url: `${process.env.VUE_APP_ROOT_API}/mobile-api/merchant-categories/` 
  //           }).then(res => {
  //               this.categories = res.data;
  //           }).catch(err => {
  //               console.log(err);
  //           });
  // },
  components: {   IonSlides, IonSlide  },
  setup() {
    const env = process.env.VUE_APP_ROOT_API;
    // const onSwiper = (swiper) => {
    //   return;
    //   };
    //   const onSlideChange = () => {
    //     return;
    //   };
     const slideOpts = {
      initialSlide: 0,
      slidesPerView: 3,
      speed: 400,
      pagination: false,

    };
    const router = useRouter();
    return { router, slideOpts, env }
}
})
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.container-menu {
    background: #EBEDEF;
    padding: 15px 0px 10px;
    box-shadow: 1px 3px 3px rgba(0,0,0,0.05);
    border-radius: 15px;
    margin-bottom: 10px;
}
.container-menu a.active{
  color: #feb041;
}
.container-menu a {
  font-size: 16px;
  color:grey; 
}
ion-slide:first-child {
    margin-left: 10px;
}
</style>
