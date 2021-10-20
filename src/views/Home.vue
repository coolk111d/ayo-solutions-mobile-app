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
            <iframe width="100%" height="170" src="https://www.youtube.com/embed/videoseries?list=PLX6R8Kyg0rnyUOXZ8DJBfmOtPQWRQgtgh" frameborder="0" allowfullscreen></iframe>
            </div>
            
            <h3 class="registration-link">
            <!-- <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a> -->
            <a rel="noopener noreferrer" href="javascript:void(0)" @click="openModal">Register now!</a>
            </h3>
            <!-- <a @click="sendNotif">Send Notif</a>-->
           <ServicesSlider slide1="Food" slide2="Express" slide3="Same Day" slide4="Handyman" slide5="Store" />

           <CategorySlider/>
            <ion-card class="footer">
            <div class="footer-div">
                 <h2 class="text-white">AYO SOLUTIONS INC!</h2>
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
import Header from '@/components/Header.vue';
import axios from "axios";
export default  {
    name: 'Home',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header, ServicesSlider, CategorySlider, IonCard, IonButton},
    methods: {
      async openModal() {
          const modal = await modalController.create({component: RegistrationModal});
          modal.present();
      },
      sendNotif() {
          axios({
                    method: "POST",
                    url: `https://onesignal.com/api/v1/notifications`,
                    headers: {
                        Authorization: `Basic NDg5YThmMzctYzRhMC00MzYwLTgxYjItYzIwMDBlZTIxZDQ4`
                    },
                    data: {
                          "app_id": "643e1055-dcf7-4525-880a-89e3ba955d68",
                            "include_external_user_ids": ["rider90"],
                            "channel_for_external_user_ids": "push",
                            "template_id": "31880987-1115-4f63-92d2-52afb395c799",
                            "headings": {"en": "You have a new order!"},
                            "contents": {"en": "Please accept the order."},
                            "buttons": [{"id": "id2", "text": "Accept", "icon": "ic_menu_share", "url": "/rider-dashboard"}, {"id": "id1", "text": "Reject", "icon": "ic_menu_send"}],
                            "android_accent_color": "FEB041"
                    }
                }).then(res => {
                        console.log(res);
                }).catch(err => {
                    console.log(err.response.data.message);
                });
      }
  },
}

</script>


