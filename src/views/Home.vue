<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Home</ion-title>
                </ion-toolbar>
            </ion-header>
            <AdsSlider/>
          
            <!-- <a @click="sendNotif">Send Notif</a>-->
           <ServicesSlider slide1="Food" slide2="Express" slide3="Same Day" slide4="Handyman" slide5="Store" />

           <CategorySlider/>
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
import { modalController } from '@ionic/vue';
// import PreRegistrationModal from '@/components/PreRegistrationModal.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton } from '@ionic/vue';
import ServicesSlider from '@/components/ServicesSlider.vue';
import CategorySlider from '@/components/CategorySlider.vue';
import AdsSlider from '@/components/AdsSlider.vue';
import Header from '@/components/Header.vue';
import axios from "axios";
export default  {
    name: 'Home',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header, ServicesSlider, CategorySlider,AdsSlider, IonCard, IonButton},
    methods: {
      async openModal() {
          const modal = await modalController.create({component: RegistrationModal});
          modal.present();
      }
      
  },
}

</script>


