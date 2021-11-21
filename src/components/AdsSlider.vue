<template>
<div class="container" >
                <swiper
    :slides-per-view="1"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :autoplay="5000"
    :loop="true"
  >
    <swiper-slide v-for="ad of ads" :key="ad.id">
                    <a v-bind:href="'/merchant-category/'+ ad.id" style="text-decoration:none;">
                    <div class="video-div">
                    <iframe width="100%" height="170" v-bind:src="ad.url" frameborder="0" allowfullscreen></iframe>
                    </div>
                    </a>
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
      ads: [],
    }
  },
  created() {
      axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/ads/` 
            }).then(res => {
                this.ads = res.data;
                console.log(res.data);
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
}
</style>
