<template>
<div class="container" >
                <swiper
    :modules="modules"
    :slides-per-view="1"
    :navigation="navigation"
    :autoplay="{delay:20000}"
    :disableOnInteraction="true"
    :pauseOnMouseEnter="true"
    :loop="true"
    :pagination='pagination'
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="mySwiper"
    ref="slider"
  >
    <swiper-slide v-for="ad of ads" :key="ad.id">
                    <a style="text-decoration:none;">
                    <div class="video-div">
                    <iframe width="100%" height="170" v-bind:src="ad.url" frameborder="0" allowfullscreen></iframe>
                    </div>
                    </a>
    </swiper-slide>
    
  <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
  
</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref  } from "vue";
import axios from "axios";

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/swiper-bundle.css';
    import 'swiper/components/autoplay';
  import 'swiper/components/pagination';
  // import Swiper core and required modules
import SwiperCore, {
  Pagination, Autoplay, Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay, Navigation]);
export default defineComponent({
  name: 'CategorySlider',
  data(){
    return{
      ads: [],
      pagination: {
        "clickable": true,
        "renderBullet": function (index, className) {
                return '<span class="' + className + '" style="background-color: #feb041 !important;"></span>';
              }
      },
      navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      },
    }
  },
  created() {
      axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/ads/` 
            }).then(res => {
                this.ads = res.data;
            }).catch(err => {
                console.log(err);
            });
  },
  components: { Swiper, SwiperSlide },
  setup() {
    const env = process.env.VUE_APP_ROOT_API;
    const slides = ref();
    const slider = ref();
   const onSwiper = (swiper: any) => {
        slides.value = swiper;
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
    const router = useRouter();
    
    console.log(slides.value);
    return { router, onSwiper, slider, onSlideChange, env, modules: [ Autoplay, Pagination, Navigation] }
},
  methods: {
    gotoCategory(id) {
      this.router.push(`/merchant-category/${id}`);
    }
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
.video-div {
  width: 100vw;
  height: 190px;
  
}
.swiper-button-prev,  .swiper-button-next {
  color: #feb041 !important;
  background-image: none;
  width: 12px !important;
  top: 40%;
}
.swiper-button-prev:after, .swiper-button-next:after {
  font-size: 32px;
  font-weight: 800;
}
</style>
