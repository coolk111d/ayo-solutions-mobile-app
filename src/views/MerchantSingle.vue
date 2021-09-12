<template>
    <ion-page>
        <CustomHeader/>
        
        <ion-content :fullscreen="true">

            <div class="container" style="">
                <h3 class="name-text">
                    {{merchant.name}}
                </h3>
                <p class="address-text">{{merchant.address}}</p>
                <p class="store-hours" v-if="merchant.opening_time != null">Opens at {{merchant.opening_time}} - {{merchant.closing_time}}</p>
            </div>

            <div class="item-grid">
                <ItemGrid/>
            </div>


            <ion-card class="footer">
            <div class="footer-div">
                 <h2 class="text-white">AYO SOLUTIONS INC.</h2>
                <p class="mb-4 text-white">AYO SOLUTIONS is a multi service platform for business and consumers need.</p>
                <ion-button fill="outline" target="_blank" rel="noopener noreferrer" href="https://ayosolution.com">Visit our Site!</ion-button>
            </div>
            </ion-card>


        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonCard, IonButton,
        
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import ItemGrid from '@/components/ItemGrid.vue';
import axios from "axios";
export default defineComponent({
    name: 'Merchant Details',
    data(){
    return{
      merchant: [],
    }
  },
    components: {IonContent, IonPage, IonCard, IonButton, CustomHeader, ItemGrid},
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
     background: url('/assets/images/bg-img/24.jpg') rgba(0,0,0,0.3);
     background-blend-mode:darken; 
     height: 200px; 
     background-size:cover; 
     background-position: center;
     border-radius: 0 0 15% 15%; 
     margin-top: -20%; 
     padding-top: 20%;
}
h3.name-text {
    color:#fff; 
    text-shadow: 3px 3px 2px #000;
    text-align:center;
    font-size: 28px;
}
.address-text {
    font-size: 12px !important;
    color: #fff;
    text-align:center;
    margin: auto 20px;
    text-shadow: 1px 1px 1px #000;
    border-radius: 15px;
    border: 1px solid white;
    padding: 5px;
}
.store-hours {
    font-size: 12px !important;
    color: #feb041;
    text-align:center;
    margin: auto 20px;
    text-shadow: 1px 1px 1px #000;
    padding: 5px;
}
</style>
