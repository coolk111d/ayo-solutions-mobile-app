<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Home</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="video-div">
            <iframe width="100%" height="170" src="https://www.youtube.com/embed/MdBkFdRJ420?autoplay=1&showinfo=0&loop=1&rel=0" frameborder="0" allowfullscreen></iframe>
            </div>

            <h3 class="registration-link">
            <!-- <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a> -->
            <a rel="noopener noreferrer" href="javascript:void(0)" @click="openModal">Register now!</a>
            </h3>
           <ServicesSlider slide1="Food" slide2="Express" slide3="Same Day" slide4="Handyman" slide5="Store" />

           <CategorySlider/>
        
            <ion-card class="footer">
            <div class="footer-div">
                 <h2 class="text-white">AYO SOLUTIONS INC.</h2>
                <p class="mb-4 text-white">AYO SOLUTIONS is a multi service platform for business and consumers need.</p>
                <ion-button fill="outline" target="_blank" rel="noopener noreferrer" href="https://ayosolution.comio">Visit our Site!</ion-button>
            </div>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton } from '@ionic/vue';
import ServicesSlider from '@/components/ServicesSlider.vue';
import CategorySlider from '@/components/CategorySlider.vue';
import Header from '@/components/Header.vue';


export default  {
    name: 'Home',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header, ServicesSlider, CategorySlider, IonCard, IonButton},
    methods: {
      async openModal() {
          const modal = await modalController.create({component: PreRegistrationModal});
          modal.present();
      }
  }
}

</script>


