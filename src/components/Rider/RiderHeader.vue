<template>
    <RiderMenu/>

    <ion-header>
        <a href="/rider-dashboard">
            <img src="/assets/images/logo.png" alt="" class="logo">
        </a>

        <ion-toolbar>
            <ion-title>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="ion-text-start">
                                <ion-icon :icon="menu" @click="openMenu" class="menu-head"/>
                            </div>
                        </ion-col>
                        <ion-col>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import {
    IonHeader, IonToolbar, IonTitle,

    // IonButtons, IonMenuButton,

    IonGrid, IonRow, IonCol,
    IonIcon,modalController 
} from '@ionic/vue';
import { menu, basketOutline } from 'ionicons/icons';
import CartModal from './../CartModal.vue';
import { menuController } from '@ionic/vue';

import RiderMenu from '@/components/Rider/RiderMenu.vue';

export default {
    name: 'Rider Header',
    components: {
        IonHeader, IonToolbar, IonTitle,

        IonGrid, IonRow, IonCol,
        IonIcon,
        RiderMenu
    },
    methods: {
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
    },
    openMenu() {
            menuController.enable(true, "menu");
            menuController.open("menu");
        },
  },
    setup() {
        return { menu, basketOutline };
    }
}
</script>

