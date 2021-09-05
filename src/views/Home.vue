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
            <iframe width="100%" height="170" src="https://www.youtube.com/embed/MdBkFdRJ420?autoplay=1&muted=1&loop=1&modestbranding=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen controls></iframe>
            </div>

            <h3 class="registration-link">
            <!-- <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a> -->
            <a rel="noopener noreferrer" href="javascript:void(0)" @click="openModal">Register now!</a>
            </h3>
           <ServicesSlider slide1="Food" slide2="Express" slide3="Same Day" slide4="Handyman" slide5="Store" />

           <CategorySlider slide1="Fast Food & Restaurants" slide2="Milk Tea and Coffee Shops" slide3="Pet Food and Care" slide4="BakeShops" slide5="Groceries" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ServicesSlider from '@/components/ServicesSlider.vue';
import CategorySlider from '@/components/CategorySlider.vue';
import Header from '@/components/Header.vue';

export default  {
    name: 'Home',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header, ServicesSlider, CategorySlider },
    methods: {
      async openModal() {
          const modal = await modalController.create({component: PreRegistrationModal});
          modal.present();
      }
  }
}
</script>
