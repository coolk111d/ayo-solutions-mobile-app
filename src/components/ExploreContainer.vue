<template>
    <div id="container">
        <strong>{{ name }}</strong>
        <p>AYO Mobile App is under development.</p>
        <p>Use {{service}} Web App for the meantime.</p>

        <ion-button target="_blank" rel="noopener noreferrer" :href="link">Go to {{service}}</ion-button>
    </div>
</template>

<script lang="ts">

import { modalController, IonButton } from '@ionic/vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue'

export default {
  name: 'ExploreContainer',
  props: {
    name: String,
    service: String,
    link: String
  },
  components: {IonButton },
  methods: {
      async openModal() {
          const modal = await modalController.create({component: PreRegistrationModal});
          modal.present();
      }
  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  text-align:center;
  justify-content:center;
  align-items: center;
  padding: 20px 10px;
  height: 100%;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
  color: #feb041;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  margin: 0;
}

#container a {
  text-decoration: none;
}
ion-button {
  margin-top: 20px;
}
</style>
