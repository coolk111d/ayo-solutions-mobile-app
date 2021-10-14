<template>
    <div class="container-menu">
        <swiper :slides-per-view="2" :pagination="{ clickable: true }" navigation>
            <swiper-slide v-for="cat of categories" :key="cat.id">{{cat.name}}</swiper-slide>
            <swiper-slide></swiper-slide>
        </swiper>
        <ion-searchbar placeholder="What are you craving?" color="transparent"></ion-searchbar>
    </div>
            
            <ion-grid >
                <p style="font-size: 15px; color:#fff; margin-left: 10px; text-shadow: 1px 1px 2px #000" id="rice">Rice Meal</p>
                <ion-row class="ion-align-items-center" v-for="item of items" :key="item.name" >
                    <ion-col size="4">
                            <!-- Product Thumbnail --><a class="product-thumbnail"  @click="() => router.push(`/merchant/${this.$route.params.id}/menu`)"><img v-bind:src="env + '/storage/' + item.image" alt="" v-if="item.image != null"><img src="assets/images/ayo-placeholder.png" alt="" v-else></a>
                    </ion-col>
                    <ion-col size="8">
                         <!-- Product Title --><a class="product-title">{{item.name}}</a>
                            <!-- Product Price -->
                            <p class="sale-price" style="margin-bottom:0px">{{item.description}} </p>
                            <span class="store-hours open" v-if="item.price != null">&#8369; {{item.price}}</span>
                            <!-- <ion-button color="warning" expand="full" shape="round" size="small" @click="() => router.push(`/merchant/${this.$route.params.id}/menu`)">Add to Basket</ion-button> -->
                            <ion-button color="warning" expand="full" shape="round" size="small" @click="addToCart(item.menu_item_unique_key)">Add to Basket</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <!--<div style="margin: -5px auto 10px; text-align:center">
            <ion-button @click="nextLoad()" fill="outline" size="small">Load More</ion-button>
            </div>-->

    <ion-loading
        :is-open="isOpenLoadingRef"
        message="Please wait..."
        :duration="0"
        @didDismiss="setOpenLoading(false)"
    >
    </ion-loading>

    <ion-toast
        :is-open="isOpenToastRef"
        :message="toastMessage"
        :duration="3000"
        @didDismiss="setOpenToast(false)"
    >
    </ion-toast>
</template>

<script>
import { useRouter } from 'vue-router';
import {  IonButton, IonSearchbar, IonCol, IonGrid, IonRow, modalController, IonLoading, IonToast } from '@ionic/vue';
import { defineComponent, ref } from "vue";
import axios from "axios";
import { Storage } from "@ionic/storage";
import CartModal from './CartModal.vue';
import {  IonButton, IonSearchbar, IonCol, IonGrid, IonRow, modalController, IonicSwiper  } from '@ionic/vue';

import 'swiper/swiper-bundle.min.css';
import '@ionic/vue/css/ionic-swiper.css';

SwiperCore.use([IonicSwiper, Navigation]);

export default defineComponent({
  name: 'ItemGrid',
  data(){
    return{
      items: [],

      toastMessage: ""
    }
  },
  methods: {
      initialLoad: function() {
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/items/` + this.$route.params.id,
            }).then(res => {
                console.log(res.data);
                this.items = res.data;
            }).catch(err => {
                console.log(err);
            });
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/menus/` + this.$route.params.id,
            }).then(res => {
                console.log(res.data);
                this.categories = res.data;
            }).catch(err => {
                console.log(err);
            });
      },

      addToCart(menuItemKey) {
        this.setOpenLoading(true);

        this.storage.get("authUser").then(user => {
            axios({
                method: "POST",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items`,
                headers: {
                    Authorization: `Bearer ${user.cart_token}`
                },
                data: {
                    quantity: 1,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    menu_item_unique_key: menuItemKey
                }
            }).then(res => {
                this.setOpenLoading(false);

                const data = res.data;

                if (data.success) {
                    this.openCartModal();
                } else {
                    this.toastMessage = data.message;
                    this.setOpenToast(true);
                    // console.log(data.message);
                }
            }).catch(err => {
                this.setOpenLoading(false);

                console.log(err);
            });
        });
      },

      async openCartModal() {
        const modal = await modalController.create({
            component: CartModal,
            cssClass: 'my-custom-class',
            componentProps: {
                title: 'My Cart'
            },
        });

        return modal.present();
      }
  },
  beforeMount() {
      this.initialLoad();
  },
  components: { IonButton, IonSearchbar, IonCol, IonGrid, IonRow, IonLoading, IonToast },
    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const router = useRouter();
        const slideOpts = {
      initialSlide: 0,
      slidesPerView: 3,
      speed: 400,
      pagination: false,

    };
        const storage = new Storage();
        storage.create();

        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;

        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;

        return {
            router, env, storage,

            isOpenLoadingRef, setOpenLoading,
            isOpenToastRef, setOpenToast
        }
    },


})
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.store-hours {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
}
.open {
    color: #2e602e;
}
.closed {
    color: #7a1414;
}
.product-thumbnail img {
height: 90px; 
width: 100%; 
border-radius: 5px;
}
a.product-title {
    text-decoration: none;
    font-weight: 600;
    margin-left:5px;
    color: #1e1e50;
    font-size: 14px;
}
.sale-price {
    margin-top: 5px;
    margin-left:5px;
    font-size: 12px;
}
ion-row {
 background: #fff;
 border-radius: 10px;
 box-shadow: 1px 1px 6px rgba(0,0,0,0.05);
 padding: 10px;
 margin: 10px 5px;
}

ion-content {
--background: #f4f6ff;
}
ion-header {
background: #fff;
}
ion-searchbar {
    color: #000 !important;
    margin: 10px auto;
    width: 95vw;
    height: 45px;
}
.container-menu {
    background: #EBEDEF;
    padding: 15px 0px 10px;
    box-shadow: 1px 3px 3px rgba(0,0,0,0.05);
    border-radius: 15px;
    margin-bottom: 10px;
}
.container-menu a {
  font-size: 16px;
  color:grey; 
}
.swiper-slide-active {
    margin-left: 10px;
    color: #feb041;
}
</style>
