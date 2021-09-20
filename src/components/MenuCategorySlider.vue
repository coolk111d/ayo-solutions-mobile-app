<template>
<div class="container-menu">
                <swiper
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
  color:#fff; 
  text-shadow: 2px 1px 2px rgba(0,0,0,1);
}
ion-slide:first-child {
    margin-left: 10px;
}
</style>
