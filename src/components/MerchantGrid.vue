<template>
  <h5 class="title">All Restaurants in City of Tanauan</h5>
            <ion-searchbar placeholder="What are you craving?" color="transparent"></ion-searchbar>
            <ion-grid>
                <ion-row class="ion-align-items-center" v-for="merchant of merchants" :key="merchant.name">
                    <ion-col size="4">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img v-bind:src="env + '/storage/' + merchant.image" alt="" v-if="merchant.image != null"><img src="assets/images/ayo-placeholder.png" alt="" v-else></a>
                    </ion-col>
                    <ion-col size="8">
                         <!-- Product Title --><a class="product-title" href="">{{merchant.name}}</a>
                            <!-- Product Price -->
                            <p class="sale-price" style="margin-bottom:0px">{{merchant.address}} </p>
                            <span class="store-hours open" v-if="merchant.opening_time != null">Open ({{merchant.opening_time}} - {{merchant.closing_time}})</span>
                            <ion-button color="warning" expand="full" shape="round" size="small">Visit Store</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <div style="margin: -5px auto 10px; text-align:center">
            <ion-button @click="nextLoad()" fill="outline" size="small">Load More</ion-button>
            </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import {  IonButton, IonSearchbar, IonCol, IonGrid, IonRow,} from '@ionic/vue';
import { defineComponent} from "vue";
import axios from "axios";

export default defineComponent({
  name: 'MerchantGrid',
  data(){
    return{
      merchants: [],
      page: 1,
      arr: []
    }
  },
  methods: {
      initialLoad: function() {
      axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/merchants?page=` + this.page,
            }).then(res => {
                this.merchants = res.data.data;
            }).catch(err => {
                console.log(err);
            });
      },

      nextLoad: function() {
            this.page++;
           axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/merchants?page=` + this.page,
            }).then(res => {
                        this.arr = res.data.data.slice(0, res.data.data.length);
                        this.arr.forEach(element => this.merchants.push(element));
            }).catch(err => {
                console.log(err);
            });
      },
  },
  beforeMount() {
      this.initialLoad();
  },
  components: { IonButton, IonSearchbar, IonCol, IonGrid, IonRow },
  setup() {
    const env = process.env.VUE_APP_ROOT_API;
    
    const router = useRouter();

    return { router, env }
}
})
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.store-hours {
    font-size: 12px;
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
</style>
