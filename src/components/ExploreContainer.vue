<template>
    <div id="container">
        <strong>{{ name }}</strong>
        <p>AYO Mobile App is under development.</p>
        <p>Use <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/">Web App</a> for the meantime.</p>

        <h3>
            <!-- <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a> -->
            <a rel="noopener noreferrer" href="javascript:void(0)" @click="openModal">Register now!</a>
        </h3>
    </div>
</template>

<script lang="ts">

import { modalController } from '@ionic/vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue'

export default {
  name: 'ExploreContainer',
  props: {
    name: String
  },

  methods: {
      async openModal() {
          const modal = await modalController
              .create({
                  component: PreRegistrationModal,
                  cssClass: "my-custom-class",
                  componentProps: {
                      title: "Pre Registration"
                  }
              });

          modal.present();
      }
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  padding: 20px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
