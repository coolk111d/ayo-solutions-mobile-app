<template>
    <ion-page>
        <CustomHeader link="/merchant/1"/>
        
        <ion-content :fullscreen="true">

            <div class="container" style="background: url('/assets/images/products/burger.jpg') rgba(0,0,0,0.6); background-size:cover; 
     background-position: center; background-blend-mode:darken; ">
                <h3 class="name-text">Burger</h3>
                <h4 class="price-text">P250.00</h4>
                <p class="address-text">{{merchant.name}}</p>
                <p class="store-hours">{{merchant.address}}</p>
            </div>

            <div class="item-grid">
                <MenuVariation/>
            </div>


            

             <ion-footer>
                    <ion-toolbar style="padding:0">
                    <ion-button style="width: 100%; margin:0;"  @click="onClick">Add to Basket</ion-button>
                    </ion-toolbar>
            </ion-footer>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonButton, IonFooter, IonToolbar, modalController
        
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import MenuVariation from '@/components/MenuVariation.vue';
import CartModal from '@/components/CartModal.vue';
import { menuController } from '@ionic/vue';

import axios from "axios";
export default defineComponent({
    name: 'Menu Details',
    data(){
    return{
      merchant: [],
    }
  },
    components: {IonContent, IonPage, IonButton, IonFooter, IonToolbar, CustomHeader, MenuVariation},
    methods: {
      initialLoad: function() {
      axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/singlemerchant/` + this.$route.params.id,
            }).then(res => {
                console.log(res.data[0]);
                this.merchant = res.data[0];
            }).catch(err => {
                console.log(err);
            });
            
      },
      async onClick() {
            const modal = await modalController
        .create({
          component: CartModal,
          cssClass: 'my-custom-class',
          componentProps: {
            title: 'My Cart'
          },
        })
      return modal.present();
      }
  },
  beforeMount() {
      this.initialLoad();
  },
 
    setup() {
    const router = useRouter();
    return { router, arrowBackOutline}
  }
})
</script>

<style scoped>

ion-content {
    --background: #eceff1;
}
.container {
     min-height: 250px; 
     margin-top: -20%; 
     padding-top: 20%;
}
h3.name-text {
    color:#fff; 
    text-shadow: 3px 3px 2px #000;
    text-align:center;
    font-size: 28px;
}
.price-text {
    font-size: 18px;
    color: #feb041;
    font-weight: 600;
    text-align:center;
}
.address-text {
    font-size: 14px !important;
    color: rgb(230,230,230);
    text-align:center;
    margin: auto 20px;
    text-shadow: 1px 1px 1px #000;
    padding: 5px;
}
.store-hours {
    font-size: 12px !important;
    color: rgb(200,200,200);
    text-align:center;
    margin: auto 20px;
    text-shadow: 1px 1px 1px #000;
    padding: 5px;
}
ion-footer {
    position: fixed;
    bottom: 0%;
}
ion-footer ion-toolbar {
    --padding-top: 0;
    --padding-bottom: 0;
    --padding-start: 0;
    --padding-end: 0;
    --min-height: 0;
}
ion-button {
        --border-radius: 0px;
    --padding-start: 2em;
    --padding-end: 2em;
    font-size: 18px;
    height: 50px;
    --color:white;
}
</style>
